import { type SelectChangeEvent, Box, Stack, Typography } from '@mui/material';
import { MxNumberFormatter } from '@xfi/formatters';
import { generateRandomString } from '@xfi/helpers';
import { useDebouncedCallback, useValueChanging } from '@xfi/hooks';
import cloneDeep from 'lodash/cloneDeep';
import { type ChangeEvent, type HTMLAttributes, useCallback, useMemo, useRef, useState } from 'react';
import { FormattedMessage } from 'react-intl';

import { useMultisend } from '@/hooks';
import { getOutputCoins, getTotalAmount } from '@/hooks/useMultisend';
import { Block, Button, Input } from '@/lib/xfi.lib/components/atoms';
import { CURRENCIES } from '@/lib/xfi.lib/constants';
import { useMediaQuery } from '@/lib/xfi.lib/theme';
import { Coin, CosmosCurrency, isCosmosCurrency } from '@/shared/types';

import { CoinSelect, MultisendTotalAmount } from '@/components/atoms';
import { FormChangeValues, ImperativeHandlers, MultisendForm, MultisendFormValues } from '@/components/molecules';
import { FormValues } from '@/components/molecules/forms/MultisendForm';

import {
  FormsContainer,
  HeaderContainer,
  MultisendContainer,
  SendFormContainer,
  StyledCommissionBlock,
  StyledSendFormInputsContainer,
} from './styles';

type Props = HTMLAttributes<HTMLDivElement>;

type Form = {
  id: string;
  initialValues?: Partial<MultisendFormValues>;
};

const generateForm = (initialValues?: Partial<MultisendFormValues>): Form => ({
  id: generateRandomString(),
  initialValues,
});

const initialTotalAmount: Coin[] = [
  { denom: CosmosCurrency.MPX, amount: '0' },
  { denom: CosmosCurrency.XFI, amount: '0' },
];

const Multisend = ({ className }: Props) => {
  const isMobile = useMediaQuery(theme => theme.breakpoints.down('md'));

  const formRefs = useRef(new Map<string, ImperativeHandlers | null>());
  const formValues = useRef(new Map<string, FormChangeValues>());

  const [forms, setForms] = useState<Array<Form>>([generateForm()]);
  const [isValidForm, setIsValidForm] = useState(false);
  const [gasCurrency, setGasCurrency] = useState(CosmosCurrency.XFI);
  const [message, setMessage] = useState('');
  const [totalAmount, setTotalAmount] = useState(initialTotalAmount);
  const [isFormChanging, triggerChanging] = useValueChanging();

  const triggerFormChanging = () => {
    triggerChanging();
    setTotalAmount(calculateTotalAmount());
  };

  const { calculateFee, send, fee, isLoadingFee, feeError, isLoadingTransaction } = useMultisend();

  const clearForms = () => {
    setForms([generateForm()]);
    setIsValidForm(false);
    setMessage('');
    formValues.current = new Map<string, FormChangeValues>();
    formRefs.current = new Map<string, ImperativeHandlers | null>();
    setTotalAmount(initialTotalAmount);
  };

  const getFormValues = () => {
    const formsValuesArr: FormChangeValues[] = cloneDeep(Array.from(formValues.current.values()));

    formsValuesArr.forEach(form => {
      for (const prop in form.values) {
        if (typeof form.values[prop as keyof FormValues] === 'string') {
          form.values[prop as keyof FormValues] = form.values[prop as keyof FormValues].trim();
        }
      }
    });

    return formsValuesArr;
  };

  const checkFormValidation = () => {
    const formsValues = Array.from(formRefs.current.values());

    for (const form of formsValues) {
      if (form?.isValidForm() === false) {
        return false;
      }
    }
    return true;
  };

  const debouncedCalculateFee = useDebouncedCallback(calculateFee);

  const onChange = (values: FormChangeValues) => {
    formValues.current.set(values.formId, values);

    const isValid = checkFormValidation();

    setIsValidForm(isValid);
    triggerFormChanging();

    if (isValid) {
      debouncedCalculateFee(getFormValues(), message.trim(), gasCurrency);
    }
  };

  const handleDeleteForm = ({ formId }: { formId: string }) => {
    formRefs.current.delete(formId);
    formValues.current.delete(formId);
    setForms(form => form.filter(({ id }) => id !== formId));

    const isValid = checkFormValidation();

    setIsValidForm(isValid);
    triggerFormChanging();

    if (isValid) {
      debouncedCalculateFee(getFormValues(), message.trim(), gasCurrency);
    }
  };

  const onClickSendButton = () => {
    if (!checkFormValidation()) return;

    const formValues: FormChangeValues[] = getFormValues();

    send({ formValues, memo: message, gasCurrency }, () => clearForms());
  };

  const onClickAddButton = () => {
    setForms(forms => [...forms, generateForm()]);
  };

  const displayFee = useMemo(() => {
    if (!fee || isLoadingFee) return '';

    const result = MxNumberFormatter.formatUnitsToDisplay(fee.amount, {
      maxFractionalLength: CURRENCIES[fee.denom].formatDecimals,
    });

    return `${result} ${fee.denom.toUpperCase()}`;
  }, [fee, isLoadingFee]);

  const onChangeMessage = (event: ChangeEvent<HTMLInputElement>) => {
    const msg = event.target.value;

    setMessage(msg);
    triggerFormChanging();

    if (!checkFormValidation()) return;

    if (!message.trim() && !msg.trim()) return;

    debouncedCalculateFee(getFormValues(), msg.trim(), gasCurrency);
  };

  const onChangeGasCurrency = (event: SelectChangeEvent<string | string[]>) => {
    const gasCurrency = event.target.value;

    if (typeof gasCurrency !== 'string' || !isCosmosCurrency(gasCurrency)) {
      throw new Error(`${gasCurrency} should be the CosmosCurrency`);
    }

    setGasCurrency(gasCurrency);
    triggerFormChanging();

    if (checkFormValidation()) {
      debouncedCalculateFee(getFormValues(), message.trim(), gasCurrency);
    }
  };

  const calculateTotalAmount = useCallback(() => {
    const formValues = getFormValues() || [];
    const outputs = getOutputCoins(formValues);
    const { mpxAmount, xfiAmount } = getTotalAmount(outputs);

    return [
      { denom: CosmosCurrency.MPX, amount: mpxAmount.toString() },
      { denom: CosmosCurrency.XFI, amount: xfiAmount.toString() },
    ];
  }, []);

  const onPasteManyAddresses = (formId: string, addresses: string[]) => {
    const startIndex = forms.findIndex(({ id }) => id === formId);
    const updatedForms = [...forms];

    if (startIndex === -1) return;

    const id = updatedForms[startIndex].id;
    const initialValues = formRefs.current.get(id)?.getFormValues() || {};

    updatedForms.forEach((form, index) => {
      if (startIndex > index) return;

      const address = addresses.shift();

      formRefs.current.get(id)?.setFieldValue('address', address || '');
      form.initialValues = {
        ...initialValues,
        address,
      };
    });

    addresses.forEach(address => {
      updatedForms.push(generateForm({ ...initialValues, address }));
    });

    setForms(updatedForms);
  };

  const isDisabledSend = !isValidForm || isLoadingFee || isLoadingTransaction || !!feeError || isFormChanging;

  return (
    <Block>
      <MultisendContainer className={className}>
        <HeaderContainer>
          <Typography color="background.light" variant="h4">
            <FormattedMessage id="SUMMARY.SEND" />
          </Typography>
        </HeaderContainer>
        <Stack gap={'1.5rem'}>
          <FormsContainer>
            {forms.map(({ id, initialValues }) => (
              <MultisendForm
                id={id}
                key={id}
                initialValues={initialValues}
                ref={ref => {
                  ref && formRefs.current.set(id, ref);
                }}
                disableDeleteFirstField={forms.length === 1}
                onChange={onChange}
                onDelete={handleDeleteForm}
                onPasteManyAddresses={addresses => onPasteManyAddresses(id, addresses)}
              />
            ))}
          </FormsContainer>
          <Stack gap={'1.5rem'}>
            <Button
              className="recipientButton"
              onClick={onClickAddButton}
              variant="secondary"
              size={'large'}
              isFullWidth={isMobile}
            >
              <FormattedMessage id="SUMMARY.ADD_RECIPIENT" />
            </Button>
            <SendFormContainer>
              <Box className="wrapper">
                <StyledSendFormInputsContainer>
                  <Input
                    maxLength={256}
                    value={message}
                    onChange={onChangeMessage}
                    className="input messageInput"
                    label={{ type: 'intl', id: 'SUMMARY.MESSAGE' }}
                    placeholder={{ type: 'intl', id: 'SUMMARY.MESSAGE_TEXT' }}
                    caption={{ type: 'intl', id: 'WALLET.TRANSFER.SEND_MEMO_DESCRIPTION' }}
                  />

                  <StyledCommissionBlock>
                    <Stack gap={{ xs: '0.5rem', md: '1rem' }} direction={'row'} className={'commissionInputsWrapper'}>
                      <Input
                        value={displayFee}
                        placeholder={{ type: 'text', text: '0' }}
                        isEditable={false}
                        isError={!!feeError}
                        caption={feeError ? { type: 'intl', id: feeError } : undefined}
                        label={{ type: 'intl', id: 'SUMMARY.COMMISSION' }}
                        className={'commissionInput'}
                      />
                      <CoinSelect
                        options={[CosmosCurrency.XFI, CosmosCurrency.MPX]}
                        value={gasCurrency}
                        onChange={onChangeGasCurrency}
                        label={{ type: 'intl', id: 'SUMMARY.CURRENCY' }}
                      />
                    </Stack>
                    <MultisendTotalAmount coins={totalAmount} />
                  </StyledCommissionBlock>

                  <div />
                  <Button
                    isDisabled={isDisabledSend}
                    size={'large'}
                    isLoading={isLoadingTransaction || isLoadingFee}
                    onClick={onClickSendButton}
                    isFullWidth={isMobile}
                    className="sendButton"
                  >
                    <FormattedMessage id="SUMMARY.SEND" />
                  </Button>
                </StyledSendFormInputsContainer>
              </Box>
            </SendFormContainer>
          </Stack>
        </Stack>
      </MultisendContainer>
    </Block>
  );
};

export default Multisend;

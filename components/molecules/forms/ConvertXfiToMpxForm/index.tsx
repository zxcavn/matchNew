import { Stack } from '@mui/material';
import { MxNumberFormatter, NumberFormatter } from '@xfi/formatters';
import { FormattedMessage, useIntl } from 'react-intl';

import { useAppValidationRules } from '@/hooks';
import { Button, Icon, Input, TruncatedInput } from '@/lib/xfi.lib/components/atoms';
import { FormBlock } from '@/lib/xfi.lib/components/molecules';
import { FormBlockInputTypesEnum } from '@/lib/xfi.lib/components/molecules/FormBlock/types';
import { CURRENCIES } from '@/lib/xfi.lib/constants';
import { MpxIcon, XfiIcon } from '@/lib/xfi.lib/icons';
import { useMediaQuery } from '@/lib/xfi.lib/theme';
import { SWAP_XFI_TO_MPX_ADDRESS } from '@/shared/constants';
import { Coin, CosmosCurrency } from '@/shared/types';



import { StyledButtonsContainer, StyledFormContainer, StyledInputRow } from './styles';

export type ConvertXfiToMpxFormValues = {
  gasCurrency: CosmosCurrency;
  swapAddress?: string;
  sendAmount: string;
  getAmount: string;
};

type Props = {
  isLoading?: boolean;
  errorMessage?: string;
  onSubmit: (values: ConvertXfiToMpxFormValues) => void;
  onCancel: () => void;
  availableBalance: string;
  rate: number;
  fee?: Coin | null;
  isLoadingFee: boolean;
  values: ConvertXfiToMpxFormValues;
  onChange: (values: ConvertXfiToMpxFormValues) => void;
  error?: string;
  feeError?: string;
  initialValues: ConvertXfiToMpxFormValues;
};

const ConvertXfiToMpxForm = ({
  onSubmit,
  onCancel,
  availableBalance,
  rate,
  fee,
  isLoadingFee,
  values,
  onChange,
  error,
  feeError,
  initialValues,
}: Props) => {
  const isMobile = useMediaQuery(theme => theme.breakpoints.down('sm'));
  const { formatMessage } = useIntl();
  const validationRules = useAppValidationRules();

  return (
    <Stack gap={'2rem'}>
      <StyledFormContainer>
        <FormBlock<ConvertXfiToMpxFormValues>
          id="swap-form"
          onSubmit={onSubmit}
          observerHandler={onChange}
          errors={{
            sendAmount: error && formatMessage({ id: error }),
          }}
          validationRules={{
            sendAmount: validationRules.validNumber,
          }}
          initialValues={initialValues}
          inputsData={[
            {
              type: FormBlockInputTypesEnum.jsx,
              inputProps: {
                component: (
                  <TruncatedInput
                    name={'swapAddress'}
                    label={{
                      type: 'intl',
                      id: 'WALLET.CONVERT_WALLET_ADDRESS',
                    }}
                    value={SWAP_XFI_TO_MPX_ADDRESS}
                    isEditable={false}
                  />
                ),
              },
            },
            {
              inputName: 'sendAmount',
              type: FormBlockInputTypesEnum.number,

              inputProps: {
                label: {
                  type: 'intl',
                  id: 'WALLET.YOU_SEND_CURRENCY',
                  values: { currency: CURRENCIES.xfi.text },
                },
                suffix: (
                  <Icon
                    src={XfiIcon}
                    sx={{ fontSize: '2rem', margin: '-0.5rem', cursor: 'text' }}
                    viewBox="0 0 32 32"
                  />
                ),
                caption: {
                  type: 'text',
                  text: `${formatMessage({ id: 'SUMMARY.BALANCE' })} ${availableBalance} ${CURRENCIES.xfi.text}`,
                },
                placeholder: {
                  type: 'text',
                  text: '0',
                },
                defaultValue: values.sendAmount || '',
              },
            },
            {
              type: FormBlockInputTypesEnum.jsx,
              inputProps: {
                component: (
                  <Input
                    value={
                      values?.sendAmount
                        ? NumberFormatter.formatToDisplay(String(Number(values?.sendAmount) * rate), {
                            maxFractionalLength: CURRENCIES.xfi.formatDecimals,
                            minFractionalLength: 0,
                          })
                        : ''
                    }
                    placeholder={{
                      type: 'text',
                      text: '0',
                    }}
                    suffix={
                      <Icon
                        src={MpxIcon}
                        sx={{ fontSize: '2rem', marginRight: '-0.5rem', cursor: 'text' }}
                        viewBox="0 0 32 32"
                      />
                    }
                    label={{
                      type: 'intl',
                      id: 'WALLET.YOU_GET_CURRENCY',
                      values: { currency: CURRENCIES.mpx.text },
                    }}
                    caption={{
                      type: 'text',
                      text: `1 ${CURRENCIES.xfi.text}	≈ ${NumberFormatter.formatToDisplay(String(rate), {
                        maxFractionalLength: CURRENCIES.xfi.formatDecimals,
                      })} ${CURRENCIES.mpx.text}`,
                    }}
                    isEditable={false}
                  />
                ),
              },
            },
            {
              type: FormBlockInputTypesEnum.component,
              inputProps: {
                render: ({ getField, handleChange }) => {
                  const { value: gasCurrency } = getField('gasCurrency');

                  return (
                    <StyledInputRow>
                      <Input
                        isError={Boolean(feeError)}
                        caption={feeError ? { type: 'intl', id: feeError } : undefined}
                        value={
                          fee?.amount
                            ? `${MxNumberFormatter.formatUnitsToDisplay(fee?.amount)} ${gasCurrency.toUpperCase()}`
                            : ''
                        }
                        placeholder={{
                          type: 'text',
                          text: '0',
                        }}
                        label={{
                          type: 'intl',
                          id: 'SUMMARY.COMMISSION',
                        }}
                        isEditable={false}
                      />
                    </StyledInputRow>
                  );
                },
              },
            },
            {
              type: FormBlockInputTypesEnum.jsx,
              inputProps: {
                component: (
                  <StyledButtonsContainer>
                    <Button
                      isFullWidth={isMobile}
                      className="button"
                      variant="secondary"
                      size="large"
                      onClick={onCancel}
                    >
                      <FormattedMessage id="SUMMARY.CANCEL" />
                    </Button>
                    <Button
                      isFullWidth={isMobile}
                      isDisabled={isLoadingFee || !availableBalance || !fee?.amount}
                      isLoading={isLoadingFee}
                      type="submit"
                      className="button"
                      size="large"
                    >
                      <FormattedMessage id="SUMMARY.NEXT" />
                    </Button>
                  </StyledButtonsContainer>
                ),
              },
            },
          ]}
        />
      </StyledFormContainer>
    </Stack>
  );
};

export default ConvertXfiToMpxForm;

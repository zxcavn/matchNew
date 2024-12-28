import { Typography } from '@mui/material';
import { redirectWithCompletion } from '@xfi/helpers';
import range from 'lodash/range';
import shuffle from 'lodash/shuffle';
import { ChangeEventHandler, useCallback, useMemo, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import * as Yup from 'yup';

import { pushNotification } from '@/helpers';
import { useAppDispatch, useAppSelector, useAuth } from '@/hooks';
import { Button } from '@/lib/xfi.lib/components/atoms';
import { FormBlock } from '@/lib/xfi.lib/components/molecules';
import { FormBlockInput, FormBlockInputTypesEnum } from '@/lib/xfi.lib/components/molecules/FormBlock/types';
import { useMediaQuery } from '@/lib/xfi.lib/theme';
import { PAGES } from '@/shared/constants';
import { CreateWalletStepEnum, setWalletStep, walletMnemonicSelector } from '@/store/wallet';

import { ButtonsContainer, CheckingSeedWrapper } from './styles';

type MnemonicPart = `mnemonicPart${number}`;

type FormBlockValues = {
  [part: MnemonicPart]: string;
};

type FieldName = 'mnemonicPart'[number];
type Inputs = { [key: FieldName]: string };

const ConfirmStep = () => {
  const isMobile = useMediaQuery(theme => theme.breakpoints.down('md'));
  const dispatch = useAppDispatch();
  const { isLoading, authorizeByMnemonic } = useAuth();

  const mnemonic = useAppSelector(walletMnemonicSelector);
  const { formatMessage } = useIntl();

  const onSubmit = useCallback(async () => {
    authorizeByMnemonic(mnemonic, {
      onSuccess: async () => {
        await redirectWithCompletion(PAGES.cosmosWallet.pathname);
        dispatch(setWalletStep(null));
      },
      onError: error => pushNotification(error),
    });
  }, [mnemonic, authorizeByMnemonic]);

  const setPreviousStep = () => {
    dispatch(setWalletStep(CreateWalletStepEnum.mnemonic));
  };

  const randomNumbers = useMemo(
    () =>
      shuffle(range(1, 15))
        .slice(0, 4)
        .sort((a, b) => a - b),
    []
  );

  const [inputValue, setInputValue] = useState<Inputs>({} as Inputs);

  const handleChange: ChangeEventHandler<HTMLInputElement> = event => {
    const target = event.target;
    const lowerCaseValue = target.value.toLowerCase();

    setInputValue({ ...inputValue, [target.name]: lowerCaseValue });
  };

  const formFields = randomNumbers.map<FormBlockInput<FormBlockValues>>((item, i) => {
    return {
      inputName: `mnemonicPart${i}`,
      type: FormBlockInputTypesEnum.text,
      inputProps: {
        defaultValue: inputValue[`mnemonicPart${i}`],
        onChange: handleChange,
        placeholder: {
          type: 'text',
          text: `${formatMessage({ id: 'SUMMARY.WORD' })}...`,
        },
        prefix: (
          <Typography color="neutrals.secondaryText" variant="body1">
            {item}.
          </Typography>
        ),
      },
    };
  });

  const getValidationRules = useCallback(
    (phrase: string) => {
      return Yup.string()
        .required(formatMessage({ id: 'LIB.ERRORS.REQUIRED_FIELD' }))
        .test(
          'isValidMnemonicPhrase',
          formatMessage({ id: 'ERRORS.INCORRECT_WALLET_SEED' }),
          val => val.trim() === phrase
        );
    },
    [formatMessage]
  );

  const validationSchema = randomNumbers.reduce<{ [key: string]: Yup.StringSchema }>((acc, number, i) => {
    acc[`mnemonicPart${i}`] = getValidationRules(mnemonic.split(' ')[number - 1]);

    return acc;
  }, {});

  return (
    <CheckingSeedWrapper>
      <Typography color="background.light" variant="h4" className="title">
        <FormattedMessage id={'SIGN_IN.CONFIRM_SEED'} />
      </Typography>
      <FormBlock<FormBlockValues>
        id="sign-in-form"
        className="formBlock"
        onSubmit={onSubmit}
        inputsData={[
          ...formFields,
          {
            type: FormBlockInputTypesEnum.jsx,
            inputProps: {
              component: (
                <ButtonsContainer>
                  <Button
                    isFullWidth={isMobile}
                    onClick={setPreviousStep}
                    className="buttonBack"
                    size="large"
                    variant="secondary"
                  >
                    <FormattedMessage id="SUMMARY.BACK" />
                  </Button>
                  <Button
                    isFullWidth={isMobile}
                    type="submit"
                    className="button"
                    size="large"
                    isLoading={isLoading.mnemonic}
                  >
                    <FormattedMessage id="SUMMARY.CONTINUE" />
                  </Button>
                </ButtonsContainer>
              ),
            },
          },
        ]}
        validationRules={validationSchema}
      />
    </CheckingSeedWrapper>
  );
};

export default ConfirmStep;

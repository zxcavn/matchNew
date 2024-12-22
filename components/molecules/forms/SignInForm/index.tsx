import { Box, styled } from '@mui/material';
import { FormattedMessage, useIntl } from 'react-intl';

import { useAppValidationRules } from '@/hooks';
import { Button } from '@/lib/xfi.lib/components/atoms';
import { FormBlock } from '@/lib/xfi.lib/components/molecules';
import { FormBlockInputTypesEnum } from '@/lib/xfi.lib/components/molecules/FormBlock/types';
import { useMediaQuery } from '@/lib/xfi.lib/theme';

export type SignInFormValues = {
  mnemonic: string;
};

type Props = {
  onSubmit: (formValues: SignInFormValues) => void;
  onClickBack: () => void;
  /** @type {FormattedMessageId} */
  error?: string;
  isLoading?: boolean;
};

const SignInForm = ({ onSubmit, onClickBack, error, isLoading }: Props) => {
  const { mnemonic } = useAppValidationRules();
  const { formatMessage } = useIntl();
  const isMobile = useMediaQuery(theme => theme.breakpoints.down('md'));

  const onSubmitForm = ({ mnemonic }: SignInFormValues) => onSubmit({ mnemonic: mnemonic.trim() });

  return (
    <FormBlock<SignInFormValues>
      id="sign-in-form"
      className="formBlock"
      onSubmit={onSubmitForm}
      validationRules={{
        mnemonic,
      }}
      errors={{
        mnemonic: error && formatMessage({ id: error }),
      }}
      inputsData={[
        {
          inputName: 'mnemonic',
          type: FormBlockInputTypesEnum.text,
          inputProps: {
            placeholder: {
              type: 'intl',
              id: 'WALLET.ENTER_SEED_PHRASE',
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
                  onClick={onClickBack}
                  className="buttonBack"
                  size="large"
                  variant="secondary"
                >
                  <FormattedMessage id="SUMMARY.BACK" />
                </Button>
                <Button
                  isFullWidth={isMobile}
                  isDisabled={isLoading}
                  type="submit"
                  className="button"
                  size="large"
                  isLoading={isLoading}
                >
                  <FormattedMessage id="SUMMARY.LOGIN" />
                </Button>
              </StyledButtonsContainer>
            ),
          },
        },
      ]}
    />
  );
};

export const StyledButtonsContainer = styled(Box, { name: 'StyledButtonsContainer' })(({ theme }) => ({
  display: 'flex',
  justifyContent: 'flex-end',
  gap: '1rem',

  [theme.breakpoints.down('md')]: {
    flexDirection: 'column-reverse',
  },

  '& .buttonBack': {
    backdropFilter: 'blur(1rem)',
  },
}));

export default SignInForm;

import { Stack, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { FormattedMessage } from 'react-intl';

import { useAppDispatch } from '@/hooks';
import { Button } from '@/lib/xfi.lib/components/atoms';
import { FormBlock } from '@/lib/xfi.lib/components/molecules';
import { FormBlockInputTypesEnum } from '@/lib/xfi.lib/components/molecules/FormBlock/types';
import { useMediaQuery } from '@/lib/xfi.lib/theme';
import { Bip39Service } from '@/services';
import { CreateWalletStepEnum } from '@/store/wallet';
import { setMnemonic, setWalletStep } from '@/store/wallet/slice';

import { StyledButtonsContainer, StyledFormBlock, StyledStepContainer } from './styles';

type FormBlockValues = {
  lostSeed: boolean;
};

const PrivacyPolicyStep = () => {
  const isMobile = useMediaQuery(theme => theme.breakpoints.down('md'));
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [isDisableContinueButton, setIsDisableContinueButton] = useState(true);

  const observerHandler = ({ lostSeed }: FormBlockValues) => {
    setIsDisableContinueButton(!lostSeed);
  };

  const handleSubmit = () => {
    const mnemonic = Bip39Service.generate();

    dispatch(setMnemonic(mnemonic));
    dispatch(setWalletStep(CreateWalletStepEnum.mnemonic));
  };

  return (
    <StyledStepContainer>
      <Stack gap={'0.5rem'}>
        <Typography color="background.light" variant="h4">
          <FormattedMessage id="WALLET.PRIVACY_POLICY_STEP.HEADING"></FormattedMessage>
        </Typography>
      </Stack>
      <StyledFormBlock>
        <Stack gap="2rem">
          <Typography color="background.light" variant="body1">
            <FormattedMessage id="WALLET.PRIVACY_POLICY_STEP.DESCRIPTION"></FormattedMessage>
          </Typography>
          <FormBlock<FormBlockValues>
            className="privacyPolicyForm"
            id="privacy-policy-form"
            observerHandler={observerHandler}
            inputsData={[
              {
                inputName: 'lostSeed',
                type: FormBlockInputTypesEnum.checkbox,
                inputProps: {
                  label: {
                    type: 'jsx',
                    component: (
                      <Typography color="background.light" variant="body2">
                        <FormattedMessage id="WALLET.PRIVACY_POLICY_STEP.LOST_SEED" />
                      </Typography>
                    ),
                  },
                },
              },
            ]}
          />
        </Stack>
      </StyledFormBlock>
      <StyledButtonsContainer>
        <Button
          isFullWidth={isMobile}
          onClick={() => router.back()}
          className="buttonBack"
          variant="secondary"
          size={'large'}
        >
          <FormattedMessage id="SUMMARY.BACK" />
        </Button>
        <Button
          isFullWidth={isMobile}
          isDisabled={isDisableContinueButton}
          onClick={handleSubmit}
          className="button"
          size={'large'}
        >
          <FormattedMessage id="SUMMARY.CONTINUE" />
        </Button>
      </StyledButtonsContainer>
    </StyledStepContainer>
  );
};

export default PrivacyPolicyStep;

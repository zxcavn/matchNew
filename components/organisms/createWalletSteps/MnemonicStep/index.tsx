import { Typography } from '@mui/material';
import { FormattedMessage } from 'react-intl';

import { downloadFile } from '@/helpers';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { Button } from '@/lib/xfi.lib/components/atoms';
import { useMediaQuery } from '@/lib/xfi.lib/theme';
import { CreateWalletStepEnum } from '@/store/wallet';
import { walletMnemonicSelector } from '@/store/wallet/selectors';
import { setWalletStep } from '@/store/wallet/slice';

import { SeedPhrase } from '@/components/molecules';

import { ButtonsContainer, MnemonicStepContainer } from './styles';

const MnemonicStep = () => {
  const isMobile = useMediaQuery(theme => theme.breakpoints.down('md'));
  const mnemonic = useAppSelector(walletMnemonicSelector);
  const dispatch = useAppDispatch();

  const setPreviousStep = () => {
    dispatch(setWalletStep(CreateWalletStepEnum.privacy));
  };

  const downloadMnemonicFile = () => {
    downloadFile({
      content: mnemonic,
      type: 'text/plain;charset=utf-8',
      fileName: 'xfi_console_seed_phrase.txt',
    });
  };

  const onClickContinue = () => {
    dispatch(setWalletStep(CreateWalletStepEnum.confirm));
  };

  return (
    <MnemonicStepContainer>
      <Typography color="background.light" className="heading" variant="h4">
        <FormattedMessage id="WALLET.SAVE_SEED_PHRASE" />
      </Typography>
      <SeedPhrase mnemonic={mnemonic} />
      <Typography
        className="downloadButton"
        onClick={downloadMnemonicFile}
        component="button"
        color="secondary.main"
        variant="link"
      >
        <FormattedMessage id="WALLET.DOWNLOAD_FILE" />
      </Typography>
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
        <Button isFullWidth={isMobile} onClick={onClickContinue} className="button" size={'large'}>
          <FormattedMessage id="SUMMARY.CONTINUE" />
        </Button>
      </ButtonsContainer>
    </MnemonicStepContainer>
  );
};

export default MnemonicStep;

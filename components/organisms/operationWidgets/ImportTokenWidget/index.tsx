import { Stack } from '@mui/material';
import { NumberFormatter } from '@xfi/formatters';
import { useMemo, useState } from 'react';
import { FormattedMessage } from 'react-intl';

import { useWalletTokens } from '@/hooks';
import { Button, ButtonProps, Modal } from '@/lib/xfi.lib/components/atoms';
import { useMediaQuery } from '@/lib/xfi.lib/theme';
import { NONE_VALUE } from '@/shared/constants';
import { StorageToken } from '@/store/walletTokens';

import { OperationStatus } from '@/components/atoms';
import ConfirmOperation, { TextBlock } from '@/components/molecules/ConfirmOperation';

import { TabType } from './constants';
import ImportToken from './ImportToken';
import type { ActiveStep } from './types';

type Props = {
  buttonProps?: ButtonProps;
};

const ImportTokenWidget = ({ buttonProps = {} }: Props) => {
  const isMobile = useMediaQuery(theme => theme.breakpoints.down('md'));

  const [activeStep, setActiveStep] = useState<ActiveStep>(null);
  const [tokenInfo, setTokenInfo] = useState<StorageToken | null>(null);
  const [currentTab, setCurrentTab] = useState<TabType>(TabType.search);

  const { addToken } = useWalletTokens();

  const onCloseModal = () => {
    setActiveStep(null);
    setTokenInfo(null);
    setCurrentTab(TabType.search);
  };

  const onCloseSuccessModal = () => {
    if (tokenInfo) addToken(tokenInfo);

    onCloseModal();
  };

  const setIsOpen = activeStep === 'success' ? onCloseSuccessModal : onCloseModal;

  const displayBalance = useMemo(() => {
    return tokenInfo
      ? NumberFormatter.formatUnitsToDisplay(tokenInfo.balance, {
          decimals: tokenInfo.decimals,
        })
      : NONE_VALUE;
  }, [tokenInfo]);

  return (
    <>
      <Button onClick={() => setActiveStep('import')} size={isMobile ? 'medium' : 'large'} {...buttonProps}>
        <FormattedMessage id="TOKENS.IMPORT_TOKEN" />
      </Button>

      <Modal title={{ id: 'TOKENS.IMPORT_TOKEN' }} isOpen={Boolean(activeStep)} setIsOpen={setIsOpen}>
        {activeStep === 'import' && (
          <ImportToken
            initialContractAddress={tokenInfo?.contractAddress}
            tab={currentTab}
            setTab={tab => {
              setCurrentTab(tab);
              setTokenInfo(null);
            }}
            onCancel={onCloseModal}
            onNext={token => {
              setTokenInfo(token);
              setActiveStep('confirm');
            }}
          />
        )}

        {activeStep === 'confirm' && tokenInfo && (
          <ConfirmOperation
            title="TOKENS.WOULD_YOU_LIKE_IMPORT_TOKEN"
            onCancel={() => setActiveStep('import')}
            onSubmit={() => setActiveStep('success')}
            cancelButtonText="SUMMARY.BACK"
            submitButtonText="SUMMARY.IMPORT"
          >
            <TextBlock caption="SUMMARY.TOKEN" text={tokenInfo.name} />
            <TextBlock
              caption="SUMMARY.SHORT_BALANCE"
              text={
                <Stack direction="row" alignItems="center" gap="0.5rem">
                  <span>{displayBalance}</span>
                  {tokenInfo.symbol}
                </Stack>
              }
            />
          </ConfirmOperation>
        )}

        {activeStep === 'success' && tokenInfo && (
          <Stack alignItems="center" justifyContent="center" height="100%" pb="1rem">
            <OperationStatus
              text={<FormattedMessage id="TOKENS.SUCCESS_ADD_TOKEN" values={{ tokenName: tokenInfo.name }} />}
            />
          </Stack>
        )}
      </Modal>
    </>
  );
};

export default ImportTokenWidget;

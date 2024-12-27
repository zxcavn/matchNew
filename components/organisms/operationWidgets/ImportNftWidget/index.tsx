import { Stack } from '@mui/material';
import { useState } from 'react';
import { FormattedMessage } from 'react-intl';

import { Button, Modal } from '@/lib/xfi.lib/components/atoms';
import { useMediaQuery } from '@/lib/xfi.lib/theme';

import ImportNft from './ImportNft';

type ActiveStep = 'import' | 'fail' | 'success' | null;

const ImportNftWidget = () => {
  const isMobile = useMediaQuery(theme => theme.breakpoints.down('md'));

  const [activeStep, setActiveStep] = useState<ActiveStep>(null);
  const [errorMessage, setErrorMessage] = useState('');

  const onCloseModal = () => {
    setActiveStep(null);
  };

  return (
    <>
      <Button
        onClick={() => setActiveStep('import')}
        variant={'secondary'}
        size={isMobile ? 'medium' : 'large'}
        isFullWidth={isMobile}
      >
        <FormattedMessage id="TOKENS.IMPORT_NFT" />
      </Button>

      <Modal title={{ id: 'TOKENS.IMPORT_NFT' }} isOpen={Boolean(activeStep)} setIsOpen={onCloseModal}>
        {activeStep === 'import' && (
          <ImportNft
            onCancel={onCloseModal}
            onNext={errorText => {
              errorText && setErrorMessage(errorText);
              setActiveStep(errorText ? 'fail' : 'success');
            }}
          />
        )}

        {activeStep === 'success' && (
          <Stack alignItems="center" justifyContent="center" height="100%" pb="1rem">
          </Stack>
        )}

        {activeStep === 'fail' && (
          <Stack alignItems="center" justifyContent="center" height="100%" pb="1rem">
          </Stack>
        )}
      </Modal>
    </>
  );
};

export default ImportNftWidget;

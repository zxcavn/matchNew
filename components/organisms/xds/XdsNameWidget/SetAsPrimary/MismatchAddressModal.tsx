import { Stack, Typography } from '@mui/material';
import { FormattedMessage } from 'react-intl';

import { Button } from '@/lib/xfi.lib/components/atoms/Button';
import { type ModalProps, Modal } from '@/lib/xfi.lib/components/atoms/Modal';

type Props = Pick<ModalProps, 'isOpen' | 'setIsOpen'> & {
  onCancel: () => void;
  onNext: () => void;
};

const MismatchAddressModal = ({ onCancel, onNext, ...modalProps }: Props) => {
  return (
    <Modal title={{ id: 'XDS_NAME.SET_AS_PRIMARY' }} {...modalProps}>
      <Stack height="100%" gap="2rem" justifyContent="space-between">
        <Stack gap="1.5rem">
          <Typography variant="body1" color="neutrals.secondaryText">
            <FormattedMessage id="XDS_NAME.SET_AS_PRIMARY.MISMATCH_ADDRESS" />
          </Typography>
          <Typography variant="body1" color="neutrals.secondaryText">
            <FormattedMessage id="XDS_NAME.SET_AS_PRIMARY.NEED_TO_UPDATE_ADDRESS" />
          </Typography>
        </Stack>
        <Stack direction={{ md: 'row', xs: 'column-reverse' }} gap="1rem">
          <Button onClick={onCancel} isFullWidth size="large" variant="secondary">
            <FormattedMessage id="SUMMARY.BACK" />
          </Button>
          <Button onClick={onNext} isFullWidth size="large">
            <FormattedMessage id="SUMMARY.CONTINUE" />
          </Button>
        </Stack>
      </Stack>
    </Modal>
  );
};

export default MismatchAddressModal;

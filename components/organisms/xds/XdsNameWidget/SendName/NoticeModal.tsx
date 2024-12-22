import { Stack, Typography } from '@mui/material';
import { FormattedMessage } from 'react-intl';

import { Button } from '@/lib/xfi.lib/components/atoms';
import { Modal, ModalProps } from '@/lib/xfi.lib/components/atoms/Modal';

type Props = Pick<ModalProps, 'isOpen' | 'setIsOpen'> & {
  onCancel: () => void;
  onNext: () => void;
};

const NoticeModal = ({ onCancel, onNext, ...modalProps }: Props) => {
  return (
    <Modal title={{ id: 'XDS.SEND_NAME' }} {...modalProps}>
      <Stack justifyContent="space-between" height="100%" gap="2rem">
        <Stack gap="1.5rem">
          <Typography variant="body1" color="neutrals.secondaryText">
            <FormattedMessage id="XDS.SEND_NAME.NOTICE_1" />
          </Typography>
          <Typography variant="body1" color="neutrals.secondaryText">
            <FormattedMessage id="XDS.SEND_NAME.NOTICE_2" />
          </Typography>
        </Stack>
        <Stack gap="1rem" direction={{ md: 'row', xs: 'column-reverse' }}>
          <Button onClick={onCancel} isFullWidth size="large" variant="secondary">
            <FormattedMessage id="SUMMARY.BACK" />
          </Button>
          <Button isFullWidth size="large" onClick={onNext}>
            <FormattedMessage id="SUMMARY.I_UNDERSTAND" />
          </Button>
        </Stack>
      </Stack>
    </Modal>
  );
};

export default NoticeModal;

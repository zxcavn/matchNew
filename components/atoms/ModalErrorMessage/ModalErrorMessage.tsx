import { alpha, Stack, Typography } from '@mui/material';
import { FormattedMessage } from 'react-intl';

import { Icon } from '@/lib/xfi.lib/components/atoms';
import { NotificationsErrorIcon } from '@/lib/xfi.lib/icons';

export const MODAL_ERROR_MESSAGE_TEST_ID = 'modal-error-message-test-id';
export const MESSAGE_TEXT_TEST_ID = 'message-text-test-id';
export const ADDITIONAL_MESSAGE_TEXT_TEST_ID = 'additional-message-text-test-id';

type Props = {
  /** @type {FormattedMessageId} */
  message: string;
  /** @type {FormattedMessageId} */
  additional?: string;
  className?: string;
};

const ModalErrorMessage = ({ message, additional, className }: Props) => {
  return (
    <Stack
      direction="row"
      gap="1rem"
      bgcolor={theme => alpha(theme.palette.alerts.error, 0.2)}
      borderRadius="1rem"
      padding="1.25rem"
      className={className}
      data-testid={MODAL_ERROR_MESSAGE_TEST_ID}
    >
      <Icon src={NotificationsErrorIcon} viewBox="0 0 20 20" sx={{ fontSize: '1.25rem' }} />
      <Stack gap="0.5rem">
        <Typography data-testid={MESSAGE_TEXT_TEST_ID} variant="subtitle1" color="background.light">
          <FormattedMessage id={message} />
        </Typography>
      </Stack>
      {additional && (
        <Typography data-testid={ADDITIONAL_MESSAGE_TEXT_TEST_ID} variant="body1" color="background.light">
          <FormattedMessage id={additional} />
        </Typography>
      )}
    </Stack>
  );
};

export default ModalErrorMessage;

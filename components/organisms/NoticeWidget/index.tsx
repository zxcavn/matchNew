import { Box, Typography } from '@mui/material';
import { memo, useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';

import { useAppDispatch } from '@/hooks';
import { Alert, Snackbar } from '@/lib/xfi.lib/components/atoms';
import { useIntlHelpers } from '@/lib/xfi.lib/i18n';
import { Listener, NotificationEvent, NotificationService } from '@/services/notificationService';
import { addNotification } from '@/store/notifications/slice';
import { AddNotificationPayload } from '@/store/notifications/types';

import { NoticeWidgetWrapper } from './styles';

const AUTO_HIDE_DURATION = 2500;

const NoticeWidget = () => {
  const dispatch = useAppDispatch();
  const { isFormattedMessageId } = useIntlHelpers();
  const [isOpen, setIsOpen] = useState(false);
  const [notification, setNotification] = useState<AddNotificationPayload | null>();

  useEffect(() => {
    const eventEmitter = NotificationService.getInstance();

    const listener: Listener = event => {
      if (!(event instanceof NotificationEvent)) return;

      setNotification(event.notification);
      dispatch(addNotification(event.notification));
      setIsOpen(true);
    };

    eventEmitter.subscribe(listener);

    return () => eventEmitter.unsubscribe(listener);
  }, [setNotification, dispatch]);

  const onClose = () => {
    setIsOpen(false);
    setNotification(null);
  };

  if (!notification) {
    return null;
  }

  return (
    <NoticeWidgetWrapper>
      <Snackbar isOpen={isOpen} direction="right" onClose={onClose} autoHideDuration={AUTO_HIDE_DURATION}>
        <Alert severity={notification.type} onClose={onClose}>
          <Box className="textWrapper">
            <Typography className="messageText" variant="h4">
              {isFormattedMessageId(notification.message?.id) ? (
                <FormattedMessage id={notification.message?.id} values={notification.message?.values} />
              ) : (
                notification.message?.text
              )}
            </Typography>
            {notification.additional && (
              <Typography className="additionalText" variant="body1">
                {isFormattedMessageId(notification.additional?.id) ? (
                  <FormattedMessage id={notification.additional?.id} values={notification.additional?.values} />
                ) : (
                  notification.additional?.text
                )}
              </Typography>
            )}
            {/* todo add when there is a bell */}
            {/* {!isMobile && <Typography variant="caption">{format(new Date(date), 'HH:mm')}</Typography>} */}
          </Box>
        </Alert>
      </Snackbar>
    </NoticeWidgetWrapper>
  );
};

export default memo(NoticeWidget);

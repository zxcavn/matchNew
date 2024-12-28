import { NotificationsType, NotificationsVariant } from '@/store/notifications/types';

export const notificationTypes: Record<
  NotificationsVariant,
  Omit<NotificationsType, 'date' | 'id' | 'isRead' | 'isVisible'>
> = {
  success: {
    type: 'success',
    message: {
      id: 'MESSAGES.SUCCESS',
    },
  },
  warning: {
    type: 'warning',
    message: {
      id: 'MESSAGES.WARNING',
    },
  },
  error: {
    type: 'error',
    message: {
      id: 'MESSAGES.ERROR',
    },
  },
  info: {
    type: 'info',
    message: {
      text: 'Info text',
    },
  },
};

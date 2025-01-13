import { NotificationService } from '@/services/notificationService';
import { AddNotificationPayload } from '@/store/notifications/types';

const pushNotification = (notification: AddNotificationPayload) => {
  const notificationService = NotificationService.getInstance();

  notificationService.push(notification);
};

export default pushNotification;

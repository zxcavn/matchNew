import { notificationTypes } from '@/shared/constants/notificationTypes';
import { CosmosMessageType } from '@/shared/types';
import { AddNotificationPayload } from '@/store/notifications/types';

import pushNotification from './pushNotification';

export const pushInitTxNotification = (notification?: AddNotificationPayload) => {
  pushNotification(
    notification || {
      ...notificationTypes.success,
      message: { id: 'NOTIFICATIONS.TRANSACTION_STATUS' },
      additional: { id: 'NOTIFICATIONS.SUCCESS_INIT_TRANSACTION' },
    }
  );
};

export const pushErrorTxNotification = (id: string) => {
  pushNotification({
    ...notificationTypes.error,
    message: { id: 'ERRORS.TRANSACTION_ERROR' },
    additional: { id },
  });
};

const operationNames = {
  [CosmosMessageType.DELEGATE]: 'Bond',
  [CosmosMessageType.REDELEGATE]: 'Rebond',
  [CosmosMessageType.REWARD]: 'Claim',
  [CosmosMessageType.UNDELEGATE]: 'Unbond',
  [CosmosMessageType.MULTISEND]: 'Multisend',
  [CosmosMessageType.CONVERT_COIN]: 'Convert coin',
  [CosmosMessageType.TRANSFER]: 'Send',
  [CosmosMessageType.SUBMIT_PROPOSAL]: 'Submit proposal',
  [CosmosMessageType.DEPOSIT]: 'Deposit',
  [CosmosMessageType.VOTE]: 'Vote',
};

export const pushSuccessTxNotification = (type: CosmosMessageType, notification?: AddNotificationPayload) => {
  if (notification) {
    pushNotification(notification);

    return;
  }

  pushNotification({
    ...notificationTypes.success,
    message: {
      id: 'NOTIFICATIONS.TRANSACTION_CONFIRMATION',
    },
    additional: {
      id: 'OPERATIONS.SUCCESS_OPERATION',
      values: { operation: operationNames[type] || 'Operation' },
    },
  });
};

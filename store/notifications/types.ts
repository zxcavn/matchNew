export const SLICE_NAME = 'NOTIFICATIONS';

export type NotificationsVariant = 'success' | 'warning' | 'error' | 'info';

export type NotificationsType = {
  date: number;
  id: string;
  message: {
    id?: string;
    values?: Record<string, string>;
    text?: string;
  };
  additional?: {
    id?: string;
    values?: Record<string, string>;
    text?: string;
  };
  isRead: boolean;
  type: NotificationsVariant;
};

export interface NotificationsInitialState {
  drawerOpen: boolean;
  data: NotificationsType[];
}

export type AddNotificationPayload = Omit<NotificationsType, 'date' | 'id' | 'isRead'>;

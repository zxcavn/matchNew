import { AddNotificationPayload } from '@/store/notifications/types';

import NotificationQueue, { EVENT_NAME, NotificationEvent } from './notificationQueue';

export interface Listener extends EventListener {
  (event: NotificationEvent): void;
}

class NotificationService {
  private static instance: NotificationService;

  private queue: NotificationQueue;

  private constructor() {
    this.queue = new NotificationQueue();
  }

  static getInstance() {
    if (!this.instance) {
      this.instance = new NotificationService();
    }

    return this.instance;
  }

  push(notification: AddNotificationPayload) {
    this.queue.add(new NotificationEvent(notification));
  }

  subscribe(listener: Listener) {
    this.queue.addEventListener(EVENT_NAME, listener);
  }

  unsubscribe(listener: Listener) {
    this.queue.removeEventListener(EVENT_NAME, listener);
  }
}

export default NotificationService;

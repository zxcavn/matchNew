import { AddNotificationPayload } from '@/store/notifications/types';

const DELAY = 3000;

export const EVENT_NAME = 'NotificationEvent';

export class NotificationEvent extends Event {
  constructor(public readonly notification: AddNotificationPayload) {
    super(EVENT_NAME);
  }
}

class NotificationQueue extends EventTarget {
  private queue = new Set<NotificationEvent>();

  private current: NotificationEvent | null = null;

  add(notification: NotificationEvent) {
    this.queue.add(notification);

    if (!this.current) {
      this.next();
    }
  }

  private timeout() {
    return new Promise(resolve => setTimeout(resolve, DELAY));
  }

  private async next() {
    this.current = this.queue[Symbol.iterator]().next().value;

    if (this.current) {
      this.queue.delete(this.current);
      this.dispatchEvent(this.current);
      await this.timeout();
      this.next();
    }
  }
}

export default NotificationQueue;

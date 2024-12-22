type Handler = <D>(event: string, data?: D) => void;

export class EventEmitter {
  private readonly events: { [eventName: string]: Handler[] } = {};

  on(eventName: string, handler: Handler) {
    if (!this.events[eventName]) {
      this.events[eventName] = [];
    }

    this.events[eventName].push(handler);
  }

  off(eventName: string, handler?: Handler) {
    if (!handler) {
      this.events[eventName] = [];
    } else {
      this.events[eventName] = this.events[eventName].filter(eventHandler => handler !== eventHandler);
    }
  }

  emit<D>(eventName: string, data?: D) {
    const handlers = this.events[eventName];

    if (handlers) {
      handlers.forEach(callback => callback(eventName, data));
    }
  }
}

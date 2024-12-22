import * as Sentry from '@sentry/nextjs';

const styles = {
  error: 'color: black; background: #fc5b5b;',
};

type ErrorOptions = {
  name: string;
  error: unknown;
  payload?: Record<string, unknown>;
};

class LoggerService {
  private static isFailedToFetchError(error: unknown): error is TypeError {
    return error instanceof TypeError && error.message === 'Failed to fetch';
  }

  private static stringifySafely(arg: unknown): string | null {
    try {
      return JSON.stringify(arg);
    } catch {
      return null;
    }
  }

  static error({ name, error, payload }: ErrorOptions) {
    console.error(`%c ${name} `, styles.error, error, payload);

    if (this.isFailedToFetchError(error)) return;

    Sentry.withScope(scope => {
      scope.setExtra('logger', name);

      if (payload) {
        Object.entries(payload).forEach(([key, value]) => {
          scope.setExtra(key, this.stringifySafely(value));
        });
      }

      Sentry.captureException(error);
    });
  }
}

export default LoggerService;

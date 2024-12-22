import { type CalendarEvent, google } from 'calendar-link';

import type { XdsName } from '@/store/xds';

export type ReminderOption = {
  /** @type {FormattedMessageId} */
  label: string;
  makeUrl: (event: CalendarEvent) => string;
};

export const OPTIONS: Array<ReminderOption> = [
  {
    label: 'SUMMARY.GOOGLE_CALENDAR',
    makeUrl: google,
  },
];

export const makeEvent = ({ name, expires }: XdsName): CalendarEvent => ({
  title: `Renew ${name}`,
  start: expires,
  url: window.location.href,
  duration: [10, 'minute'],
});

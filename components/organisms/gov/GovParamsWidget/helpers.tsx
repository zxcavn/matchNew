import { declensionOfNumber } from '@xfi/helpers';
import { FormattedMessage } from 'react-intl';

export const formatTime = (seconds: number, locale?: string) => {
  const SECONDS_IN_MINUTE = 60;
  const SECONDS_IN_HOUR = 60 * SECONDS_IN_MINUTE;
  const SECONDS_IN_DAY = 24 * SECONDS_IN_HOUR;

  let time;
  let words;

  if (seconds >= SECONDS_IN_DAY) {
    time = Math.floor(seconds / SECONDS_IN_DAY);
    words = ['SUMMARY.DAYS', 'SUMMARY.DAYS_1', 'SUMMARY.DAYS_2'];
  } else if (seconds >= SECONDS_IN_HOUR) {
    time = Math.floor(seconds / SECONDS_IN_HOUR);
    words = ['SUMMARY.HOURS', 'SUMMARY.HOURS_1', 'SUMMARY.HOURS_2'];
  } else {
    time = Math.floor(seconds / SECONDS_IN_MINUTE);
    words = ['SUMMARY.MINUTES', 'SUMMARY.MINUTES_1', 'SUMMARY.MINUTES_2'];
  }

  const timeUnitWord = declensionOfNumber(time, words, locale);

  return (
    <>
      {time} <FormattedMessage id={timeUnitWord} />
    </>
  );
};

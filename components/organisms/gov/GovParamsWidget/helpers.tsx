import { FormattedMessage, FormattedPlural } from 'react-intl';

export const formatTime = (seconds: number) => {
  const SECONDS_IN_MINUTE = 60;
  const SECONDS_IN_HOUR = 60 * SECONDS_IN_MINUTE;
  const SECONDS_IN_DAY = 24 * SECONDS_IN_HOUR;

  let time;
  let words;

  if (seconds >= SECONDS_IN_DAY) {
    time = Math.floor(seconds / SECONDS_IN_DAY);
    words = { one: 'SUMMARY.DAYS', few: 'SUMMARY.DAYS_1', other: 'SUMMARY.DAYS_2' };
  } else if (seconds >= SECONDS_IN_HOUR) {
    time = Math.floor(seconds / SECONDS_IN_HOUR);
    words = { one: 'SUMMARY.HOURS', few: 'SUMMARY.HOURS_1', other: 'SUMMARY.HOURS_2' };
  } else {
    time = Math.floor(seconds / SECONDS_IN_MINUTE);
    words = { one: 'SUMMARY.MINUTES', few: 'SUMMARY.MINUTES_1', other: 'SUMMARY.MINUTES_2' };
  }

  return (
    <>
      {time}{' '}
      <FormattedPlural
        value={time}
        one={<FormattedMessage id={words.one} />}
        few={<FormattedMessage id={words.few} />}
        other={<FormattedMessage id={words.other} />}
      />
    </>
  );
};

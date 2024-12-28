import { Box, Typography } from '@mui/material';
import { useCountDown } from '@xfi/hooks';
import { intervalToDuration } from 'date-fns';
import { useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';

export const TEST_ID = 'count-down-test-id';

export type Props = {
  countStart: number;
};

type Duration = { hours?: string; minutes?: string; seconds?: string };

const addZeroFirst = (number?: number) => ((number && number < 10) || number === 0 ? `0${number}` : String(number));

const CountDown = ({ countStart }: Props) => {
  const [duration, setDuration] = useState<Duration>({
    hours: '0',
    minutes: '0',
    seconds: '0',
  });

  const [count, { startCountdown }] = useCountDown({
    countStart: countStart,
    isIncrement: false,
    countStop: 0,
  });

  useEffect(() => {
    startCountdown();
  }, []);

  useEffect(() => {
    const { hours, minutes, seconds } = intervalToDuration({ start: 0, end: count * 1000 });

    setDuration({
      hours: addZeroFirst(hours),
      minutes: addZeroFirst(minutes),
      seconds: addZeroFirst(seconds),
    });
  }, [count]);

  return (
    <>
      <Box display={'flex'} gap={'0.25rem'} alignItems={'baseline'} data-testid={TEST_ID}>
        <Typography color={'background.light'} variant={'body1'}>
          <FormattedMessage id={'SUMMARY.AVAILABLE_VIA'} />
        </Typography>
        <Typography
          variant={'subtitle1'}
          component={'span'}
          color={'secondary.main'}
          minWidth={'3.5rem'}
        >{`${duration.hours}:${duration.minutes}:${duration.seconds}`}</Typography>
      </Box>
    </>
  );
};

export default CountDown;

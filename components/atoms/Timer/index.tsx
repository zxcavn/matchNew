import { Stack, styled, SxProps, Typography } from '@mui/material';
import { useCountDown } from '@xfi/hooks';
import { useEffect } from 'react';

import Check from './Check';
import GradientCircle from './GradientCircle';

type Props = {
  count: number;
  sx?: SxProps;
  onEnd: () => void;
};

const COUNT_STOP = 0;

const Timer = ({ count: countProp, onEnd, sx = {} }: Props) => {
  const [count, { startCountdown }] = useCountDown({
    countStart: countProp,
    countStop: COUNT_STOP,
    isIncrement: false,
  });

  const isLoading = count > COUNT_STOP;

  useEffect(() => {
    startCountdown();
  }, []);

  useEffect(() => {
    if (count <= 0) {
      onEnd();
    }
  }, [count, onEnd]);

  return (
    <StyledContainer sx={sx}>
      <GradientCircle className="gradientCircle" withAnimation={isLoading} />
      {isLoading ? (
        <Typography className="countText" variant="h3_infynyte">
          {count}
        </Typography>
      ) : (
        <Check className="checkIcon" />
      )}
    </StyledContainer>
  );
};

const StyledContainer = styled(Stack, { name: 'StyledContainer' })(({ theme }) => ({
  position: 'relative',
  alignItems: 'center',
  justifyContent: 'center',
  width: '10.375rem',
  height: '10.375rem',

  [theme.breakpoints.down('md')]: {
    width: '7.5rem',
    height: '7.5rem',
  },

  '&& .countText': {
    position: 'absolute',
    top: '50%',
    left: '50%',
    color: theme.palette.primary.light,
    fontSize: '3rem',
    lineHeight: '3.45rem',
    transform: 'translate(-50%, -50%)',

    [theme.breakpoints.down('md')]: {
      fontSize: '2.5rem',
      lineHeight: '2.875rem',
    },
  },

  '& .checkIcon': {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '4.875rem',
    height: '4.875rem',

    [theme.breakpoints.down('md')]: {
      width: '3.563rem',
      height: '3.563rem',
    },
  },
}));

export default Timer;

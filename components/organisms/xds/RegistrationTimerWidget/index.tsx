import { Stack, Typography } from '@mui/material';
import { useCallback, useEffect, useRef, useState } from 'react';
import { FormattedMessage } from 'react-intl';

import { useCurrentRegistrationItem, useRegistrationData, useXdsNamePageParam } from '@/hooks/xds';
import { Divider } from '@/lib/xfi.lib/components/atoms';
import { RegistrationData } from '@/store/xds';

import { Timer } from '@/components/atoms';

import ConfirmRegistration from './ConfirmRegistration';
import ResetRegistration from './ResetRegistration';
import { StyledBlock, StyledButtonsContainer } from './styles';

type Props = {
  className?: string;
};

const RegistrationTimerWidget = ({ className }: Props) => {
  const [isTimerExpire, setIsTimerExpire] = useState(false);
  const { displayName } = useXdsNamePageParam();
  const { updateCurrentData, updateData } = useRegistrationData();
  const data = useCurrentRegistrationItem();
  const dataRef = useRef(data);
  const countRef = useRef(getTimerCount(dataRef.current));

  useEffect(() => {
    if (dataRef.current && !dataRef.current.isStarted) {
      const data: RegistrationData = {
        ...dataRef.current,
        isStarted: true,
      };

      updateCurrentData({ isStarted: true });
      updateData({ name: data.payload.name, data });
    }
  }, []);

  const onTimerEnd = useCallback(() => {
    setIsTimerExpire(true);
  }, []);

  return (
    <StyledBlock className={className}>
      <Stack width="100%">
        <Typography className="nameHeading" variant="h3_infynyte">
          {displayName}
        </Typography>
        <Divider />
        <Stack mt={{ md: '2.5rem', xs: '2rem' }} alignItems="center">
          <Typography className="title" variant="h2">
            <FormattedMessage id="SUMMARY.ALMOST_HERE" />
          </Typography>
          <Timer onEnd={onTimerEnd} count={countRef.current} />
          <Typography className="description" variant="body1">
            <FormattedMessage id="XDS.TIMER.DESCRIPTION" />
          </Typography>
          <StyledButtonsContainer>
            <ResetRegistration className="button" />
            <ConfirmRegistration isDisabled={!isTimerExpire} className="button" />
          </StyledButtonsContainer>
        </Stack>
      </Stack>
    </StyledBlock>
  );
};

const getTimerCount = (registrationData: RegistrationData | null): number => {
  const INITIAL_TIMER_COUNT = 60;

  if (!registrationData?.isStarted) {
    return INITIAL_TIMER_COUNT;
  }

  const startTimestamp = registrationData?.commitmentData?.startTimestamp;

  if (!startTimestamp) {
    return 0;
  }

  const currentTimestamp = Date.now();
  const diff = Math.floor((currentTimestamp - startTimestamp) / 1000);

  return diff >= INITIAL_TIMER_COUNT ? 0 : INITIAL_TIMER_COUNT - diff;
};

export default RegistrationTimerWidget;

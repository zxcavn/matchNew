import { Stack, Typography } from '@mui/material';
import { useEffect, useMemo, useState } from 'react';
import { useIntl } from 'react-intl';

import { mapDurationCountToSeconds, pushNotification } from '@/helpers';
import { formatDurationCount } from '@/helpers/dateFormatters';
import {
  useCurrentRegistrationItem,
  useEstimateRegistration,
  useRegistrationData,
  useXdsNamePageParam,
} from '@/hooks/xds';
import { AppLocale } from '@/lib/i18n';
import { REGISTRATION_INTERVAL } from '@/shared/constants/xds';

import { Counter, XdsPricingBlock } from '@/components/molecules';

import StartTimer from './StartTimer';
import { StyledBlock } from './styles';

const RegistrationPricingWidget = () => {
  const { locale } = useIntl();
  const { name, displayName } = useXdsNamePageParam();
  const [durationCount, setDurationCount] = useState(1);
  const { updateCurrentData } = useRegistrationData();
  const registrationData = useCurrentRegistrationItem();

  const { displayDuration } = useMemo(
    () => ({
      displayDuration: formatDurationCount(durationCount, REGISTRATION_INTERVAL, locale as AppLocale),
    }),
    [durationCount, locale]
  );

  const { isLoading, error, namePrice, networkFee, totalPrice, usdtPrice } = useEstimateRegistration({
    name,
    duration: BigInt(registrationData?.payload.duration || 0),
    secret: registrationData?.payload.secret || '',
  });

  const onChangeDurationCount = (count: number) => {
    setDurationCount(count);

    if (!registrationData) return;

    updateCurrentData({
      durationCount: count,
      payload: {
        ...registrationData.payload,
        duration: mapDurationCountToSeconds(count),
      },
    });
  };

  useEffect(() => {
    if (error) {
      pushNotification({
        type: 'error',
        message: { id: 'NOTIFICATIONS.NAME_REGISTRATION' },
        additional: { id: 'ERRORS.UNEXPECTED_ERROR' },
      });
    }
  }, [error]);

  return (
    <StyledBlock>
      <Typography className="nameTitle" color="background.light" variant="h3_infynyte">
        {displayName}
      </Typography>
      <Stack width="100%" gap={{ md: '2.5rem', xs: '1.5rem' }}>
        <Counter value={durationCount} onChange={onChangeDurationCount}>
          {displayDuration}
        </Counter>
        <XdsPricingBlock
          usdtPrice={usdtPrice}
          data={[
            {
              text: { id: 'SUMMARY.REGISTRATION_TIME_BY_DURATION', values: { duration: displayDuration } },
              amount: namePrice,
            },
            { text: { id: 'SUMMARY.ESTIMATED_NETWORK_FEE' }, amount: networkFee },
            { text: { id: 'SUMMARY.ESTIMATED_TOTAL' }, amount: totalPrice, isPrimaryText: true },
          ]}
        />
        <StartTimer className="startTimer" isLoading={isLoading} isDisabled={Boolean(error) || !registrationData} />
      </Stack>
    </StyledBlock>
  );
};

export default RegistrationPricingWidget;

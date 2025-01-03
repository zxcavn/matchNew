import { Stack, Typography, useTheme } from '@mui/material';
import { differenceInSeconds } from 'date-fns';
import { memo, useMemo } from 'react';
import { FormattedMessage } from 'react-intl';

import { Mission, SocialNetworkType } from '@/crud/xfiPad';
import { Button } from '@/lib/xfi.lib/components/atoms';
import { AppThemeVariant, useMediaQuery } from '@/lib/xfi.lib/theme';

import { CountDown, MissionTypeBadge } from '@/components/atoms';


import { StyledContentContainer, StyledDescriptionText, StyledImageContainer, StyledMissionCard } from './styles';

type Props = {
  mission: Mission;
  onClickCheck: ({ id, socialNetwork }: { id: string; socialNetwork: SocialNetworkType | null }) => void;
  isLoading?: boolean;
  isDocumentVisible?: boolean;
};

const VIOLET_NAME_COLOR = '#A154C5';

const MissionCard = ({ mission, onClickCheck, isLoading, isDocumentVisible }: Props) => {
  const { type, id, nextTimestampAchievement } = mission;

  const theme = useTheme();
  const isMobile = useMediaQuery(theme => theme.breakpoints.down('md'));
  const isTimerExist = useMemo(() => new Date() < new Date(nextTimestampAchievement), [nextTimestampAchievement]);

  const isShowTimer = isTimerExist && isDocumentVisible;
  const isDarkMode = theme.palette.mode === AppThemeVariant.dark;

  return (
    <StyledMissionCard $isSocialNetworkCard>
      <StyledImageContainer>
      </StyledImageContainer>
      <StyledContentContainer>
        <Stack
          width={'100%'}
          direction={{ md: 'row' }}
          justifyContent={'space-between'}
          gap={{ md: '1rem', xs: '1.5rem' }}
        >
          <Stack gap={{ md: '1rem', xs: '1.5rem' }} justifyContent={{ md: 'space-between' }}>
            <Stack
              direction={'row'}
              alignItems={{ md: 'center' }}
              justifyContent={{ md: 'flex-start', xs: 'space-between' }}
              gap={{ md: '1rem', xs: '1.5rem' }}
            >
              <Typography
                variant={'h2'}
              >
                <FormattedMessage/>
              </Typography>
              <Stack direction={{ md: 'row' }} gap={'0.5rem'} alignItems={{ md: 'center', xs: 'flex-end' }}>
                <MissionTypeBadge missionType={type}/>
              </Stack>
            </Stack>
            <StyledDescriptionText>
              <FormattedMessage/>
            </StyledDescriptionText>
          </Stack>
          <Stack
            gap={'1.5rem'}
            flexShrink={0}
            justifyContent={isShowTimer ? 'space-between' : 'flex-end'}
            direction={{ md: 'column', xs: 'column-reverse' }}
            alignItems={{ md: 'flex-end', xs: 'center' }}
          >
            {isShowTimer && (
              <CountDown countStart={differenceInSeconds(new Date(nextTimestampAchievement), new Date())} />
            )}
            <Stack width={'100%'} direction={'row'} alignItems={'center'} gap={'1rem'}>
              <Button
                isFullWidth={isMobile}
                isDisabled={isTimerExist}
                variant={'secondary'}
                size={'large'}
              >
              </Button>
              <Button
                isDisabled={isTimerExist}
                isLoading={isLoading}
                isFullWidth={isMobile}
                size={'large'}
              >
                <FormattedMessage id={'SUMMARY.CHECK'} />
              </Button>
            </Stack>
          </Stack>
        </Stack>
      </StyledContentContainer>
    </StyledMissionCard>
  );
};

export default memo(MissionCard);

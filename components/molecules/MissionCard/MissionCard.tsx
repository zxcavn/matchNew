import { Stack, Typography, useTheme } from '@mui/material';
import { openNewSource } from '@xfi/helpers';
import { differenceInSeconds } from 'date-fns';
import Image from 'next/image';
import { memo, useMemo } from 'react';
import { FormattedMessage } from 'react-intl';

import { Mission, SocialNetworkType } from '@/crud/xfiPad';
import { Button } from '@/lib/xfi.lib/components/atoms';
import { AppThemeVariant, useMediaQuery } from '@/lib/xfi.lib/theme';

import { MissionDetails } from '@/components/organisms/MissionListWidget/constants';

import { StyledContentContainer, StyledDescriptionText, StyledImageContainer, StyledMissionCard } from './styles';

type Props = {
  details: MissionDetails;
  mission: Mission;
  onClickCheck: ({ id, socialNetwork }: { id: string; socialNetwork: SocialNetworkType | null }) => void;
  isLoading?: boolean;
  isDocumentVisible?: boolean;
};

const VIOLET_NAME_COLOR = '#A154C5';

const MissionCard = ({ details, mission, onClickCheck, isLoading, isDocumentVisible }: Props) => {
  const { name, image, description, detailsUrl, subscribeUrl, socialNetwork = null, chainType } = details;
  const { type, id, nextTimestampAchievement } = mission;

  const theme = useTheme();
  const isMobile = useMediaQuery(theme => theme.breakpoints.down('md'));
  const isTimerExist = useMemo(() => new Date() < new Date(nextTimestampAchievement), [nextTimestampAchievement]);

  const isShowTimer = isTimerExist && isDocumentVisible;
  const isDarkMode = theme.palette.mode === AppThemeVariant.dark;

  const onClickOpenSource = () => {
    const url = detailsUrl || subscribeUrl;

    if (url) {
      openNewSource(url, '_blank');
    }
  };

  return (
    <StyledMissionCard $isSocialNetworkCard={!!socialNetwork}>
      <StyledImageContainer>
        <Image sizes="100vw" src={image} fill alt={'card image'} />
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
                color={(isDarkMode && (detailsUrl ? 'primary.main' : VIOLET_NAME_COLOR)) || 'background.light'}
              >
                <FormattedMessage id={name} />
              </Typography>
              <Stack direction={{ md: 'row' }} gap={'0.5rem'} alignItems={{ md: 'center', xs: 'flex-end' }}>
              </Stack>
            </Stack>
            <StyledDescriptionText>
              <FormattedMessage id={description} />
            </StyledDescriptionText>
          </Stack>
          <Stack
            gap={'1.5rem'}
            flexShrink={0}
            justifyContent={isShowTimer ? 'space-between' : 'flex-end'}
            direction={{ md: 'column', xs: 'column-reverse' }}
            alignItems={{ md: 'flex-end', xs: 'center' }}
          >
            <Stack width={'100%'} direction={'row'} alignItems={'center'} gap={'1rem'}>
              <Button
                isFullWidth={isMobile}
                isDisabled={isTimerExist}
                onClick={onClickOpenSource}
                variant={'secondary'}
                size={'large'}
              >
                <FormattedMessage id={detailsUrl ? 'SUMMARY.DETAILS' : 'SUMMARY.SUBSCRIBE'} />
              </Button>
              <Button
                isDisabled={isTimerExist}
                isLoading={isLoading}
                isFullWidth={isMobile}
                onClick={() => onClickCheck({ id, socialNetwork })}
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

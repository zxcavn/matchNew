import { Box, Stack, styled, Typography, useTheme } from '@mui/material';
import { openNewSource } from '@xfi/helpers';
import { memo } from 'react';
import { FormattedMessage } from 'react-intl';

import { Button, Icon } from '@/lib/xfi.lib/components/atoms';
import { XappIcon } from '@/lib/xfi.lib/icons';
import { AppThemeVariant, useMediaQuery } from '@/lib/xfi.lib/theme';

import { DappMissionDetails } from '@/components/organisms/MissionListWidget/constants';

import { StyledContentContainer, StyledDescriptionText, StyledMissionCard } from './styles';

type Props = {
  details: DappMissionDetails;
};

const DappMissionCard = ({ details }: Props) => {
  const { name, icon, description, detailsUrl, launchUrl } = details;

  const theme = useTheme();
  const isMobile = useMediaQuery(theme => theme.breakpoints.down('md'));

  const isDarkMode = theme.palette.mode === AppThemeVariant.dark;

  const onClickOpenSource = (url: string) => {
    if (url) {
      openNewSource(url, '_blank');
    }
  };

  return (
    <StyledMissionCard $isSocialNetworkCard={false}>
      <StyledIconContainer>
        <Icon src={icon.src} viewBox={icon.viewBox} />
      </StyledIconContainer>
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
              <Typography variant={'h2'} color={isDarkMode ? 'primary.main' : 'background.light'}>
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
            justifyContent={'flex-end'}
            direction={{ md: 'column', xs: 'column-reverse' }}
            alignItems={{ md: 'flex-end', xs: 'center' }}
          >
            <Stack width={'100%'} direction={'row'} alignItems={'center'} gap={'1rem'}>
              <Button
                isFullWidth={isMobile}
                onClick={() => onClickOpenSource(detailsUrl)}
                variant={'secondary'}
                size={'large'}
              >
                <FormattedMessage id={'SUMMARY.DETAILS'} />
              </Button>
              <Button isFullWidth={isMobile} onClick={() => onClickOpenSource(launchUrl)} size={'large'}>
                <FormattedMessage id={'SUMMARY.LAUNCH'} />
              </Button>
            </Stack>
          </Stack>
        </Stack>
      </StyledContentContainer>
    </StyledMissionCard>
  );
};

export default memo(DappMissionCard);

export const StyledIconContainer = styled(Box, { name: 'StyledIconContainer' })(({ theme }) => ({
  background:
    theme.palette.mode === AppThemeVariant.dark ? theme.palette.neutrals.tableLine : theme.palette.neutrals.dark,
  borderRadius: '1.5rem',
  minWidth: '17.875rem',
  minHeight: '12.25rem',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '0 2rem',

  [theme.breakpoints.down('md')]: {
    padding: '2.5rem',
    height: '3.75rem',
  },

  '& > svg': {
    width: '100%',
    height: '100%',
    maxWidth: '13.125rem',
  },
}));

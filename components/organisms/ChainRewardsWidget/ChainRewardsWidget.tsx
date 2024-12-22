import { Stack, styled, Typography } from '@mui/material';
import { FormattedMessage } from 'react-intl';

import { Block } from '@/lib/xfi.lib/components/atoms';

import GetRewards from './GetRewards';
import RewardsImage from './RewardsImage';

const ChainRewardsWidget = () => {
  return (
    <StyledChainRewardsWidgetContainer title="SUMMARY.REWARDS">
      <StyledRewardsImage />
      <StyledContentContainer>
        <Typography mb="0.5rem" variant="h3" color="background.light">
          <FormattedMessage id="CHAIN_REWARDS.TITLE" />
        </Typography>
        <Typography mb="1.5rem" variant="body2" color="neutrals.secondaryText">
          <FormattedMessage id="CHAIN_REWARDS.DESCRIPTION" />
        </Typography>
      </StyledContentContainer>
      <GetRewards />
    </StyledChainRewardsWidgetContainer>
  );
};

const StyledContentContainer = styled(Stack, { name: 'StyledContentContainer' })(({ theme }) => ({
  maxWidth: '16.125rem',
  zIndex: 1,

  [theme.breakpoints.down('md')]: {
    maxWidth: '100%',
    paddingTop: '15.5rem',
  },
}));

const StyledChainRewardsWidgetContainer = styled(Block, { name: 'StyledChainRewardsWidgetContainer' })(({ theme }) => ({
  background: 'none',
  borderColor: theme.palette.neutrals.border,
  position: 'relative',

  '& .blockChildren': {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    height: '100%',
  },

  [theme.breakpoints.down('md')]: {
    padding: '1rem 1.5rem',
  },
}));

const StyledRewardsImage = styled(RewardsImage, { name: 'StyledRewardsImage' })(({ theme }) => ({
  bottom: 0,
  right: 0,
  transform: 'translate(9%, 11%)',

  [theme.breakpoints.down(1480)]: {
    width: '18rem',
    height: '18rem',
  },

  [theme.breakpoints.down('md')]: {
    top: 0,
    right: '50%',
    transform: 'translate(50%, 4%)',
    width: '17.75rem',
    height: '17.75rem',
  },
}));

export default ChainRewardsWidget;

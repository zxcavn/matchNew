import { Box, Stack, styled } from '@mui/material';

import { Button, Input } from '@/lib/xfi.lib/components/atoms';
import { shouldForwardProp } from '@/lib/xfi.lib/helpers';

export const StyledListContainer = styled(Stack, { name: 'StyledListContainer' })(({ theme }) => ({
  '& > *:not(:last-child)': {
    [theme.breakpoints.down('lg')]: {
      marginBottom: '1rem',
    },
  },
}));

export const StyledTitleWrapper = styled(Stack, { name: 'StyledTitleWrapper' })(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: '1fr auto auto',
  gridGap: '1.5rem',
  alignItems: 'center',
  alignContent: 'center',
  [theme.breakpoints.down('md')]: {
    gridTemplateColumns: '1fr auto',
    gridTemplateRows: 'auto',
    justifyContent: 'space-between',
    '& > :last-child': { gridColumn: '1 / -1' },
  },
}));

export const StyledListItem = styled(Box, { name: 'StyledListItem', shouldForwardProp })<{ $isFill?: boolean }>(
  ({ theme, $isFill }) => ({
    display: 'grid',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '1.5rem',
    gridTemplateColumns: 'minmax(7.125rem, auto) minmax(20.625rem, 3fr) minmax(23.875rem, 3fr)',
    background: $isFill ? theme.palette.neutrals.tableLine : 'none',

    [theme.breakpoints.down('lg')]: {
      gridTemplateColumns: '1fr 1fr',
      gridTemplateRows: 'auto',
      gap: '1.5rem',
      padding: '1.5rem',
    },

    [theme.breakpoints.down('md')]: {
      gridTemplateColumns: '1fr',
      padding: '1rem',
    },
  })
);

export const StyledSearchInput = styled(Input, { name: 'StyledSearchInput' })(({ theme }) => ({
  width: '100%',
  maxWidth: '22.0625rem',

  [theme.breakpoints.down('md')]: {
    maxWidth: '100%',
  },
}));

export const StyledStakingContainer = styled(Box, { name: 'StyledStakingContainer' })(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '0.625rem',
  justifyContent: 'flex-end',

  [theme.breakpoints.down('md')]: {
    justifyContent: 'flex-start',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gridColumn: '1 / 3',
    width: '100%',
    gap: '1rem',
  },
}));

export const StyledStakingButtonsContainer = styled(Box, { name: 'StyledStakingButtonsContainer' })(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '0.625rem',

  [theme.breakpoints.down('lg')]: {
    width: '100%',

    '& .unbondButton': {
      background: theme.palette.neutrals.dark,
    },
  },
}));

export const StyledRewardContainer = styled(Box, { name: 'StyledRewardContainer' })(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  gap: '0.625rem',

  [theme.breakpoints.down('md')]: {
    justifyContent: 'flex-start',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gridColumn: '1 / 3',
    gap: '1rem',
  },
}));

export const StyledRefreshButton = styled(Button, { name: 'StyledRefreshButton' })(({ theme }) => ({
  whiteSpace: 'nowrap',

  '&:hover': {
    svg: {
      path: {
        stroke: theme.palette.primary.light,
      },
    },
  },

  '&:active': {
    svg: {
      path: {
        stroke: theme.palette.primary.lighter,
      },
    },
  },
}));

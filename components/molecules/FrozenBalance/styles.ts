import { Box, Stack, styled } from '@mui/material';

import { shouldForwardProp } from '@/lib/xfi.lib/helpers';

export const FrozenBalanceContainer = styled(Box, { name: 'FrozenBalanceContainer' })(() => ({
  '& th': {
    width: '50%',
  },

  '& .completionTime': {
    flexDirection: 'row',
    gap: '0.25rem',
  },
}));

export const StyledListItem = styled(Stack, { name: 'StyledListItem', shouldForwardProp })<{ $isFill?: boolean }>(
  ({ theme, $isFill }) => ({
    gap: '0.75rem',
    padding: '1rem',
    background: $isFill ? theme.palette.gradient.card : 'initial',

    '& .completionTime': {
      flexWrap: 'wrap',
      justifyContent: 'flex-end',
    },
  })
);

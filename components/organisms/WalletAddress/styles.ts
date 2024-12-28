import { Box, styled } from '@mui/material';
import { alpha } from '@mui/material/styles';

import { Block } from '@/lib/xfi.lib/components/atoms';
import { theme } from '@/lib/xfi.lib/theme';

export const StyledWalletAddressContainer = styled(Box, { name: 'StyledWalletAddressContainer' })(({ theme }) => {
  return {
    display: 'flex',
    alignItems: 'flex-end',
    gap: '1rem',
    width: '100%',

    '& .button': {
      padding: '1rem',
      minWidth: '3.5rem',
      width: '3.5rem',
      height: '3.5rem',
    },

    '& .copyInput': {
      width: '100%',

      '& input': {
        maxHeight: '2.75rem',
      },

      '& .endAdorned': {
        marginLeft: 0,
      },
    },

    [theme.breakpoints.down('md')]: {
      flexDirection: 'column',
      alignItems: 'center',
    },

    '& .startAdornment': {
      display: 'flex',
      alignItems: 'center',
      marginLeft: '-0.5rem',
    },
  };
});

export const StyledCompactWalletAddress = styled('div', { name: 'StyledCompactWalletAddress' })(() => ({
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem',
  cursor: 'pointer',

  '& .copyButton': {
    width: '2.75rem',
    height: '2.75rem',
    padding: '0.25rem 0.625rem',
    borderRadius: '2rem',
    border: '1px solid',
    borderColor: alpha(theme.palette.common.white, 0.3),
    background: theme.palette.gradient.card,
  },
}));

export const StyledBlock = styled(Block, { name: 'StyledBlock' })(({ theme }) => ({
  '&': {
    padding: '1.5rem',
    background: 'none',
    borderColor: theme.palette.neutrals.border,
  },
}));

import { styled } from '@mui/material';

import { Button } from '@/lib/xfi.lib/components/atoms';
import { shouldForwardProp } from '@/lib/xfi.lib/helpers';
import { AppThemeVariant } from '@/lib/xfi.lib/theme';

export const StyledLogoutButton = styled(Button, { name: 'StyledLogoutButton', shouldForwardProp })<{
  $withExtension?: boolean;
}>(({ theme, $withExtension }) => ({
  '&&': {
    minWidth: '2.75rem',
  },

  '.keplrIcon': {
    display: 'none',
  },

  '.logoutIcon': {
    path: {
      stroke: theme.palette.mode === AppThemeVariant.dark ? theme.palette.common.white : theme.palette.primary.main,
    },
  },

  ...($withExtension && {
    '&&': {
      width: 'initial',
      padding: '0 0.75rem',

      '.buttonChildren': {
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem',

        '.keplrIcon': {
          display: 'initial',
          width: '1.5rem',
          height: '1.5rem',
        },
      },
    },
  }),
}));

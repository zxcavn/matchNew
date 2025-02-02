import { styled } from '@mui/material';

import { shouldForwardProp } from '@/helpers';
import { AppThemeVariant } from '@/theme';
import { Button } from '../../Button';

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

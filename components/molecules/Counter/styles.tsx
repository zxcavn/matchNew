import { ButtonBase, ButtonBaseProps, Stack, styled } from '@mui/material';

import { AppThemeVariant } from '@/lib/xfi.lib/theme';

export const StyledCounterContainer = styled(Stack, { name: 'StyledCounterContainer' })(({ theme }) => ({
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  width: '100%',
  gap: '1rem',
  borderRadius: '6.25rem',
  border: `1px solid ${theme.palette.neutrals.border}`,
  padding: '0.875rem',
}));

export const StyledButton = styled((props: ButtonBaseProps) => (
  <ButtonBase disableRipple disableTouchRipple {...props} />
))(({ theme }) => {
  const isDark = theme.palette.mode === AppThemeVariant.dark;

  return {
    width: '4rem',
    height: '4rem',
    borderRadius: '50%',
    backgroundColor: theme.palette.primary.main,

    svg: {
      path: {
        stroke: isDark ? theme.palette.background.light : theme.palette.background.dark,
      },
    },

    '&:disabled': {
      backgroundColor: theme.palette.neutrals.light,

      svg: {
        path: {
          stroke: theme.palette.neutrals.secondaryText,
        },
      },
    },

    [theme.breakpoints.down('md')]: {
      width: '3rem',
      height: '3rem',
    },
  };
});

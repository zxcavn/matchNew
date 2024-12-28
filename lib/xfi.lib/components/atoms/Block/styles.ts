import { Stack, styled } from '@mui/material';

import { shouldForwardProp } from '../../../helpers';
import { AppThemeVariant } from './../../../theme/index';

export type BlockVariant = 'gradient' | 'transparent';

export const StyledBlock = styled(Stack, { name: 'StyledBlock', shouldForwardProp })<{ $variant?: BlockVariant }>(
  ({ theme, $variant = 'gradient' }) => {
    const isGradientBlock = $variant === 'gradient';
    const gradientBlockBorderColor =
      theme.palette.mode === AppThemeVariant.dark ? theme.palette.neutrals.border : theme.palette.common.white;

    return {
      position: 'relative',
      borderRadius: '1.5rem',
      background: isGradientBlock ? theme.palette.gradient.card : 'transparent',
      border: '1px solid',
      borderColor: isGradientBlock ? gradientBlockBorderColor : theme.palette.neutrals.border,
      color: theme.palette.background.light,
      padding: '1.5rem',
      width: '100%',

      [theme.breakpoints.down('md')]: {
        padding: '1.5rem 1rem',
      },
    };
  }
);

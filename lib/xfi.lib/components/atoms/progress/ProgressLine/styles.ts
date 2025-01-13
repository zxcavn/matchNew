import { alpha, Stack, styled } from '@mui/material';

import { shouldForwardProp } from '../../../../helpers';

const DEFAULT_BORDER_COLOR = 'linear-gradient(123.3deg, #47EE58 9.43%, #093F0F 174.91%)';

export const StyledProgressLine = styled(Stack, { name: 'StyledProgressLine', shouldForwardProp })<{
  $isBorderVariant: boolean;
  $background?: string;
}>(({ theme, $isBorderVariant, $background }) => ({
  position: 'relative',
  width: '100%',
  alignItems: 'start',
  justifyContent: 'center',

  '&.small': {
    height: $isBorderVariant ? '0.5594rem' : '0.375rem',

    '&::before': {
      padding: '0.5px',
    },
  },

  '&.medium': {
    height: $isBorderVariant ? '0.875rem' : '0.5rem',

    '&::before': {
      padding: '1px',
    },
  },

  '&::before': {
    content: "''",
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: '0.5625rem',
    background: $background
      ? $background
      : $isBorderVariant
      ? DEFAULT_BORDER_COLOR
      : alpha(theme.palette.background.light, 0.1),
    ...($isBorderVariant && {
      '-webkit-mask': 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
      '-webkit-mask-composite': 'xor',
      maskComposite: 'exclude',
    }),
  },

  '.progress': {
    position: 'relative',
    maxWidth: '100%',
    borderRadius: '0.5625rem',

    '&.small': {
      margin: $isBorderVariant ? '0 1.5px' : 0,
    },

    '&.medium': {
      margin: $isBorderVariant ? '0 2px' : 0,
    },
  },
}));

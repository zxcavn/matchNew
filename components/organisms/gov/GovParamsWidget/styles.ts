import { styled } from '@mui/material';

import { Block } from '@/lib/xfi.lib/components/atoms';
import { shouldForwardProp } from '@/lib/xfi.lib/helpers';

const MIDDLE_WIDTH = 868;
const SMALL_WIDTH = 568;

export const StyledGovParamsBlock = styled(Block, { name: 'StyledGovParamsBlock', shouldForwardProp })<{
  $width: number;
}>(({ theme, $width }) => ({
  padding: 0,
  flexDirection: 'row',
  width: '100%',

  ...($width < MIDDLE_WIDTH && {
    padding: 0,
  }),

  [theme.breakpoints.down('md')]: {
    padding: 0,
  },

  '& .blockChildren': {
    width: '100%',
  },

  '& .paramsWrapper': {
    padding: '1.5rem',
    display: 'grid',
    gridTemplateColumns: 'repeat(6, auto)',
    width: '100%',
    minHeight: '6.0625rem',

    ...($width < MIDDLE_WIDTH && {
      padding: '1rem',
      gridTemplateColumns: 'repeat(3, auto)',
    }),

    ...($width < SMALL_WIDTH && {
      gridTemplateColumns: 'repeat(2, 1fr)',
    }),
  },

  '& .paramBlock': {
    position: 'relative',
    padding: '0 1.9812rem',
    justifyContent: 'space-between',
    borderRight: '1px solid',
    borderColor: theme.palette.neutrals.border,

    '&:last-child': {
      borderRight: 'none',
    },

    ...($width < MIDDLE_WIDTH && {
      padding: '0 0 1rem 2.4688rem',

      '&:nth-of-type(1), &:nth-of-type(2), &:nth-of-type(3)': {
        '&:before': {
          content: '""',
          position: 'absolute',
          bottom: 0,
          height: '1px',
          width: '70%',
          backgroundColor: theme.palette.neutrals.border,
        },
      },

      '&:nth-of-type(3)': {
        borderRight: 'none',
      },

      '&:first-of-type': {
        padding: '0 0 1rem 2.4688rem',
      },

      '&:nth-of-type(4), &:nth-of-type(5), &:nth-of-type(6)': {
        padding: '1rem 0 0 2.4688rem',
      },
    }),

    ...($width < SMALL_WIDTH && {
      padding: 0,

      '&:nth-of-type(even)': {
        padding: '0 0 0 1rem',
        borderRight: 'none',
      },

      '&:nth-of-type(1), &:nth-of-type(2), &:nth-of-type(3)': {
        '&:before': {
          content: '""',
          position: 'absolute',
          bottom: 0,
          height: '1px',
          width: '90%',
          backgroundColor: theme.palette.neutrals.border,
        },
      },

      '&:nth-of-type(1)': {
        padding: '0 0 1rem 0',
      },

      '&:nth-of-type(2)': {
        padding: '0 0 1rem 1rem',
      },

      '&:nth-of-type(3)': {
        padding: '1rem 0 1rem 0',
        borderRight: '1px solid',
        borderColor: theme.palette.neutrals.border,
      },

      '&:nth-of-type(4)': {
        padding: '1rem 0 1rem 1rem',

        '&:before': {
          content: '""',
          position: 'absolute',
          bottom: 0,
          height: '1px',
          width: '90%',
          backgroundColor: theme.palette.neutrals.border,
        },
      },

      '&:nth-of-type(5)': {
        padding: '1rem 0 0 0',
      },

      '&:nth-of-type(6)': {
        padding: '1rem 0 0 1rem',
      },
    }),
  },
}));

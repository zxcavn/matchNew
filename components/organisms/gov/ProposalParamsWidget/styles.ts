import { styled } from '@mui/material';

import { Block } from '@/lib/xfi.lib/components/atoms';
import { DateTime } from '@/lib/xfi.lib/components/molecules';

export const StyledDateTime = styled(DateTime, { name: 'StyledDateTime' })(({ theme }) => ({
  flexDirection: 'row',
  gap: '0.25rem',

  '&& *': {
    color: theme.palette.background.light,
    fontSize: '0.875rem',
    fontWeight: 700,
  },
}));

const MIDDLE_WIDTH = 680;
const SMALL_WIDTH = 500;

export const StyledParametersBlock = styled(Block, { name: 'StyledParametersBlock' })<{
  $hasVotingParams: boolean;
  $width: number;
}>(({ theme, $hasVotingParams, $width }) => ({
  padding: '1.5rem',
  background: theme.palette.neutrals.sidebar,
  border: 'none',

  '& .votingParams': {
    paddingBottom: '1rem',
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    borderBottom: '1px solid',
    borderColor: theme.palette.neutrals.toast,

    ...($width < SMALL_WIDTH && {
      gridTemplateColumns: 'repeat(1, 1fr)',
    }),

    '& .paramBlock': {
      gap: '1rem',

      '&:nth-of-type(2)': {
        paddingLeft: '1rem',
        borderLeft: '1px solid',
        borderColor: theme.palette.neutrals.border,
      },

      ...($width < SMALL_WIDTH && {
        '&:nth-of-type(1)': {
          paddingBottom: '1rem',
          borderBottom: '1px solid',
          borderColor: theme.palette.neutrals.border,
        },

        '&:nth-of-type(2)': {
          paddingTop: '1rem',
          paddingLeft: 0,
          borderLeft: 'none',
        },
      }),
    },
  },

  '& .otherParams': {
    paddingTop: $hasVotingParams ? '1rem' : 0,
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',

    ...($width < MIDDLE_WIDTH && {
      gridTemplateColumns: 'repeat(2, 1fr)',
    }),

    ...($width < SMALL_WIDTH && {
      gridTemplateColumns: 'repeat(1, 1fr)',
    }),

    '& .paramBlock': {
      gap: '1rem',

      '&:nth-of-type(2), &:nth-of-type(3)': {
        paddingLeft: '1rem',
        borderLeft: '1px solid',
        borderColor: theme.palette.neutrals.border,
      },

      ...($width < MIDDLE_WIDTH && {
        '&:nth-of-type(2)': {
          position: 'relative',
          paddingLeft: '1rem',

          '&:before': {
            content: '""',
            position: 'absolute',
            left: 0,
            height: '80%',
            width: '1px',
            backgroundColor: theme.palette.neutrals.border,
          },
        },

        '&:nth-of-type(2), &:nth-of-type(3)': {
          paddingBottom: '1rem',
        },

        '&:nth-of-type(3)': {
          paddingTop: '1rem',
          paddingLeft: 0,
          paddingBottom: 0,
          gridColumn: '1 / span 2',
          borderLeft: 'none',
          borderTop: '1px solid',
          borderColor: theme.palette.neutrals.toast,
        },
      }),

      ...($width < SMALL_WIDTH && {
        '&:nth-of-type(1)': {
          paddingBottom: '1rem',
          borderBottom: '1px solid',
          borderColor: theme.palette.neutrals.border,
        },

        '&:nth-of-type(2)': {
          paddingTop: '1rem',
          paddingLeft: 0,
          borderBottom: '1px solid',
          borderColor: theme.palette.neutrals.border,

          '&:before': {
            display: 'none',
          },
        },

        '&:nth-of-type(3)': {
          paddingTop: '1rem',
          paddingBottom: 0,
          gridColumn: '1 / span 1',
        },
      }),
    },
  },
}));

import { Stack, styled } from '@mui/material';

export const StyledPaginationInputContainer = styled(Stack, { name: 'StyledPaginationInputContainer' })(
  ({ theme }) => ({
    position: 'relative',
    paddingRight: '1.5rem',
    flexDirection: 'row',
    gap: '1rem',
    alignItems: 'center',

    '&:after': {
      content: '""',
      position: 'absolute',
      right: 0,
      width: '0.0625rem',
      height: '2rem',
      background: theme.palette.neutrals.border,
    },

    [theme.breakpoints.down('sm')]: {
      paddingRight: 0,

      '&:after': {
        display: 'none',
      },
    },

    '& .paginationInput': {
      maxWidth: '5.6875rem',
    },
  })
);

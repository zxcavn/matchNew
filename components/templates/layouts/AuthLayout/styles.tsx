import { Stack, styled } from '@mui/material';

import { AppFooter, AuthHeader } from '@/components/organisms';

export const StyledAuthLayout = styled(Stack, { name: 'StyledAuthLayout' })(({ theme }) => ({
  backgroundColor: theme.palette.background.dark,
}));

export const StyledMainContent = styled(Stack, { name: 'StyledContent' })(({ theme }) => ({
  position: 'relative',
  minHeight: '50vh',

  '& > .children': {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexGrow: 1,
    zIndex: 2,
    padding: '2.5rem',

    [theme.breakpoints.down('md')]: {
      padding: '0.9375rem',
    },
  },

  '& > .backgroundAnimation': {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
}));

export const StyledAppFooter = styled<typeof AppFooter>(props => <AppFooter {...props} />, { name: 'StyledAppFooter' })(
  ({ theme }) => ({
    padding: '2rem 2.5rem',
    zIndex: 3,

    [theme.breakpoints.down('md')]: {
      padding: '2rem 0.94rem',
    },
  })
);

export const StyledAuthHeader = styled<typeof AuthHeader>(props => <AuthHeader {...props} />, {
  name: 'StyledAuthHeader',
})(({ theme }) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  zIndex: 3,
  padding: '0.75rem 2.5rem',

  [theme.breakpoints.down('md')]: {
    padding: '0.75rem 0.95rem',
    position: 'initial',
  },
}));

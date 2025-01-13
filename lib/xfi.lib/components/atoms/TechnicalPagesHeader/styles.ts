import { styled } from '@mui/material';

export const StyledTechnicalPagesHeader = styled('header', { name: 'StyledTechnicalPagesHeader' })(({ theme }) => ({
  padding: '1.25rem 2.5rem',
  zIndex: 1,

  '& .headerContent': {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  [theme.breakpoints.down('sm')]: {
    padding: '0.75rem 0.9375rem',
  },
}));

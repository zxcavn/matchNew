import { styled, TableContainer } from '@mui/material';

import { Pagination } from '../../atoms';

export const StyledTableContainer = styled(TableContainer, { name: 'StyledTableContainer' })(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '2.5rem',

  [theme.breakpoints.down('md')]: {
    gap: '1.5rem',
  },
}));

export const StyledTablePagination = styled(Pagination, { name: 'StyledTablePagination' })(({ theme }) => ({
  margin: '0 1.5rem',

  [theme.breakpoints.down('md')]: {
    margin: '0 1rem',
  },
}));

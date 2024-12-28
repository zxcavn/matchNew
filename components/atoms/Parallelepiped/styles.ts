import { styled } from '@mui/material';

export const StyledParallelepiped = styled('div', { name: 'StyledParallelepiped' })(({ theme }) => ({
  width: '100%',
  position: 'relative',
  padding: '3.187rem 2.5rem 3.437rem',
  flexDirection: 'row',
  justifyContent: 'space-between',
  border: '0.5rem solid',
  borderBottom: '2px solid',
  borderLeft: '2px solid',
  borderColor: theme.palette.primary.main,
  gap: '1rem',

  [theme.breakpoints.down('lg')]: {
    gap: '1rem',
  },

  '&::before': {
    content: "''",
    position: 'absolute',
    width: 0,
    height: 0,
    top: '-0.5rem',
    left: '-0.3125rem',
    borderTop: `8px solid ${theme.palette.background.dark}`,
    borderRight: '8px solid transparent',
  },

  '&::after': {
    content: "''",
    position: 'absolute',
    width: 0,
    height: 0,
    bottom: '-0.125rem',
    right: '-0.625rem',
    borderBottom: `0.5rem solid ${theme.palette.background.dark}`,
    borderLeft: '0.5rem solid transparent',
  },

  '.parallelogram1': {
    position: 'absolute',
    top: '-0.375rem',
    left: '0.0625rem',
    width: '100%',
    height: '0.25rem',
    transform: 'skewX(-45deg)',
    background: theme.palette.background.dark,
  },

  '.parallelogram2': {
    position: 'absolute',
    top: '-0.25rem',
    right: '-0.375rem',
    width: '0.25rem',
    height: '100%',
    transform: 'skewY(-45deg)',
    background: theme.palette.background.dark,
  },
}));

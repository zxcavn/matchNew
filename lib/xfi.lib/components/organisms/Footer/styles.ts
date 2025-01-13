import { styled } from '@mui/material';

export const StyledFooter = styled('footer', { name: 'StyledFooter' })(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '1.5rem',
  width: 'auto',
  background: theme.palette.background.dark,
  zIndex: 1,

  '& .legalInformation': {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: '0.5rem',

    [theme.breakpoints.down('lg')]: {
      flexDirection: 'column-reverse',
      '& :last-of-type(2)': { order: 1 },
    },
  },
}));

export const StyledFooterLinksWrapper = styled('div', { name: 'StyledFooterLinksWrapper' })(() => ({
  '& .item': {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',

    '& .linksWrapper': {
      display: 'flex',
      flexDirection: 'column',
      gap: '0.5rem',

      '& .link': {
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem',
      },
    },
  },
}));

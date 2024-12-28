import { styled } from '@mui/material';

import { shouldForwardProp } from '../../../../helpers';

export const StyledSideNavigation = styled('aside', { name: 'StyledSideNavigation', shouldForwardProp })<{
  $isOpen: boolean;
}>(({ theme, $isOpen }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: $isOpen ? 'initial' : 'center',
  padding: '1rem 0',
  gap: '2rem',
  width: $isOpen ? '12.5rem' : '4.5313rem',
  overflowY: 'auto',
  overflowX: 'hidden',
  color: 'white',
  background: theme.palette.neutrals.sidebar,
  borderRight: `1px solid ${theme.palette.neutrals.tableLine}`,
  transition: 'width 0.5s',
  WebkitOverflowScrolling: 'touch',
  zIndex: theme.zIndex.appBar,

  '&& .MuiAccordion-root': {
    padding: 0,
    width: '100%',
  },

  '::-webkit-scrollbar': {
    display: 'none',
  },

  '& .itemsWrapper': {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: $isOpen ? '1.25rem' : '1rem',
    height: '100%',
    width: '100%',

    '& .pagesLinksWrapper': {
      display: 'flex',
      flexDirection: 'column',
      gap: '0.5rem',
      paddingTop: '0.5rem',
    },
  },

  '& .sidebarLinksWrapper': {
    gap: '0.5rem',
    width: '100%',
  },

  '& .sidebarItem': {
    position: 'relative',
    width: '100%',
    minWidth: '2rem',
    maxHeight: '2rem',
    cursor: 'pointer',
    padding: $isOpen ? '0.375rem 0.5rem' : '0.375rem',
    borderRadius: '0.5rem',
    transition: 'background 0.3s ease',

    '&:hover': {
      background: theme.palette.neutrals.bg,
    },

    '&.isSelected': {
      background: theme.palette.neutrals.dark,
    },
  },
}));

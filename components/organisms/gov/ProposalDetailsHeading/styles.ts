import { Stack, styled } from '@mui/material';

export const StyledProposalDetailsHeading = styled(Stack, { name: 'StyledProposalDetailsHeading' })(({ theme }) => ({
  '& .titleBadgeWrapper': {
    marginBottom: '1rem',
    flexDirection: 'row',
    gap: '0.5rem',

    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
      alignItems: 'flex-start',
    },
  },

  '& .title': {
    wordWrap: 'break-word',
    overflowWrap: 'anywhere',
  },

  '& .proposalType': {
    [theme.breakpoints.up('sm')]: {
      marginTop: '-0.3125rem',
    },
  },
}));

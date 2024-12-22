import { Stack, styled } from '@mui/material';

export const StyledProposalStatisticsWidget = styled(Stack, { name: 'StyledProposalStatisticsWidget' })(
  ({ theme }) => ({
    padding: '1.5rem',
    gap: '1.5rem',
    borderRadius: '1rem',
    background: theme.palette.neutrals.sidebar,

    [theme.breakpoints.down('md')]: {
      padding: '1rem',
    },

    '& .statBlocksWrapper': {
      flexDirection: 'row',
      gap: '0.75rem',

      [theme.breakpoints.down('sm')]: {
        flexDirection: 'column',
      },
    },

    '& .statBlock': {
      padding: '0.75rem',
      flexDirection: 'row',
      justifyContent: 'space-between',
      gap: '0.5rem',
      width: '100%',
      border: '1px solid',
      borderColor: theme.palette.neutrals.border,
      borderRadius: '1rem',

      [theme.breakpoints.down('lg')]: {
        flexDirection: 'column',
      },
    },

    '& .thresholdBlocksWrapper': {
      flexDirection: 'row',
      gap: '1rem',

      [theme.breakpoints.down('sm')]: {
        flexDirection: 'column',
      },
    },

    '& .thresholdsDivider': {
      width: '1px',
      backgroundColor: 'red',

      [theme.breakpoints.down('sm')]: {
        width: '100%',
        height: '1px',
      },
    },

    '& .votesWrapper': {
      flexDirection: 'row',
      gap: '0.75rem',

      [theme.breakpoints.down('sm')]: {
        flexDirection: 'column',
      },
    },
  })
);

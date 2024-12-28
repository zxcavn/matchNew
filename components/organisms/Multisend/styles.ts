import { Box, styled } from '@mui/material';

export const MultisendContainer = styled(Box, { name: 'MultisendContainer' })(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '2.5rem',

  [theme.breakpoints.down('md')]: {
    gap: '1.5rem',
  },

  '& .recipientButton': {
    flexShrink: 0,
    alignSelf: 'flex-end',
  },
}));

export const HeaderContainer = styled(Box, { name: 'HeaderContainer' })(({ theme }) => ({
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',

  [theme.breakpoints.down('md')]: {
    gap: '1.5rem',
    alignItems: 'flex-start',
    flexDirection: 'column',
  },
}));

export const FormsContainer = styled(Box, { name: 'FormsContainer' })(({ theme }) => ({
  '& > *': {
    marginBottom: '1.5rem',
    paddingBottom: '2rem',
    borderBottom: `1px solid ${theme.palette.neutrals.border}`,

    [theme.breakpoints.down('md')]: {
      paddingBottom: '1rem',
    },
  },

  '& > *:last-child': {
    marginBottom: 0,

    [theme.breakpoints.down('md')]: {
      paddingBottom: '1.5rem',
    },
  },
}));

export const SendFormContainer = styled(Box, { name: 'SendFormContainer' })(({ theme }) => ({
  display: 'grid',
  width: '100%',
  gap: '1.5rem',

  '& .wrapper': {
    width: '100%',
    display: 'flex',
    gap: '1.5rem',

    '& .sendButton': {
      marginTop: '1.5rem',
      placeSelf: 'auto end',
    },

    [theme.breakpoints.down('md')]: {
      flexDirection: 'column',
      gridColumnStart: 1,

      '& .sendButton': {
        marginTop: 0,
      },
    },
  },

  '& .input': {
    [theme.breakpoints.down('md')]: {
      width: '100%',
    },
  },

  '& .sendButton': {
    minWidth: '6.5rem',
  },
}));

export const StyledSendFormInputsContainer = styled(Box, { name: 'StyledSendFormInputsContainer' })(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: '2.5fr 6fr',
  gap: '1.5rem',
  width: '100%',

  '& .messageInput': {
    gridColumn: '1 / 2',

    '& .captionWrapper': {
      position: 'initial',
      height: 'initial',
    },
  },

  [theme.breakpoints.down('md')]: {
    gridTemplateColumns: '1fr',

    '& .messageInput': {
      gridColumn: '1 / 2',
    },
  },
}));

export const StyledCommissionBlock = styled(Box, { name: 'StyledCommissionBlock' })(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: '9fr 12fr',
  justifyContent: 'space-between',
  gap: '1rem',

  [theme.breakpoints.down('md')]: {
    gridTemplateColumns: '1fr',
    gap: '2rem',
  },

  '& .commissionInput': {
    width: '100%',
  },

  '& .commissionInputsWrapper': {
    display: 'grid',
    gridTemplateColumns: 'auto 7rem',
    height: 'fit-content',
  },
}));

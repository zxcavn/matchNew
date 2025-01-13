import { FormControl, styled } from '@mui/material';

export const StyledRadioGroupContainer = styled(FormControl, { name: 'StyledRadioGroupContainer' })(({ theme }) => ({
  '& .MuiFormLabel-asterisk': {
    fontSize: '.75rem',
    color: theme.palette.error.main,
  },

  '& .MuiFormGroup-root': {
    gap: '1rem',
  },

  [theme.breakpoints.down('md')]: {
    '& .MuiFormControlLabel-label': {
      fontSize: '0.875rem',
    },
  },

  '&.disabled': {
    '&$root': {
      opacity: 0.6,
      pointerEvents: 'none',
    },
  },

  '&.isRow': {
    '& .MuiFormControlLabel-root:last-child': {
      marginRight: 0,
    },
  },

  '& .label': {
    paddingLeft: 0,
    paddingRight: 0,
    ...theme.typography.body2,
    color: theme.palette.primary.main,
  },
}));

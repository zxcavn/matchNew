import { Box, styled } from '@mui/material';

export const IconContainer = styled(Box)({
  minWidth: '1.5rem',
  width: '1.5rem',
  height: '1.5rem',
  minHeight: '1.5rem',
  marginRight: '0.75rem',
  display: 'flex',
  alignItems: 'center',

  '& > svg': {
    width: '1.5rem',
    height: '1.5rem',
  },
});

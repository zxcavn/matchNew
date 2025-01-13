import { FormControl, styled } from '@mui/material';

export const StyledCheckboxGroupContainer = styled(FormControl, { name: 'StyledCheckboxGroupContainer' })(() => ({
  width: '100%',

  '& .legendTitle': {
    marginLeft: 0,
  },
}));

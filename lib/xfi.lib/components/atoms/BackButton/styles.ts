import { Stack, styled } from '@mui/material';

import { AppThemeVariant } from '../../../theme';

const BtnBackWrapper = styled(Stack)(({ theme }) => ({
  color: theme.palette.background.light,
  cursor: 'pointer',

  ...(theme.palette.mode === AppThemeVariant.light && {
    '& svg path': {
      stroke: theme.palette.background.light,
    },
  }),
}));

export default BtnBackWrapper;

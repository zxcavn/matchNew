import { styled } from '@mui/material';

import { DateTime } from '../../../molecules/Table/components';

export const StyledDateTime = styled(DateTime, { name: 'StyledDateTime' })(({ theme }) => ({
  flexDirection: 'row',
  gap: '0.25rem',

  '&& *': {
    color: theme.palette.neutrals.secondaryText,
    fontSize: '0.875rem',
  },
}));

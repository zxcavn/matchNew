import { styled } from '@mui/material';

import { Button } from '@/lib/xfi.lib/components/atoms';

export const TransferButton = styled(Button, { name: 'TransferButton' })(({ theme }) => ({
  height: '2.75rem',

  [theme.breakpoints.down('md')]: {
    width: '100%',
  },
}));

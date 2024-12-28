import { styled, SxProps } from '@mui/material';

import { Button } from '@/lib/xfi.lib/components/atoms';

export const TRIGGER_CONTAINER_SX: SxProps = {
  cursor: 'initial',
  width: '100%',
};

export const StyledButton = styled(Button, { name: 'StyledButton' })(({ theme }) => ({
  '&&': {
    padding: '0.5rem 0 0.75rem',

    [theme.breakpoints.down('md')]: {
      width: '100%',
    },
  },
}));

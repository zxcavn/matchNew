import { styled } from '@mui/material';

import { TableBlock } from '@/lib/xfi.lib/components/molecules/Table';

export const StyledTableBlock = styled<typeof TableBlock>(props => <TableBlock {...props} />, {
  name: 'StyledTableBlock',
})(() => ({
  '& .tokensTable': {
    marginBottom: '1.5rem',
  },
}));

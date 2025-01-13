import { Box, styled, Table as MUITable, TableRow as MUITableRow } from '@mui/material';

import { shouldForwardProp } from '../../../../helpers';
import type { AlignCellParams } from '../../Table/types';

export const StyledTable = styled(MUITable, { name: 'StyledTable' })(({ theme }) => {
  return {
    position: 'relative',

    tbody: {
      tr: {
        borderTop: '1px solid',
        borderColor: theme.palette.neutrals.border,

        '&:nth-child(1)': {
          borderTop: 'none',
        },
      },
      td: {
        padding: '1.5rem',
        border: 'none',
      },
    },
  };
});

export const StyledTableRow = styled(MUITableRow, {
  name: 'StyledTableRow',
  shouldForwardProp,
})<{ $isClickable: boolean }>(({ theme, $isClickable }) => ({
  cursor: $isClickable ? 'pointer' : 'default',
  transition: 'background-color 0.3s ease',

  '&:hover': {
    backgroundColor: theme.palette.neutrals.tableLine,
  },
}));

type TableCellContainerProps = {
  $align?: AlignCellParams['align'];
};

export const StyledTableCellContainer = styled(Box, {
  shouldForwardProp,
  name: 'StyledTableCellContainer',
})<TableCellContainerProps>(({ $align = 'left' }) => {
  const justifyContent = {
    left: 'flex-start',
    center: 'center',
    right: 'flex-end',
  }[$align];

  return {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent,

    '& h6': {
      whiteSpace: 'nowrap',
    },
  };
});

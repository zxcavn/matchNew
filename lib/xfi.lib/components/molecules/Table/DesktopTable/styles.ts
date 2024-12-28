import { Box, styled, Table as MUITable, TableRow as MUITableRow } from '@mui/material';

import { shouldForwardProp } from '../../../../helpers';
import { getRowBackgroundColor } from '../helpers';
import type { AlignCellParams, RowBackgroundVariant, TableProps } from '../types';

export const StyledTable = styled(MUITable, { name: 'StyledTable', shouldForwardProp })<{
  $verticalAlign?: TableProps<unknown>['verticalAlign'];
}>(({ theme, $verticalAlign = 'top' }) => {
  return {
    position: 'relative',

    thead: {
      tr: {
        position: 'relative',
      },
      th: {
        border: 'none',
        padding: '1.5rem',
        color: theme.palette.primary.lighter,
        whiteSpace: 'nowrap',

        div: {
          flexDirection: 'row',
          justifyContent: 'flex-start',
        },
      },
    },

    tbody: {
      td: {
        border: 'none',
        color: theme.palette.primary.dark,
        padding: '1.5rem',
      },
      tr: {
        verticalAlign: $verticalAlign,
      },
    },

    '& .divider': {
      position: 'absolute',
      left: '1.5rem',
      width: 'calc(100% - 3rem)',
    },
  };
});

export const StyledTableRow = styled(MUITableRow, {
  shouldForwardProp,
  name: 'StyledTableRow',
})<{ $backgroundVariant?: RowBackgroundVariant }>(({ $backgroundVariant = 'default' }) => {
  const backgroundColor = getRowBackgroundColor($backgroundVariant);

  return {
    padding: '1rem',
    backgroundColor,
  };
});

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

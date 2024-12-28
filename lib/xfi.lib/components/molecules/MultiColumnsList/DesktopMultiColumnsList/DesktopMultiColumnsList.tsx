import { TableBody, TableCell } from '@mui/material';
import { useId } from 'react';

import { renderTableCellComponent } from '../helpers';
import type { MultiColumnsListColumnType, MultiColumnsListProps } from '../types';
import { StyledTable, StyledTableCellContainer, StyledTableRow } from './styles';

export const TEST_ID = 'desktop-table-test-id';

const DesktopMultiColumnsList = <T,>({
  className,
  rows,
  columns,
  onRowClick,
}: Omit<MultiColumnsListProps<T>, 'mobileColumns'>) => {
  const key = useId();

  return (
    <StyledTable className={className} data-testid={TEST_ID}>
      <TableBody>
        {rows.map((row, index) => (
          <TableBodyRow key={key + index} row={row} columns={columns} onClick={onRowClick} />
        ))}
      </TableBody>
    </StyledTable>
  );
};

type TableBodyRowProps<T> = {
  row: T;
  columns: MultiColumnsListColumnType<T>[];
  onClick?: (row: T) => void;
};

const TableBodyRow = <T,>({ columns, row, onClick }: TableBodyRowProps<T>) => {
  const key = useId();

  return (
    <StyledTableRow $isClickable={Boolean(onClick)} tabIndex={-1} onClick={() => onClick?.(row)}>
      {columns.map((column, index: number) => (
        <TableCell key={key + index}>
          <StyledTableCellContainer $align={column.align}>
            {renderTableCellComponent({ column, row })}
          </StyledTableCellContainer>
        </TableCell>
      ))}
    </StyledTableRow>
  );
};

export default DesktopMultiColumnsList;

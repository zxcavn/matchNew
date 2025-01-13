import { TableBody, TableCell, TableHead, Typography } from '@mui/material';
import { useId } from 'react';

import { Divider } from '../../../atoms';
import { renderTableComponent, TableText } from '../helpers';
import type { ColumnLabelParams, ColumnType, RowBackgroundVariant, TableProps } from '../types';
import { StyledTable, StyledTableCellContainer, StyledTableRow } from './styles';

export const TEST_ID = 'desktop-table-test-id';

const DesktopTable = <T,>({
  rows,
  columns,
  verticalAlign,
  isDangerStyle,
  className,
}: Omit<TableProps<T>, 'mobileConfig'>) => {
  const key = useId();

  return (
    <StyledTable $verticalAlign={verticalAlign} className={className} data-testid={TEST_ID}>
      <TableHead>
        <StyledTableRow>
          {columns.map(({ label }, index) => (
            <TableHeadingCell key={index} {...label} />
          ))}
        </StyledTableRow>
      </TableHead>
      <Divider className="divider" />
      <TableBody>
        {rows.map((row, index) => (
          <TableBodyRow
            key={key + index}
            row={row}
            backgroundVariant={isDangerStyle?.(row) ? 'danger' : index % 2 ? 'dark' : 'default'}
            columns={columns}
          />
        ))}
      </TableBody>
    </StyledTable>
  );
};

const TableHeadingCell = ({ text, align }: ColumnLabelParams) => {
  return (
    <TableCell align={align}>
      <Typography color="neutrals.secondaryText" variant="body2">
        <TableText text={text} />
      </Typography>
    </TableCell>
  );
};

type TableBodyRowProps<T> = {
  row: T;
  columns: ColumnType<T>[];
  onClick?: () => void;
  backgroundVariant?: RowBackgroundVariant;
};

const TableBodyRow = <T,>({ columns, row, onClick, backgroundVariant }: TableBodyRowProps<T>) => {
  const key = useId();

  return (
    <StyledTableRow tabIndex={-1} $backgroundVariant={backgroundVariant} onClick={onClick}>
      {columns.map((column, index: number) => (
        <TableCell key={key + index}>
          <StyledTableCellContainer $align={column.label.align}>
            {renderTableComponent({ column, row, isDanger: backgroundVariant === 'danger' })}
          </StyledTableCellContainer>
        </TableCell>
      ))}
    </StyledTableRow>
  );
};

export default DesktopTable;

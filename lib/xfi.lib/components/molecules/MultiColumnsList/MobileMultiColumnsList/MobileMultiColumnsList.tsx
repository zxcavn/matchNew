import { Box, Stack } from '@mui/material';
import { useId } from 'react';

import { Divider } from '../../../atoms';
import { renderTableCellComponent } from '../helpers';
import { MultiColumnsListProps } from '../types';
import { StyledDetails } from './styles';

const MobileMultiColumnsList = <T,>({ className, rows, mobileColumns, onRowClick }: MultiColumnsListProps<T>) => {
  const key = useId();

  return (
    <Box className={className}>
      {rows.map((row, index) => (
        <MobileTableRow<T> key={key + index} row={row} columns={mobileColumns} onClick={onRowClick} />
      ))}
    </Box>
  );
};

type TableRowProps<T> = {
  row: T;
  columns: MultiColumnsListProps<T>['columns'];
  onClick?: (row: T) => void;
};

const MobileTableRow = <T,>({ row, columns, onClick }: TableRowProps<T>) => {
  return (
    <StyledDetails $isClickable={Boolean(onClick)} onClick={() => onClick?.(row)}>
      {columns.map((column, index) => (
        <Stack key={index} className="column">
          <Box>
            {renderTableCellComponent({
              column,
              row,
            })}
          </Box>
          <Divider className="divider" />
        </Stack>
      ))}
    </StyledDetails>
  );
};

export default MobileMultiColumnsList;

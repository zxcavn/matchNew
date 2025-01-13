import { Box, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import { useId, useMemo } from 'react';

import { Accordion } from '../../../atoms';
import { getMobileTableColumns, getRowBackgroundColor, renderTableComponent, TableText } from '../helpers';
import type { ColumnType, RowBackgroundVariant, TableProps } from '../types';
import { StyledDetails, StyledDetailsRow } from './styles';

export const TEST_ID = 'mobile-table-test-id';

const MobileTable = <T,>({ rows, columns, mobileConfig, isDangerStyle, className }: TableProps<T>) => {
  const key = useId();

  return (
    <Box className={className} data-testid={TEST_ID}>
      {rows.map((row, index) => (
        <MobileTableRow<T>
          backgroundVariant={isDangerStyle?.(row) ? 'danger' : index % 2 ? 'dark' : 'default'}
          key={key + index}
          row={row}
          columns={columns}
          mobileConfig={mobileConfig}
        />
      ))}
    </Box>
  );
};

type MobileTableRowProps<T> = {
  row: T;
  columns: TableProps<T>['columns'];
  mobileConfig: TableProps<T>['mobileConfig'];
  backgroundVariant: RowBackgroundVariant;
};

const MobileTableRow = <T,>({ row, columns, mobileConfig, backgroundVariant }: MobileTableRowProps<T>) => {
  const { query } = useRouter();
  const renderId = useId();

  const queryParams = Object.values(query).join('');

  const { header, unexpanded, expanded } = useMemo(
    () => getMobileTableColumns({ columns, mobileConfig }),
    [columns, mobileConfig]
  );

  if (!header) {
    throw new Error('Mobile config missing headerId param');
  }

  const renderDetails = <T,>({ columns, row }: { columns: Array<ColumnType<T>>; row: T }) => {
    return (
      <StyledDetails>
        {columns.map((column, index) => {
          const text = column.label.text;

          return (
            <StyledDetailsRow key={index}>
              <Typography color="neutrals.secondaryText" variant="body2">
                <TableText text={text} />
              </Typography>
              {renderTableComponent({
                column,
                row,
                isDanger: backgroundVariant === 'danger',
              })}
            </StyledDetailsRow>
          );
        })}
      </StyledDetails>
    );
  };

  return (
    <Accordion
      key={queryParams + renderId}
      backgroundColor={getRowBackgroundColor(backgroundVariant)}
      headerSlot={mobileConfig.renderTitle(row)}
      detailsSlot={expanded.length ? renderDetails({ columns: expanded, row }) : null}
      unexpandedDetailsSlot={unexpanded.length ? renderDetails({ columns: unexpanded, row }) : null}
    />
  );
};

export default MobileTable;

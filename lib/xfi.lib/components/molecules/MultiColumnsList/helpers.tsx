/**
 * Utility functions and helper components for table-related operations.
 * @module TableHelpers
 */

import { type MultiColumnsListColumnType, MultiColumnsListColumnTypesEnum } from './types';

/**
 * Renders the appropriate table component based on the column type.
 *
 * @template T
 * @param {MultiColumnsListColumnType<T>} param.column - The column configuration.
 * @param {T} param.row - The data row.
 * @returns {JSX.Element} The rendered JSX element.
 * @param row
 */

export const renderTableCellComponent = <T,>({
  column,
  row,
}: {
  column: MultiColumnsListColumnType<T>;
  row: T;
}): JSX.Element => {
  switch (column.type) {
    case MultiColumnsListColumnTypesEnum.jsx: {
      return column.render(row);
    }
  }

  throw new Error('renderTableCellComponent method has unhandled column types');
};

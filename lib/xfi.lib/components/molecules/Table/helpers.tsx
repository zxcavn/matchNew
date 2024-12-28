/**
 * Utility functions and helper components for table-related operations.
 * @module TableHelpers
 */
import { alpha } from '@mui/material';
import { FormattedMessage } from 'react-intl';

import { useIntlHelpers } from '../../../i18n';
import { theme } from '../../../theme';
import { AddressLink, Asset, Badge, BlockLink, DateTime, HashLink, Text } from './components';
import {
  type ColumnType,
  type ExtraParams,
  type MobileTableConfig,
  type RowBackgroundVariant,
  type TableColumns,
  type TableTextType,
  ColumnTypesEnum,
} from './types';

/**
 * Renders the appropriate table component based on the column type.
 *
 * @template T
 * @param {ColumnType<T>} param.column - The column configuration.
 * @param {T} param.row - The data row.
 * @param {boolean} [param.isDanger] - Indicates whether the row is in a dangerous state.
 * @returns {JSX.Element} The rendered JSX element.
 * @param extra
 * @param row
 */
const getTableComponentProps = <T, P>(extra: ExtraParams<T, P>, row: T): P => {
  if (extra instanceof Function) {
    return extra(row);
  }

  return extra;
};

export const renderTableComponent = <T,>({
  column,
  row,
  isDanger,
}: {
  column: ColumnType<T>;
  row: T;
  isDanger?: boolean;
}): JSX.Element => {
  switch (column.type) {
    case ColumnTypesEnum.badge: {
      return <Badge {...getTableComponentProps(column.extra, row)} failed={isDanger} />;
    }

    case ColumnTypesEnum.date: {
      return <DateTime {...getTableComponentProps(column.extra, row)} />;
    }

    case ColumnTypesEnum.hashLink: {
      return <HashLink {...getTableComponentProps(column.extra, row)} />;
    }

    case ColumnTypesEnum.addressLink: {
      return <AddressLink {...getTableComponentProps(column.extra, row)} />;
    }

    case ColumnTypesEnum.blockLink: {
      return <BlockLink {...getTableComponentProps(column.extra, row)} />;
    }

    case ColumnTypesEnum.text: {
      return <Text {...getTableComponentProps(column.extra, row)} />;
    }

    case ColumnTypesEnum.asset: {
      return <Asset {...getTableComponentProps(column.extra, row)} />;
    }

    case ColumnTypesEnum.jsx: {
      return column.render(row);
    }
  }

  throw new Error('renderTableComponent method has unhandled column types');
};

type MobileTableColumns<T> = {
  header: ColumnType<T> | null;
  unexpanded: TableColumns<T>;
  expanded: TableColumns<T>;
};

/**
 * Returns the mobile table columns configuration based on the provided desktop columns and mobile configuration.
 *
 * @template T
 * @param {object} param0 - Object containing desktop columns and mobile configuration.
 * @param {TableColumns<T>} param0.columns - The desktop columns configuration.
 * @param {MobileTableConfig<T>} param0.mobileConfig - The mobile table configuration.
 * @returns {MobileTableColumns<T>} The mobile table columns configuration.
 */
export const getMobileTableColumns = <T,>({
  columns,
  mobileConfig,
}: {
  columns: TableColumns<T>;
  mobileConfig: MobileTableConfig<T>;
}): MobileTableColumns<T> => {
  return columns.reduce<MobileTableColumns<T>>(
    (result, desktopColumn) => {
      if (mobileConfig.excludeColumns?.includes(desktopColumn.id)) {
        return result;
      }

      const column = mobileConfig.columns?.find(({ id }) => desktopColumn.id === id) || desktopColumn;

      if (column.id === mobileConfig.headerId) {
        result.header = column;

        return result;
      }

      if (mobileConfig?.unexpandedIds?.includes(column.id)) {
        result.unexpanded.push(column);

        return result;
      }

      result.expanded.push(column);

      return result;
    },
    {
      header: null,
      expanded: [],
      unexpanded: [],
    }
  );
};

/**
 * Renders text content for the table, handling formatted message IDs.
 *
 * @param {object} props - The props for the TableText component.
 * @param {TableTextType} props.text - The text content to render.
 * @returns {JSX.Element} The rendered JSX element.
 */
export const TableText = ({ text }: { text: TableTextType }) => {
  const { isFormattedMessageId } = useIntlHelpers();

  return isFormattedMessageId(text) ? <FormattedMessage id={text} /> : text;
};

/**
 * Determines the background color for a table row based on the specified variant.
 *
 * @param {RowBackgroundVariant} variant - The variant of the row background.
 * @returns {string} The CSS color value for the row background.
 */
export const getRowBackgroundColor = (variant: RowBackgroundVariant): string => {
  return {
    default: 'initial',
    dark: theme.palette.neutrals.tableLine,
    danger: alpha(theme.palette.error.main, 0.15),
  }[variant];
};

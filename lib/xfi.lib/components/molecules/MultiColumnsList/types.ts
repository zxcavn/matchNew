import type { PaginationProps } from '../../atoms/Pagination';
import { AlignCellParams } from '../../molecules/Table/types';

export enum MultiColumnsListColumnTypesEnum {
  jsx = 'jsx',
}

export type MultiColumnsListColumnType<T> = {
  type: MultiColumnsListColumnTypesEnum.jsx;
  render: (value: T) => JSX.Element;
  align?: AlignCellParams['align'];
};

export type MultiColumnsListProps<T> = {
  rows: T[];
  columns: MultiColumnsListColumns<T>;
  mobileColumns: MultiColumnsListColumns<T>;
  className?: string;
  pagination?: PaginationProps;
  onRowClick?: (row: T) => void;
};

export type MultiColumnsListColumns<T> = MultiColumnsListColumnType<T>[];

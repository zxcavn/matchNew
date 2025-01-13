import type { ReactElement } from 'react';

import type { PaginationProps } from '../../atoms';
import type {
  AddressLinkProps,
  AssetProps,
  BadgeProps,
  BlockLinkProps,
  DateTimeProps,
  HashLinkProps,
  TextProps,
} from './components';

export enum ColumnTypesEnum {
  date = 'date',
  jsx = 'jsx',
  hashLink = 'hashLink',
  addressLink = 'addressLink',
  blockLink = 'blockLink',
  badge = 'badge',
  text = 'text',
  asset = 'asset',
}

/** @type {FormattedMessageId | ReactElement} */
export type TableTextType = string | ReactElement;

export type ExtraParams<T, P> = ((value: T) => P) | P;

export type AlignCellParams = {
  align?: 'left' | 'center' | 'right';
};

export type ColumnId<T> = keyof T | `additional-${number}`;

export type ColumnLabelParams = AlignCellParams & {
  text: TableTextType;
};

export type ColumnType<T> = {
  id: ColumnId<T>;
  label: ColumnLabelParams;
} & (
  | {
      type: ColumnTypesEnum.jsx;
      render: (value: T) => JSX.Element;
    }
  | {
      type: ColumnTypesEnum.hashLink;
      extra: ExtraParams<T, HashLinkProps>;
    }
  | {
      type: ColumnTypesEnum.addressLink;
      extra: ExtraParams<T, AddressLinkProps>;
    }
  | {
      type: ColumnTypesEnum.blockLink;
      extra: ExtraParams<T, BlockLinkProps>;
    }
  | {
      type: ColumnTypesEnum.date;
      extra: ExtraParams<T, DateTimeProps>;
    }
  | {
      type: ColumnTypesEnum.badge;
      extra: ExtraParams<T, BadgeProps>;
    }
  | {
      type: ColumnTypesEnum.text;
      extra: ExtraParams<T, TextProps>;
    }
  | {
      type: ColumnTypesEnum.asset;
      extra: ExtraParams<T, AssetProps>;
    }
);

export type MobileTableConfig<T> = {
  headerId: keyof T | `additional-${number}`;
  unexpandedIds?: Array<ColumnId<T>>;
  excludeColumns?: Array<ColumnId<T>>;
  columns?: TableColumns<T>;
  renderTitle: (row: T) => JSX.Element;
};

export type TableProps<T> = {
  rows: T[];
  columns: TableColumns<T>;
  mobileConfig: MobileTableConfig<T>;
  isDangerStyle?: (row: T) => boolean;
  className?: string;
  pagination?: PaginationProps;
  verticalAlign?: 'top' | 'middle';
};

export type TableItemType = {
  failed?: boolean;
};

export type TableColumns<T> = ColumnType<T>[];

export type RowBackgroundVariant = 'default' | 'dark' | 'danger';

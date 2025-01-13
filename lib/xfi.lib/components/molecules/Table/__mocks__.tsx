import type { Props as DatetimeProps } from './components/DateTime';
import type { Props as HashLinkProps } from './components/HashLink';
import type { Props as TextProps } from './components/Text';
import { type ColumnType, type MobileTableConfig, ColumnTypesEnum } from './types';

export const ASSET_TEST_PROPS = {
  value: '$100',
  text: 'USD',
  className: 'custom-class',
};

export const DATETIME_PROPS: DatetimeProps = {
  date: '2024-02-16T12:34:56Z',
  dateFormat: 'MMMM dd, yyyy',
  timeFormat: 'HH:mm:ss',
};

export const HASH_LINK_PROPS: HashLinkProps = {
  href: 'https://example.com',
  hash: '0x123456789abcdef',
  copyText: 'Copy to Clipboard',
  target: '_self',
};

export const HASH_LINK_TRIMMED_TEXT = '0x123......def';

export const TEXT_PROPS: TextProps = {
  value: 'Hello, World!',
};

export type Rows = { id: number; name: string; position: string };
export const ROWS = [
  { id: 1, name: 'John Doe', position: 'FE' },
  { id: 2, name: 'Jane Smith', position: 'PM' },
];

export const COLUMNS: Array<ColumnType<Rows>> = [
  {
    id: 'id',
    label: { text: 'ID', align: 'left' },
    type: ColumnTypesEnum.text,
    extra: ({ id }) => ({
      value: String(id),
    }),
  },
  {
    id: 'name',
    label: { text: 'Name', align: 'center' },
    type: ColumnTypesEnum.text,
    extra: ({ name }) => ({
      value: name,
    }),
  },
  {
    id: 'position',
    label: { text: 'Position', align: 'right' },
    type: ColumnTypesEnum.text,
    extra: ({ position }) => ({
      value: position,
    }),
  },
  {
    id: 'position',
    type: ColumnTypesEnum.date,
    label: {
      text: 'DATE',
    },
    extra: () => ({ ...DATETIME_PROPS }),
  },
  {
    id: 'position',
    label: { text: 'Asset' },
    type: ColumnTypesEnum.asset,
    extra: () => ({ ...ASSET_TEST_PROPS }),
  },
  {
    id: 'position',
    label: { text: 'Badge' },
    type: ColumnTypesEnum.badge,
    extra: () => ({ badgeVariant: 'validatorStatus', status: 'active' }),
  },
  {
    id: 'position',
    label: { text: 'hashLink' },
    type: ColumnTypesEnum.hashLink,
    extra: () => ({
      ...HASH_LINK_PROPS,
    }),
  },
  {
    id: 'position',
    label: { text: 'JSX' },
    type: ColumnTypesEnum.jsx,
    render: () => <p>{TEXT_PROPS.value}</p>,
  },
];

export const MOBILE_CONFIG: MobileTableConfig<Rows> = {
  headerId: 'id',
  unexpandedIds: ['name', 'position'],
  renderTitle: ({ id }) => <p>{id}</p>,
};

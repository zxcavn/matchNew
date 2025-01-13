import type { ThemeIcon } from '../../types';
import { default as TransactionsDarkIcon } from './transactions.dark.svg';
import { default as TransactionsLightIcon } from './transactions.light.svg';

const TransactionsIcon: ThemeIcon = {
  light: TransactionsLightIcon,
  dark: TransactionsDarkIcon,
} as const;

export default TransactionsIcon;

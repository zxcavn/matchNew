import type { ThemeIcon } from '../../types';
import { default as SelectedTransactionsDarkIcon } from './selectedTransactions.dark.svg';
import { default as SelectedTransactionsLightIcon } from './selectedTransactions.light.svg';

const SelectedTransactionsIcon: ThemeIcon = {
  light: SelectedTransactionsLightIcon,
  dark: SelectedTransactionsDarkIcon,
} as const;

export default SelectedTransactionsIcon;

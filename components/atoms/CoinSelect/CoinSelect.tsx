import { SelectChangeEvent } from '@mui/material';

import { InputText, OptionType, Select } from '@/lib/xfi.lib/components/atoms';
import { CURRENCIES } from '@/lib/xfi.lib/constants';
import { CosmosCurrency } from '@/shared/types';

export const TEST_ID = 'coin-select-test-id';

export type Props = {
  value: CosmosCurrency;
  onChange?: (event: SelectChangeEvent<string | string[]>) => void;
  id?: string;
  name?: string;
  options: CosmosCurrency[];
  className?: string;
  label?: InputText;
};

const CoinSelect = ({ value, onChange, options, label, ...props }: Props) => (
  <Select
    {...props}
    onChange={event => {
      onChange?.(event);
    }}
    value={value}
    options={COIN_SELECT_OPTIONS.filter(({ value }) => options.includes(value))}
    label={label || { type: 'intl', id: 'SUMMARY.COIN' }}
    data-testid={TEST_ID}
  />
);

const COIN_SELECT_OPTIONS: Array<OptionType<CosmosCurrency>> = [
  {
    value: CosmosCurrency.MPX,
    label: { type: 'text', text: CURRENCIES.mpx.text },
  },
  {
    value: CosmosCurrency.XFI,
    label: { type: 'text', text: CURRENCIES.xfi.text },
  },
];

export default CoinSelect;

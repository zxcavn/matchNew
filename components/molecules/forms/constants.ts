import { SelectProps } from '@/lib/xfi.lib/components/atoms';
import { FormBlockInput, FormBlockInputTypesEnum } from '@/lib/xfi.lib/components/molecules/FormBlock/types';
import { CURRENCIES } from '@/lib/xfi.lib/constants';
import { CosmosCurrency } from '@/shared/types';

export const GAS_CURRENCY_INPUT_PROPS: SelectProps = {
  label: { type: 'intl', id: 'SUMMARY.COMMISSION_CURRENCY' },
  value: CosmosCurrency.XFI,
  options: [
    { value: CosmosCurrency.XFI, label: { type: 'text', text: CURRENCIES.xfi.text } },
    { value: CosmosCurrency.MPX, label: { type: 'text', text: CURRENCIES.mpx.text } },
  ],
};

export const GAS_CURRENCY_INPUT: FormBlockInput<{ gasCurrency: string }> = {
  inputName: 'gasCurrency',
  type: FormBlockInputTypesEnum.select,
  inputProps: GAS_CURRENCY_INPUT_PROPS,
};

import { NumberFormatter } from '@xfi/formatters';

import { EthersService } from '@/services/evm';
import type { StorageToken } from '@/store/walletTokens';

import type { SendTokenFormValues } from '@/components/molecules';

export const isValidValues = ({
  currentSendToken,
  formValues,
}: {
  currentSendToken?: StorageToken;
  formValues: SendTokenFormValues;
}): boolean => {
  if (!currentSendToken || !EthersService.isAddress(formValues.walletAddress)) return false;

  const normalizedAmount = NumberFormatter.normalizeUserInput(formValues.amount, currentSendToken.decimals);

  return !!Number(normalizedAmount);
};

export const getAmountForSend = (userInputAmount: string, decimals: number) => {
  return NumberFormatter.parseUnits(userInputAmount, decimals).toString();
};

import { useMemo } from 'react';
import { useIntl } from 'react-intl';

import { useValidationRules, ValidationData } from '@/lib/xfi.lib/hooks';
import { Bip39Service } from '@/services';
import { EthersService } from '@/services/evm';

export const useAppValidationRules = (data: ValidationData = {}) => {
  const validationRules = useValidationRules(data);
  const { formatMessage } = useIntl();

  return useMemo(
    () => ({
      ...validationRules,
      evmAddress: validationRules.required.test(
        'isEvmWalletAddress',
        formatMessage({ id: 'ERRORS.INCORRECT_ADDRESS' }),
        value => EthersService.isAddress(value.trim())
      ),
      evmWalletAddress: validationRules.required.test(
        'isEvmWalletAddress',
        formatMessage({ id: 'ERRORS.INCORRECT_WALLET_ADDRESS' }),
        value => EthersService.isAddress(value.trim())
      ),
      mnemonic: validationRules.required.test(
        'isValidMnemonic',
        formatMessage({ id: 'ERRORS.INCORRECT_WALLET_SEED' }),
        value => Bip39Service.isValid(value.trim())
      ),
    }),
    [validationRules]
  );
};

export default useAppValidationRules;

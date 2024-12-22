import { useDebouncedCallback } from '@xfi/hooks';
import { getAddress, isAddress } from 'ethers';
import { useMemo, useState } from 'react';

import { groupTokensByAddress, isErc20Token } from '@/helpers';
import { useTokenInfo, useWalletTokens } from '@/hooks';
import { EVM_EXTRA_TOKEN } from '@/shared/constants/variables';

import { ImportTokenForm } from '@/components/molecules';

import type { ImportTokenProps } from '../types';

const UserToken = ({ onCancel, onNext, initialContractAddress }: ImportTokenProps) => {
  const [tokenError, setTokenError] = useState('');
  const { isLoading, error, tokenInfo, balance, getTokenInfo } = useTokenInfo();
  const { tokens: walletTokens } = useWalletTokens();

  const debouncedGetTokenInfo = useDebouncedCallback(getTokenInfo);

  const tokens = useMemo(() => groupTokensByAddress(walletTokens), [walletTokens]);

  const onChangeAddress = (address: string) => {
    const normalizedAddress = getAddress(address);

    const isTokenAdded =
      tokens[normalizedAddress] ||
      tokens[normalizedAddress.toLowerCase()] ||
      (isAddress(EVM_EXTRA_TOKEN) && getAddress(EVM_EXTRA_TOKEN) === normalizedAddress);

    if (isTokenAdded) {
      return setTokenError('TOKENS.TOKEN_ALREADY_ADDED');
    }

    setTokenError('');
    debouncedGetTokenInfo(normalizedAddress.toLowerCase());
  };

  const onClickNext = () => {
    onNext({ ...tokenInfo, balance });
  };

  const errorMessage = error || tokenError;
  const isDisabled = isLoading || !!errorMessage || !isErc20Token(tokenInfo);

  return (
    <ImportTokenForm
      tokenInfo={tokenInfo}
      error={errorMessage}
      isDisabledNextButton={isDisabled}
      initialContractAddress={initialContractAddress}
      onChangeContractAddress={onChangeAddress}
      onCancel={onCancel}
      onNext={onClickNext}
    />
  );
};

export default UserToken;

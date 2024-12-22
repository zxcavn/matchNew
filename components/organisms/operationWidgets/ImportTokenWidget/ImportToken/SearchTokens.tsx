import { useDebouncedCallback } from '@xfi/hooks';
import { useMemo, useState } from 'react';

import { excludeExtraToken, isErc20Token } from '@/helpers';
import { useSearchTokens, useTokenInfo, useWalletExtraToken } from '@/hooks';

import { SearchTokensBlock } from '@/components/molecules';

import type { ImportTokenProps } from '../types';

const SearchTokens = ({ onCancel, onNext }: ImportTokenProps) => {
  const [searchValue, setSearchValue] = useState('');
  const { page, hasNext, getNext, filteredTokens, onSearchTokens } = useSearchTokens({ searchValue });
  const { isLoading, error, tokenInfo, balance, getTokenInfo, resetTokenInfo } = useTokenInfo();

  const debouncedOnSearchTokens = useDebouncedCallback(onSearchTokens);

  const onClickNext = () => {
    onNext({ ...tokenInfo, balance });
  };

  const onChange = (value: string) => {
    setSearchValue(value);
    resetTokenInfo();
    debouncedOnSearchTokens(value);
  };

  const onEndReached = () => {
    if (filteredTokens.length && hasNext) {
      getNext(page + 1, searchValue);
    }
  };

  const isDisabled = isLoading || !!error || !isErc20Token(tokenInfo);
  const showNotFound = !filteredTokens.length && Boolean(searchValue);
  const { extraToken } = useWalletExtraToken();

  const availableTokens = useMemo(
    () => excludeExtraToken(filteredTokens, extraToken?.contractAddress),
    [filteredTokens, extraToken?.contractAddress]
  );

  return (
    <SearchTokensBlock
      isDisabledNext={isDisabled}
      showNotFound={showNotFound}
      tokens={availableTokens}
      onEndReached={onEndReached}
      onChange={onChange}
      onCancel={onCancel}
      onNext={onClickNext}
      onSelect={getTokenInfo}
    />
  );
};

export default SearchTokens;

import { Box, Stack, Typography } from '@mui/material';
import clsx from 'clsx';
import isEqual from 'lodash/isEqual';
import { useCallback, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { Virtuoso } from 'react-virtuoso';

import { TokenResponse } from '@/crud/xfiScan/types/tokens';
import { Icon, Input } from '@/lib/xfi.lib/components/atoms';
import { SearchIcon } from '@/lib/xfi.lib/icons';

import { TokenAvatar } from '@/components/atoms';

import FormButtons from '../forms/FormButtons';
import { StyledSearchTokensContainer, StyledTokenItem, StyledTokensContainer } from './styles';

type Props = {
  onCancel: () => void;
  onNext: () => void;
  onSelect: (address: string) => void;
  onChange: (value: string) => void;
  onEndReached: () => void;
  showNotFound?: boolean;
  tokens: TokenResponse[];
  isDisabledNext?: boolean;
};

const SearchTokensBlock = ({
  onCancel,
  onNext,
  onSelect,
  onChange,
  onEndReached,
  showNotFound,
  tokens,
  isDisabledNext,
}: Props) => {
  const [selectedToken, setSelectedToken] = useState<TokenResponse | null>(null);

  const onSelectToken = useCallback((token: TokenResponse) => {
    setSelectedToken(token);
    onSelect(token.contractAddress);
  }, []);

  return (
    <StyledSearchTokensContainer>
      <Input
        prefix={<Icon src={SearchIcon} />}
        placeholder={{ type: 'intl', id: 'TOKENS.SEARCH_TOKEN' }}
        onChange={e => {
          onChange(e.target.value);
          setSelectedToken(null);
        }}
      />
      <Stack className={'tokensContainer'} gap={'1rem'} height={'13.615rem'} m={'1.09rem 0'}>
        {showNotFound && (
          <Typography
            alignSelf={'center'}
            sx={{ marginTop: '25%', transform: 'translate(0, -50%)' }}
            variant="body1"
            color="neutrals.secondaryText"
          >
            <FormattedMessage id="TOKENS.NO_RESULT_FOUND" />
          </Typography>
        )}
        <Virtuoso
          className={'virtuosoContainer'}
          style={{ height: '100%' }}
          components={{
            List: StyledTokensContainer,
            Item: Box,
          }}
          data={tokens}
          totalCount={tokens.length}
          firstItemIndex={0}
          initialTopMostItemIndex={0}
          endReached={onEndReached}
          itemContent={(_, token) => (
            <StyledTokenItem
              key={token.contractAddress}
              className={clsx(isEqual(token, selectedToken) && 'selected')}
              onClick={() => onSelectToken(token)}
            >
              <TokenAvatar symbol={String(token.tokenSymbol)} contractAddress={token.contractAddress} />
              <Typography variant="body1">
                {token.name}
                {` (${token.tokenSymbol})`}
              </Typography>
            </StyledTokenItem>
          )}
        />
      </Stack>
      <FormButtons
        onCancel={onCancel}
        onSubmit={onNext}
        submitButtonText="SUMMARY.NEXT"
        isDisabled={!selectedToken || isDisabledNext}
        sx={{ flexDirection: 'row-reverse' }}
      />
    </StyledSearchTokensContainer>
  );
};

export default SearchTokensBlock;

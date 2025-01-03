import { Stack, Typography } from '@mui/material';
import { NumberFormatter } from '@xfi/formatters';
import { useEffectOnce } from '@xfi/hooks';
import { useMemo } from 'react';
import { FormattedMessage } from 'react-intl';
import urlJoin from 'url-join';

import { excludeExtraToken } from '@/helpers';
import { useWalletExtraToken, useWalletTokens } from '@/hooks';
import { ColumnTypesEnum } from '@/lib/xfi.lib/components/molecules/Table';
import { DesktopTable } from '@/lib/xfi.lib/components/molecules/Table/DesktopTable';
import { useMediaQuery } from '@/lib/xfi.lib/theme';
import { XFI_SCAN_URL } from '@/shared/constants';
import { StorageToken } from '@/store/walletTokens';

import { Token } from '@/components/atoms';

import { StyledTableBlock } from './styles';

const WalletTokens = () => {
  const isMobile = useMediaQuery(theme => theme.breakpoints.down('md'));
  const { tokens: allTokens, updateTokens } = useWalletTokens();
  const { extraToken } = useWalletExtraToken();
  const tokens = useMemo(
    () => excludeExtraToken(allTokens, extraToken?.contractAddress),
    [allTokens, extraToken?.contractAddress]
  );

  useEffectOnce(() => {
    updateTokens();
  });

  return (
    <StyledTableBlock
      hasData={Boolean(tokens.length)}
      title={
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Typography color="background.light" variant="h4">
            <FormattedMessage id="SUMMARY.TOKENS" />
          </Typography>
        </Stack>
      }
      notFound={{
        text: 'TOKENS.YOU_DO_NOT_HAVE_TOKENS',
      }}
    >
      {isMobile ? (
        <TokenList tokens={tokens} onSuccess={updateTokens} />
      ) : (
        <DesktopTable<StorageToken>
          className="tokensTable"
          verticalAlign="middle"
          rows={tokens}
          columns={[
            {
              id: 'name',
              type: ColumnTypesEnum.jsx,
              label: { text: 'SUMMARY.TOKEN' },
              render: ({ name, symbol, contractAddress }) => (
                <Token
                  explorerUrl={getTokenExplorerUrl(contractAddress)}
                  symbol={symbol}
                  name={name}
                  contractAddress={contractAddress}
                />
              ),
            },
            {
              id: 'balance',
              type: ColumnTypesEnum.jsx,
              label: { text: 'SUMMARY.SHORT_BALANCE' },
              render: ({ balance, symbol, decimals }) => (
                <Typography color="background.light" variant="body1">
                  {NumberFormatter.formatUnitsToDisplay(balance, { decimals })}
                  &nbsp;{symbol}
                </Typography>
              ),
            },
          ]}
        />
      )}
    </StyledTableBlock>
  );
};

type TokenListProps = {
  tokens: StorageToken[];
  onSuccess: () => void;
};

const TokenList = ({ tokens, onSuccess }: TokenListProps) => {
  return (
    <Stack pb="1.5rem">
      {tokens.map(({ name, contractAddress, symbol, balance, decimals }, index) => (
        <Stack
          key={contractAddress}
          bgcolor={theme => (index % 2 ? theme.palette.neutrals.tableLine : 'initial')}
          p="1.5rem 1rem"
          gap="0.5rem"
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Stack gap="0.438rem">
            <Token
              explorerUrl={getTokenExplorerUrl(contractAddress)}
              name={name}
              symbol={symbol}
              contractAddress={contractAddress}
            />
            <Typography color="background.light" variant="body1">
              <Typography sx={{ wordBreak: 'break-all' }} component="span">
                {NumberFormatter.formatUnitsToDisplay(balance, { decimals })}
              </Typography>{' '}
              {symbol}
            </Typography>
          </Stack>
          <Stack direction="row" alignItems="center" gap="2rem">
          </Stack>
        </Stack>
      ))}
    </Stack>
  );
};

const getTokenExplorerUrl = (address: string) => urlJoin(XFI_SCAN_URL, 'token', address);

export default WalletTokens;

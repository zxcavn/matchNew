import { SelectChangeEvent, Stack, Typography } from '@mui/material';
import { usePageParam, useQueryParam } from '@xfi/hooks';
import { useRouter } from 'next/router';
import { ReactNode, useCallback, useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';

import { TokenType } from '@/crud';
import { useAppDispatch, useAppSelector, useWallet } from '@/hooks';
import { Select, SelectProps } from '@/lib/xfi.lib/components/atoms';
import { Table, TableBlock } from '@/lib/xfi.lib/components/molecules';
import { ALL_VALUE } from '@/shared/constants';
import { getTokenTransfersAsync, TokenTransfer, tokenTransfersSelector } from '@/store/txs';

import { MOBILE_CONFIG, TABLE_COLUMNS, TOKEN_TYPE_OPTIONS } from './constants';

type FilterValue = TokenType | typeof ALL_VALUE;

const WalletTokenTransfers = () => {
  const dispatch = useAppDispatch();
  const { query, replace } = useRouter();

  const page = usePageParam();
  const initialTokenType = useQueryParam('tokenType') || ALL_VALUE;

  const {
    newWallet: { evmAddress: address },
  } = useWallet();

  const { data: tokenTransfers, hasNext, isLoading } = useAppSelector(tokenTransfersSelector);

  const [selectedTokenType, setSelectedTokenType] = useState<FilterValue>(initialTokenType as FilterValue);

  const getTokenTransfers = useCallback(() => {
    const tokenType = selectedTokenType === ALL_VALUE ? undefined : selectedTokenType;

    return dispatch(getTokenTransfersAsync({ address, page, tokenType }));
  }, [dispatch, selectedTokenType, page, address]);

  useEffect(() => {
    const { abort } = getTokenTransfers();

    return () => {
      abort();
    };
  }, [dispatch, address, selectedTokenType, page]);

  useEffect(() => {
    replace({
      query: { ...query, tokenType: selectedTokenType, page: 1 },
    });
  }, [selectedTokenType]);

  const onChangePage = (newPage: number) => {
    replace({
      query: { ...query, page: newPage },
    });
  };

  const onTokenTypeChange: SelectProps['onChange'] = e => {
    if (Array.isArray(e.target.value)) {
      return;
    }

    const value = e.target.value as FilterValue;

    setSelectedTokenType(value);
  };

  return (
    <TableBlock
      title={<BlockTitle selectedTokenType={selectedTokenType} onTokenTypeChange={onTokenTypeChange} />}
      notFound={{ text: 'TRANSFERS.NO_TRANSFERS' }}
      isLoading={isLoading}
      hasData={Boolean(tokenTransfers.length)}
    >
      <Table<TokenTransfer>
        mobileConfig={MOBILE_CONFIG}
        columns={TABLE_COLUMNS}
        rows={tokenTransfers}
        pagination={{
          variant: 'short',
          page,
          hasNext,
          onChange: onChangePage,
        }}
      />
    </TableBlock>
  );
};

export default WalletTokenTransfers;

const BlockTitle = ({
  selectedTokenType = ALL_VALUE,
  onTokenTypeChange,
}: {
  selectedTokenType?: string;
  onTokenTypeChange: (event: SelectChangeEvent<string | string[]>, child: ReactNode) => void;
}) => {
  return (
    <Stack direction={'row'} width={'100%'} gap={'1rem'} justifyContent={'space-between'} alignItems={'center'}>
      <div>
        <Typography variant={'h4'} color={'background.light'} alignSelf={'start'}>
          <FormattedMessage id={'SUMMARY.TRANSFERS'} />
        </Typography>
      </div>
      <Select
        options={TOKEN_TYPE_OPTIONS}
        value={selectedTokenType}
        onChange={onTokenTypeChange}
        variant={'transparent'}
        renderValue={renderValue}
      />
    </Stack>
  );
};

const renderValue = (selected: unknown) => {
  const selectedValue = selected as string;

  return (
    <>
      <FormattedMessage id="SUMMARY.TYPE" />: <FormattedMessage id={selectedValue} />
    </>
  );
};

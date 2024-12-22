import { useCallback, useEffect, useMemo } from 'react';
import { useIntl } from 'react-intl';

import { useAppDispatch, useAppSelector } from '@/hooks';
import { Table, TableBlock } from '@/lib/xfi.lib/components/molecules';
import { type FormattedTx, splitAndFormatTx } from '@/lib/xfi.lib/helpers';
import { getTransactionsAsync, transactionsSelector } from '@/store/txs';

import { MOBILE_CONFIG, TABLE_COLUMNS } from './constants';

type Props = {
  isEvm: boolean;
  wallet: string;
};

const WalletTransactions = ({ wallet, isEvm }: Props) => {
  const { locale } = useIntl();
  const dispatch = useAppDispatch();
  const { data: txs, isLoading, page, hasNext } = useAppSelector(transactionsSelector(isEvm));
  const formattedTxs = useMemo(() => txs.map(splitAndFormatTx).flat() || [], [txs]);

  const onChange = useCallback(
    (page: number) => dispatch(getTransactionsAsync({ existsEVM: isEvm, address: wallet, page })),
    [dispatch, isEvm, wallet]
  );

  useEffect(() => {
    const { abort } = dispatch(getTransactionsAsync({ existsEVM: isEvm, address: wallet, page: 1 }));

    return () => {
      abort();
    };
  }, [dispatch, isEvm, wallet]);

  return (
    <TableBlock
      title="SUMMARY.TRANSACTIONS"
      notFound={{ text: 'TRANSACTIONS.NO_TRANSACTIONS' }}
      isLoading={isLoading}
      hasData={Boolean(formattedTxs.length)}
    >
      <Table<FormattedTx>
        rows={formattedTxs}
        columns={TABLE_COLUMNS(locale)}
        mobileConfig={MOBILE_CONFIG}
        isDangerStyle={({ failed }) => failed}
        pagination={{ variant: 'short', page, hasNext, onChange }}
      />
    </TableBlock>
  );
};

export default WalletTransactions;

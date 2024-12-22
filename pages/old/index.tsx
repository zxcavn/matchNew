import { Stack } from '@mui/material';
import { useEffect } from 'react';
import { compose } from 'redux';

import { withAuth, withOldBalance } from '@/hocs';
import { useAppDispatch, useWallet } from '@/hooks';
import { getAddressInfoAsync } from '@/store/address';
import { getValidatorsAsync } from '@/store/validators';

import { BalanceTabs } from '@/components/molecules';
import { OldBalance, TransferOldBalance, ValidatorsOrTransactionsBlock } from '@/components/organisms';
import { Layout, Page } from '@/components/templates';

const TITLE = 'SUMMARY.WALLET';

const OldBalancePage = () => {
  const dispatch = useAppDispatch();
  const { oldWallet } = useWallet();

  useEffect(() => {
    const { abort: abortFetchAddressInfo } = dispatch(getAddressInfoAsync({ address: oldWallet.address }));
    const { abort: abortFetchValidators } = dispatch(getValidatorsAsync());

    return () => {
      abortFetchAddressInfo();
      abortFetchValidators();
    };
  }, [dispatch, oldWallet.address]);

  return (
    <Page title={TITLE}>
      <Layout title={TITLE}>
        <Stack gap={{ xs: '1.5rem', lg: '2rem' }}>
          <BalanceTabs />
          <OldBalance actionSlot={<TransferOldBalance />} />
          <ValidatorsOrTransactionsBlock />
        </Stack>
      </Layout>
    </Page>
  );
};

export default compose(withAuth, withOldBalance)(OldBalancePage);

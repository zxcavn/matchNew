import { Stack } from '@mui/material';
import { useQueryParam } from '@xfi/hooks';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { withAuth } from '@/hocs';
import { useWallet } from '@/hooks';
import { Tabs } from '@/lib/xfi.lib/components/atoms';
import { useMediaQuery } from '@/lib/xfi.lib/theme';

import {
  EvmBalance,
  NftInventoryList,
  WalletTokens,
  WalletTokenTransfers,
} from '@/components/organisms';
import { Layout, Page } from '@/components/templates';

const EvmWalletPage = () => {
  const {
    newWallet: { address },
  } = useWallet();
  const [tab, setTab] = useState<string>(TABS.transactions.value);

  return (
    <Page title={'SUMMARY.EVM_WALLET'}>
      <Layout title={'SUMMARY.EVM_WALLET'}>
        <Stack gap={{ xs: '1rem', md: '1.5rem' }}>
          <Stack gap={{ xs: '1.5rem', md: '2rem' }}>
            <EvmBalance />
            <ViewTabs tab={tab} setTab={setTab} />
            {tab === TABS.tokens.value && <WalletTokens />}
            {tab === TABS.nfts.value && <NftInventoryList />}
            {tab === TABS.tokenTransfers.value && <WalletTokenTransfers />}
          </Stack>
        </Stack>
      </Layout>
    </Page>
  );
};

export default withAuth(EvmWalletPage);

const ViewTabs = ({ tab, setTab }: { tab: string; setTab: (tab: string) => void }) => {
  const currentTab = useQueryParam('tab');

  const { query, replace } = useRouter();
  const isMobile = useMediaQuery(theme => theme.breakpoints.down('md'));

  useEffect(() => {
    if (currentTab) {
      setTab(currentTab);
    }
  }, [currentTab]);

  const onChangeTab = (newTab: string) => {
    replace(
      {
        query: { ...query, tab: newTab },
      },
      undefined,
      { scroll: false }
    );
  };

  return (
    <Tabs
      tabs={Object.values(TABS)}
      value={tab}
      setTab={onChangeTab}
      variant="scrollable"
      scrollButtons={'auto'}
      size={isMobile ? 'small' : 'large'}
    />
  );
};

const TABS = {
  transactions: { value: 'transactions', label: 'SUMMARY.TRANSACTIONS' },
  tokens: { value: 'tokens', label: 'SUMMARY.TOKENS' },
  nfts: { value: 'nfts', label: 'SUMMARY.NFTS' },
  tokenTransfers: { value: 'token-transfers', label: 'SUMMARY.TRANSFERS' },
};

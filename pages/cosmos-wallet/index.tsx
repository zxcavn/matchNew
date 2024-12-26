import { Box, Stack } from '@mui/material';
import { useEffect } from 'react';

import { withAuth } from '@/hocs';
import { useAppDispatch, useAppSelector, useShowOldBalance, useWallet } from '@/hooks';
import { useMediaQuery } from '@/lib/xfi.lib/theme';
import { IS_STAGING } from '@/shared/constants/variables';
import { getChainRewardsAsync, hasWalletChainRewardsSelector } from '@/store/chainRewards';

import { BalanceTabs } from '@/components/molecules';
import {
  ChainRewardsWidget,
  CosmosBalancesWidget,
  FaucetWidget,
  Multisend,
} from '@/components/organisms';
import { Layout, Page } from '@/components/templates';

const CosmosWalletPage = () => {
  const {
    newWallet: { address },
  } = useWallet();
  const dispatch = useAppDispatch();
  const showBalanceTabs = useShowOldBalance();
  const isMobile = useMediaQuery(theme => theme.breakpoints.down('md'));
  const hasRewards = useAppSelector(hasWalletChainRewardsSelector);

  useEffect(() => {
    if (!IS_STAGING) {
      dispatch(getChainRewardsAsync());
    }
  }, []);

  const renderAdditionalBlock = () => {
    if (IS_STAGING) return <FaucetWidget />;

    if (hasRewards) return <ChainRewardsWidget />;
  };

  const additionalBlock = renderAdditionalBlock();

  return (
    <Page title={'SUMMARY.COSMOS_WALLET'}>
      <Layout title={'SUMMARY.COSMOS_WALLET'}>
        <Stack gap={{ xs: '1rem', md: '1.5rem' }}>
          {showBalanceTabs && <BalanceTabs />}
          <Stack gap={{ xs: '1.5rem', md: '2rem' }}>
            <Box
              {...(!additionalBlock
                ? { display: 'flex' }
                : {
                    display: 'grid',
                    gap: '1.5rem',
                    gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
                    gridAutoRows: { xs: 'min-content', md: '1fr' },
                  })}
            >
              <CosmosBalancesWidget hasShapeImage={!isMobile && !additionalBlock} />
              {additionalBlock}
            </Box>
            <Multisend />
          </Stack>
        </Stack>
      </Layout>
    </Page>
  );
};

export default withAuth(CosmosWalletPage);

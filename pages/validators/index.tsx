import { Stack } from '@mui/material';
import { useEffect } from 'react';

import { withAuth } from '@/hocs';
import { useAppDispatch } from '@/hooks';
import { WalletType } from '@/shared/types';
import { getValidatorsAsync } from '@/store/validators';

import { DelegateWidget, MpxBalance, ValidatorsList } from '@/components/organisms';
import { Layout, Page } from '@/components/templates';

const TITLE = 'SUMMARY.STAKING';

const Validators = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getValidatorsAsync());
  }, []);

  return (
    <Page title={TITLE}>
      <Layout title={TITLE}>
        <Stack gap={{ xs: '1.5rem', md: '2rem' }}>
          <MpxBalance actionSlot={<DelegateWidget />} />
          <ValidatorsList walletType={WalletType.NEW} />
        </Stack>
      </Layout>
    </Page>
  );
};

export default withAuth(Validators);

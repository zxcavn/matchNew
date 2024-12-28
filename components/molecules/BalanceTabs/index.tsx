import { redirect } from '@xfi/helpers';
import { useEffect, useState } from 'react';

import { useAppDispatch, useAppSelector } from '@/hooks';
import { Tabs } from '@/lib/xfi.lib/components/atoms';
import { useMediaQuery } from '@/lib/xfi.lib/theme';
import { PAGES } from '@/shared/constants';
import { WalletType } from '@/shared/types';
import { walletTypeSelector } from '@/store/wallet';
import { setWalletType } from '@/store/wallet/slice';

type WalletTabType = {
  value: WalletType;
  /** @type {FormattedMessageId} */
  label: string;
};

export const WALLET_TABS: Array<WalletTabType> = [
  { value: WalletType.NEW, label: 'SUMMARY.NEW_ADDRESS' },
  { value: WalletType.OLD, label: 'SUMMARY.OLD_ADDRESS' },
];

const BalanceTabs = () => {
  const walletType = useAppSelector(walletTypeSelector);
  const [tab, setTab] = useState<WalletType>(walletType || WalletType.NEW);
  const dispatch = useAppDispatch();
  const isMobile = useMediaQuery(theme => theme.breakpoints.down('md'));

  useEffect(() => {
    setTab(walletType);
  }, [walletType]);

  const onChangeTab = (tab: WalletType) => {
    dispatch(setWalletType(tab));
    redirect(tab === WalletType.NEW ? PAGES.cosmosWallet : PAGES.oldBalance);
  };

  return (
    <Tabs sx={{ zIndex: 1 }} tabs={WALLET_TABS} value={tab} setTab={onChangeTab} size={isMobile ? 'small' : 'large'} />
  );
};

export default BalanceTabs;

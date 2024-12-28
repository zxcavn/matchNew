import { useMemo } from 'react';

import { getProfileWalletAddresses } from '@/helpers';
import { useWalletConnection } from '@/hocs';
import { profileSelector } from '@/store/profile/selectors';
import { evmWalletAddressSelector } from '@/store/wallet';

import useAppSelector from './useAppSelector';

const useIsAuthenticated = () => {
  const { isConnected } = useWalletConnection();
  const { data: profile } = useAppSelector(profileSelector);
  const address = useAppSelector(evmWalletAddressSelector);

  return useMemo(() => {
    const { evm: evmAddress } = getProfileWalletAddresses(profile);

    return isConnected && profile && evmAddress.toLowerCase() === address.toLowerCase();
  }, [profile, address, isConnected]);
};

export default useIsAuthenticated;

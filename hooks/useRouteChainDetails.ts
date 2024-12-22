import { useRouter } from 'next/router';
import { useMemo } from 'react';

import { PAGES } from '@/shared/constants';

import useWallet from './useWallet';

export enum AddressType {
  COSMOS = 'cosmos',
  EVM = 'evm',
  OLD = 'old',
}

const useRouteChainDetails = () => {
  const { pathname } = useRouter();
  const { oldWallet, newWallet } = useWallet();

  return useMemo(() => {
    if (pathname.includes(PAGES.proposals.pathname))
      return {
        chainType: AddressType.COSMOS,
        address: newWallet.address,
      };

    switch (pathname) {
      case PAGES.cosmosWallet.pathname:

      case PAGES.validators.pathname:
        return {
          chainType: AddressType.COSMOS,
          address: newWallet.address,
        };

      case PAGES.oldBalance.pathname:
        return {
          chainType: AddressType.OLD,
          address: oldWallet.address,
        };

      default:
        return {
          chainType: AddressType.EVM,
          address: newWallet.evmAddress,
        };
    }
  }, [oldWallet.address, newWallet.address, newWallet.evmAddress, pathname]);
};

export default useRouteChainDetails;

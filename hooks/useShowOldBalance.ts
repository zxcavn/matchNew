import { ConnectionType, useWalletConnection } from '@/hocs';

import useDelegations from './useDelegations';
import useWallet from './useWallet';

const useShowOldBalance = () => {
  const { connectionType } = useWalletConnection();
  const { oldWallet, hasOldBalance } = useWallet();
  const { unbondingDelegations, delegationList } = useDelegations(oldWallet.address);

  if (connectionType === ConnectionType.EXTENSION) return false;

  return hasOldBalance || Boolean(unbondingDelegations.length) || Boolean(delegationList.length);
};

export default useShowOldBalance;

import { ConnectionType, useWalletConnection } from '@/hocs';

import useWallet from './useWallet';

const useShowOldBalance = () => {
  const { connectionType } = useWalletConnection();
  const { oldWallet, hasOldBalance } = useWallet();


  if (connectionType === ConnectionType.EXTENSION) return false;


};

export default useShowOldBalance;

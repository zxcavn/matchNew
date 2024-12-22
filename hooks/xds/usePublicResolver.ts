import { useRef } from 'react';

import { useEvmRpcProvider } from '@/hocs/EvmRpcProvider';
import { EthersService } from '@/services/evm';
import { ResolverService } from '@/services/xds';
import { XDS_PUBLIC_RESOLVER_ADDRESS } from '@/shared/constants/variables';

const usePublicResolver = (): ResolverService => {
  const provider = useEvmRpcProvider();
  const publicResolverRef = useRef(
    new ResolverService({
      provider,
      signer: EthersService.getInstance().signer,
      address: XDS_PUBLIC_RESOLVER_ADDRESS,
    })
  );

  return publicResolverRef.current;
};

export default usePublicResolver;

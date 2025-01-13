import { useRef } from 'react';

import { useEvmRpcProvider } from '@/hocs/EvmRpcProvider';
import { EthersService } from '@/services/evm';
import { EthRegistrarControllerService } from '@/services/xds';
import { XDS_ETH_REGISTRAR_CONTROLLER_ADDRESS } from '@/shared/constants/variables';

import usePublicResolver from './usePublicResolver';

const useEthRegistrarController = (): EthRegistrarControllerService => {
  const provider = useEvmRpcProvider();
  const publicResolver = usePublicResolver();
  const ethRegistrarControllerRef = useRef(
    new EthRegistrarControllerService({
      provider,
      signer: EthersService.getInstance().signer,
      resolver: publicResolver,
      address: XDS_ETH_REGISTRAR_CONTROLLER_ADDRESS,
    })
  );

  return ethRegistrarControllerRef.current;
};

export default useEthRegistrarController;

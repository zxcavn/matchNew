import { useRef } from 'react';

import { useEvmRpcProvider } from '@/hocs/EvmRpcProvider';
import { EthersService } from '@/services/evm';
import { ReverseRegistrarService } from '@/services/xds/ReverseRegistrarService';
import { XDS_REVERSE_REGISTRAR_ADDRESS } from '@/shared/constants/variables';

const useReverseRegistrar = (): ReverseRegistrarService => {
  const provider = useEvmRpcProvider();
  const reverseRegistrarRef = useRef(
    new ReverseRegistrarService({
      provider,
      signer: EthersService.getInstance().signer,
      address: XDS_REVERSE_REGISTRAR_ADDRESS,
    })
  );

  return reverseRegistrarRef.current;
};

export default useReverseRegistrar;

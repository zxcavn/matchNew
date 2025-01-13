import { useRef } from 'react';

import { useEvmRpcProvider } from '@/hocs/EvmRpcProvider';
import { EthersService } from '@/services/evm';
import { NameWrapperService } from '@/services/xds/NameWrapperService';
import { XDS_BASE_REGISTRAR_CONTROLLER_ADDRESS, XDS_NAME_WRAPPER_ADDRESS } from '@/shared/constants/variables';

const useNameWrapper = (): NameWrapperService => {
  const provider = useEvmRpcProvider();
  const nameWrapperServiceRef = useRef(
    new NameWrapperService({
      provider,
      signer: EthersService.getInstance().signer,
      address: XDS_NAME_WRAPPER_ADDRESS,
      baseRegistrarAddress: XDS_BASE_REGISTRAR_CONTROLLER_ADDRESS,
    })
  );

  return nameWrapperServiceRef.current;
};

export default useNameWrapper;

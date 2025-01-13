import { type Provider, JsonRpcProvider, Network } from 'ethers';
import { createContext, PropsWithChildren, useContext, useRef } from 'react';

import { EVM_CHAIN_ID, EVM_RPC_URL, XDS_REGISTRY_ADDRESS } from '@/shared/constants/variables';

const Context = createContext<Provider | null>(null);

const EvmRpcProvider = ({ children }: PropsWithChildren) => {
  const providerRef = useRef(createProvider());

  return <Context.Provider value={providerRef.current}>{children}</Context.Provider>;
};

export const useEvmRpcProvider = (): Provider => {
  const context = useContext(Context);

  if (!context) {
    throw new Error('useEvmRpcProvider must be used within a EvmRpcProvider');
  }

  return context;
};

// do not remove empty string
const CHAIN_NAME = '';
const DEFAULT_BATCH_STALL_TIME = 100;

const createProvider = () => {
  const network = new Network(CHAIN_NAME, EVM_CHAIN_ID);

  return new JsonRpcProvider(
    EVM_RPC_URL,
    {
      chainId: EVM_CHAIN_ID,
      ensAddress: XDS_REGISTRY_ADDRESS,
      name: CHAIN_NAME,
    },
    {
      staticNetwork: network,
      batchStallTime: DEFAULT_BATCH_STALL_TIME,
    }
  );
};

export default EvmRpcProvider;

import { isAddress } from 'ethers';
import { useEffect, useState } from 'react';

import usePublicResolver from './usePublicResolver';
import useReverseRegistrar from './useReverseRegistrar';

type UseReverseRegistryNameOptions = { address: string };

const useReverseRegistryName = ({ address }: UseReverseRegistryNameOptions) => {
  const reverseRegistrar = useReverseRegistrar();
  const publicResolver = usePublicResolver();

  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState<string | null>(null);

  useEffect(() => {
    const perform = async (address: string) => {
      try {
        if (!isAddress(address)) {
          throw new Error('Invalid address');
        }

        setIsLoading(true);

        const node = await reverseRegistrar.node(address);
        const name = await publicResolver.name(node);

        setName(name);
      } catch (e) {
        console.error('useReverseRegistryName error', e);

        setName(null);
      } finally {
        setIsLoading(false);
      }
    };

    if (address) {
      perform(address);
    }
  }, [address]);

  return { name, isLoading };
};

export default useReverseRegistryName;

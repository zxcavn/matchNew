import { useCallback, useState } from 'react';

import { getImageFromApi, getImageFromIpfs } from '@/helpers';
import { EthersService } from '@/services/evm';
import { Erc721 } from '@/services/evm/types';

const initialTokenValue: Erc721.TokenInfo = {
  name: '',
  symbol: '',
  contractAddress: '',
};

const useNftInfo = () => {
  const [tokenInfo, setTokenInfo] = useState<{
    isLoading: boolean;
    error: string;
    data: Erc721.TokenInfo;
  }>({
    isLoading: false,
    error: '',
    data: initialTokenValue,
  });

  const [tokenAvailabilityStatus, setTokenAvailabilityStatus] = useState<{
    isLoading: boolean;
    error: string;
    data: { isTokenOwner?: boolean };
  }>({
    isLoading: false,
    error: '',
    data: { isTokenOwner: undefined },
  });

  const [nftUriStatus, setNftUriStatus] = useState<{
    isLoading: boolean;
    error: string;
    data?: string;
  }>({
    isLoading: false,
    error: '',
    data: '',
  });

  const getTokenInfo = useCallback(async (contractAddress: string) => {
    setTokenInfo(values => ({
      ...values,
      isLoading: true,
      data: initialTokenValue,
    }));

    try {
      const ethersService = EthersService.getInstance();
      const tokenInfo = await ethersService.getErc721TokenInfo({ contractAddress });

      tokenInfo &&
        setTokenInfo({
          data: tokenInfo,
          isLoading: false,
          error: '',
        });
    } catch {
      setTokenInfo({
        data: initialTokenValue,
        isLoading: false,
        error: 'ERRORS.CHECK_CONTRACT_ADDRESS',
      });
    }
  }, []);

  const checkTokenAvailability = useCallback(async (contractAddress: string, tokenId: string, ownerAddress: string) => {
    setTokenAvailabilityStatus(prevState => {
      return { ...prevState, isLoading: true, error: '' };
    });

    try {
      const ethersService = EthersService.getInstance();
      const isTokenOwner = await ethersService.isOwnerOfErc721Token({ contractAddress, tokenId, ownerAddress });

      setTokenAvailabilityStatus({
        isLoading: false,
        error: '',
        data: { isTokenOwner },
      });
    } catch (e) {
      console.error(e);
      setTokenAvailabilityStatus(prevState => {
        return {
          ...prevState,
          isLoading: false,
          error: 'ERRORS.FAILED_TO_FETCH_NFT_DATA',
        };
      });
    }
  }, []);

  const getTokenURI = useCallback(async (contractAddress: string, tokenId: string) => {
    setNftUriStatus({
      isLoading: true,
      error: '',
      data: '',
    });

    try {
      let imageUri = await getImageFromApi(contractAddress, tokenId);

      if (!imageUri) {
        const ethersService = EthersService.getInstance();

        const tokenURI = await ethersService.getTokenURI(contractAddress, tokenId);

        imageUri = tokenURI ? await getImageFromIpfs(tokenURI) : undefined;
      }

      setNftUriStatus({
        isLoading: false,
        error: '',
        data: imageUri,
      });
    } catch (e) {
      console.error(e);
      setNftUriStatus({
        isLoading: false,
        error: 'ERRORS.FAILED_TO_FETCH_NFT_DATA',
        data: '',
      });
    }
  }, []);

  return {
    nftUriStatus,
    getTokenURI,
    tokenAvailabilityStatus,
    checkTokenAvailability,
    getTokenInfo,
    tokenInfo,
  };
};

export default useNftInfo;

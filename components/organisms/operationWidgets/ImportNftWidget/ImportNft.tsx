import { useDebouncedCallback } from '@xfi/hooks';
import { getAddress } from 'ethers';
import { useEffect, useState } from 'react';

import { useAppDispatch, useNftInfo, useWallet } from '@/hooks';
import { NftStorageService } from '@/services';
import { getLocalStorageTokenInventory } from '@/store/tokenInventory/slice';

import { ImportNftForm } from '@/components/molecules';

type Props = {
  onNext: (errorText?: string) => void;
  onCancel: () => void;
};

const ImportNft = ({ onCancel, onNext }: Props) => {
  const dispatch = useAppDispatch();
  const {
    newWallet: { evmAddress: ownerAddress },
  } = useWallet();

  const [formValues, setFormValues] = useState<{ address: string; tokenId: string }>({ address: '', tokenId: '' });
  const [isTokenAlreadyExists, setIsTokenAlreadyExists] = useState(false);
  const [isRequestSent, setIsRequestSent] = useState(false);

  const { checkTokenAvailability, getTokenInfo, tokenInfo, tokenAvailabilityStatus, getTokenURI, nftUriStatus } =
    useNftInfo();

  const { isLoading: isTokenInfoLoading, data: tokenInfoData, error: isTokenInfoError } = tokenInfo;
  const {
    isLoading: isTokenAvailabilityStatusLoading,
    data: { isTokenOwner },
    error: tokenAvailabilityStatusError,
  } = tokenAvailabilityStatus;
  const { isLoading: isNftUriStatusLoading, data: nftUriData, error: nftUriStatusError } = nftUriStatus;

  const debouncedCheckTokenOwner = useDebouncedCallback(checkTokenAvailability);
  const debouncedTokenInfo = useDebouncedCallback(getTokenInfo);
  const debouncedTokenUri = useDebouncedCallback(getTokenURI);

  const onFillTokenData = (address: string, tokenId: string) => {
    const normalizedAddress = getAddress(address);

    const existingToken = NftStorageService.getToken(ownerAddress, normalizedAddress, tokenId);

    setIsTokenAlreadyExists(!!existingToken);

    if (existingToken) {
      return;
    } else {
      if (tokenId) {
        debouncedCheckTokenOwner(normalizedAddress.toLowerCase(), tokenId, ownerAddress.toLowerCase());
        debouncedTokenUri(normalizedAddress, tokenId);
        debouncedTokenInfo(normalizedAddress.toLowerCase());
      }

      setFormValues({ address: normalizedAddress, tokenId });
    }
  };

  const getAddressErrorMessage = () => {
    if (isTokenInfoError) return 'ERRORS.CHECK_CONTRACT_ADDRESS';
    const requestError = tokenAvailabilityStatusError || nftUriStatusError || isTokenInfoError;

    return requestError || '';
  };

  const getTokenIdErrorMessage = () => {
    if (isTokenAlreadyExists) return 'TOKENS.NFT_ALREADY_ADDED';
  };

  const addressErrorMessage = getAddressErrorMessage();
  const tokenIdErrorMessage = getTokenIdErrorMessage();
  const errorMessage = addressErrorMessage || tokenIdErrorMessage;

  const onClickNext = () => {
    if (!isTokenOwner) {
      onNext('TOKENS.IMPORT_FAIL_NOT_OWNER');
    } else {
      NftStorageService.setItem({
        ownerAddress,
        contractAddress: formValues.address,
        tokenId: formValues.tokenId,
        image: nftUriData,
        tokenName: tokenInfoData.name,
      });

      dispatch(getLocalStorageTokenInventory({ ownerAddress }));
      onNext();
    }
  };

  const isLoading = isNftUriStatusLoading || isTokenAvailabilityStatusLoading || isTokenInfoLoading;

  useEffect(() => {
    isLoading && setIsRequestSent(true);
  }, [isLoading]);

  const isDisabled = !!errorMessage || !isRequestSent;

  return (
    <ImportNftForm
      addressError={addressErrorMessage}
      tokenError={tokenIdErrorMessage}
      isDisabledNextButton={isDisabled}
      isLoadingNextButton={isLoading}
      onFillTokenData={onFillTokenData}
      onCancel={onCancel}
      onNext={onClickNext}
    />
  );
};

export default ImportNft;

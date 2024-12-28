import { Box, Stack, Typography } from '@mui/material';
import { usePageParam } from '@xfi/hooks';
import { SelectedNft } from 'components/organisms/operationWidgets/SendNftWidget';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';

import { useAppDispatch, useAppSelector } from '@/hooks';
import { Pagination } from '@/lib/xfi.lib/components/atoms';
import { TableBlock } from '@/lib/xfi.lib/components/molecules';
import { autoDetectNftSelector } from '@/store/app/selectors';
import { getTokenInventoryAsync, tokenInventorySelector } from '@/store/tokenInventory';
import { getLocalStorageTokenInventory, removeTokenInventoryItem } from '@/store/tokenInventory/slice';
import { evmWalletAddressSelector } from '@/store/wallet';

import { NftCard } from '@/components/molecules';

import { ImportNftWidget, SendNftWidget } from '../operationWidgets';
import { StyledBlockTitle, StyledNftInventoryList } from './styles';

const ITEMS_PER_PAGE = 12;

const getPageItems = <T,>(array: T[], page: number): T[] => {
  const startIndex = (page - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;

  return array.slice(startIndex, endIndex);
};

const NftInventoryList = () => {
  const dispatch = useAppDispatch();
  const { query, replace } = useRouter();
  const page = usePageParam();

  const { data: nftList, isLoading } = useAppSelector(tokenInventorySelector);
  const ownerAddress = useAppSelector(evmWalletAddressSelector);
  const autoDetectNft = useAppSelector(autoDetectNftSelector);

  const [nftOnPage, setNftOnPage] = useState(getPageItems(nftList, 1));
  const [selectedCard, setSelectedCard] = useState<SelectedNft | null>(null);

  const pagesCount = nftList?.length > 0 ? Math.ceil(nftList.length / ITEMS_PER_PAGE) : 0;

  useEffect(() => {
    setNftOnPage(getPageItems(nftList, page));
  }, [nftList, page]);

  useEffect(() => {
    if (ownerAddress) {
      const getterFn = autoDetectNft ? getTokenInventoryAsync : getLocalStorageTokenInventory;

      dispatch(getterFn({ ownerAddress }));
    }
  }, [dispatch, ownerAddress, autoDetectNft]);

  const onChangePage = (newPage: number) => {
    replace({
      query: { ...query, page: newPage },
    });
  };

  const onDeleteClick = useCallback(
    (contractAddress: string, tokenId: string) => {
      if (ownerAddress) {
        dispatch(removeTokenInventoryItem({ ownerAddress, contractAddress, tokenId }));
      }
    },
    [dispatch, ownerAddress]
  );

  const onCardClick = useCallback((contractAddress: string, tokenId: string, tokenName?: string) => {
    setSelectedCard(prevSelectedCard => {
      if (prevSelectedCard?.contractAddress === contractAddress && prevSelectedCard?.tokenId === tokenId) {
        return null;
      }
      return { contractAddress, tokenId, tokenName };
    });
  }, []);

  return (
    <>
      {nftOnPage?.length ? (
        <StyledNftInventoryList
          isLoading={isLoading}
          title={<BlockTitle hasData={Boolean(nftOnPage?.length)} selectedCard={selectedCard} />}
        >
          <Box className={'cardsWrapper'}>
            {nftOnPage.map(({ tokenId, tokenName, contractAddress, metadata }) => (
              <NftCard
                key={tokenId + contractAddress}
                imageData={{ imageSrc: metadata?.image, alt: metadata?.description }}
                tokenId={tokenId}
                contractAddress={contractAddress}
                tokenName={tokenName}
                onDeleteClick={onDeleteClick}
                onCardClick={onCardClick}
                isActive={selectedCard?.tokenId === tokenId && selectedCard?.contractAddress === contractAddress}
              />
            ))}
          </Box>

          {!!pagesCount && !isLoading && (
            <Pagination variant={'default'} page={page} count={pagesCount} onChange={onChangePage} />
          )}
        </StyledNftInventoryList>
      ) : (
        <TableBlock
          title={<BlockTitle hasData={Boolean(nftOnPage?.length)} selectedCard={selectedCard} />}
          isLoading={false}
          hasData={false}
          notFound={{ text: 'TOKENS.YOU_DO_NOT_HAVE_NFT' }}
        ></TableBlock>
      )}
    </>
  );
};

export default NftInventoryList;

const BlockTitle = ({ hasData, selectedCard }: { hasData: boolean; selectedCard: SelectedNft | null }) => {
  return (
    <StyledBlockTitle $hasData={hasData}>
      <Box alignSelf={'start'}>
        <Typography variant={'h4'} color={'background.light'}>
          <FormattedMessage id={'TOKENS.NFT_TO_SEND'} />
        </Typography>
      </Box>
      <Stack direction={'row'} gap={'1rem'} width={{ xs: '100%', md: 'auto' }} justifyContent={'space-between'}>
        <ImportNftWidget />
        <SendNftWidget selectedCard={selectedCard} />
      </Stack>
    </StyledBlockTitle>
  );
};

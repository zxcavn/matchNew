import { Stack, Typography } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import { MouseEvent, useRef, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import urlJoin from 'url-join';

import { TokenInventoryItemMetadata } from '@/crud/xfiScan';
import { Button, Icon, Modal } from '@/lib/xfi.lib/components/atoms';
import { TrashIcon } from '@/lib/xfi.lib/icons';
import { useMediaQuery } from '@/lib/xfi.lib/theme';
import { NONE_VALUE, XFI_SCAN_URL } from '@/shared/constants';

import { StyledButton, StyledNftCard } from './styles';

export const TEST_ID = 'card-nft-test-id';

type ImageData = {
  imageSrc?: TokenInventoryItemMetadata['image'];
  alt?: TokenInventoryItemMetadata['description'];
};

export type Props = {
  tokenId: string;
  tokenName?: string;
  contractAddress: string;
  isActive: boolean;
  imageData?: ImageData;
  onDeleteClick: (contractAddress: string, tokenId: string) => void;
  onCardClick: (contractAddress: string, tokenId: string, tokenName?: string) => void;
};

/**
 * A component representing a card for displaying NFT (Non-Fungible Token) information.
 *
 * The `NftCard` component displays information about an NFT, including its token ID,
 * owner address, and optionally, its metadata such as image and description. It also
 * provides links to the NFT's details page and the owner's address page.
 *
 * @component
 *
 * @param {Object} props - The props for the component.
 * @param {string} props.tokenId - The ID of the NFT token.
 * @param {string} [props.tokenName] - The name of the NFT token.
 * @param {string} props.contractAddress - The address of the contract of the NFT.
 * @param {boolean} props.isActive - The active card flag.
 * @param {ImageData} [props.imageData] - The metadata for the NFT image.
 * @param {function(string, string): void} props.onDeleteClick - Callback function to handle delete action.
 * @param {function(string, string, string): void} props.onCardClick - Callback function to handle click action.
 *
 * @returns {FC<Props>} The `NftCard` component, which represents a card for displaying NFT information.
 */
const NftCard = ({ imageData, tokenId, tokenName, contractAddress, onDeleteClick, onCardClick, isActive }: Props) => {
  const tokenIdContainerRef = useRef<HTMLInputElement>(null);

  const [openConfirmModal, setOpenConfirmModal] = useState(false);

  const { imageSrc, alt = 'NFT' } = imageData || {};

  const handleDeleteClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setOpenConfirmModal(true);
  };

  const handleConfirmDelete = () => {
    onDeleteClick(contractAddress, tokenId);
    setOpenConfirmModal(false);
  };

  const handleCancelDelete = () => {
    setOpenConfirmModal(false);
  };

  return (
    <>
      <StyledNftCard data-testid={TEST_ID} $isActive={isActive} onClick={() => onCardClick(contractAddress, tokenId)}>
        <div className="imageWrapper">
          {imageSrc ? (
            <Image src={imageSrc} alt={alt} fill />
          ) : (
            <Typography variant={'h1'} component={'span'} color={'neutrals.light'}>
              NFT
            </Typography>
          )}
        </div>
        <Stack direction={'row'} alignItems={'flex-end'} gap={'0.5rem'}>
          <Stack component={'ul'} gap={'0.5rem'} flex={1} maxWidth={'calc(100% - 3.25rem)'} display={'flex'}>
            <Stack direction="row" component={'li'} gap={'0.5rem'}>
              <Typography component={'span'} variant="body2" color={'neutrals.secondaryText'}>
                <FormattedMessage id={'SUMMARY.NAME'} />:
              </Typography>
              <Typography variant="body2" textOverflow={'ellipsis'} overflow={'hidden'}>
                {tokenName || NONE_VALUE}
              </Typography>
            </Stack>
            <Stack direction="row" component={'li'} gap={'0.5rem'}>
              <Typography component={'span'} variant="body2" color={'neutrals.secondaryText'} whiteSpace={'nowrap'}>
                <FormattedMessage id={'TOKENS.TOKEN_ID'} />:
              </Typography>
              <Stack
                direction="row"
                gap={'0.5rem'}
                justifyContent={'space-between'}
                ref={tokenIdContainerRef}
                width={'calc(100% - 4.05rem)'}
              >
                <Link
                  target={'_blank'}
                  href={urlJoin(XFI_SCAN_URL, 'token', contractAddress, tokenId)}
                  className="tokenIdLink"
                >
                  <Typography variant="link" component={'p'}>
                    {tokenId || NONE_VALUE}
                  </Typography>
                </Link>
              </Stack>
            </Stack>
          </Stack>
          <StyledButton variant={'secondary'} className={'trashIcon'} onClick={handleDeleteClick}>
            <Icon src={TrashIcon} viewBox={'0 0 20 20'} />
          </StyledButton>
        </Stack>
      </StyledNftCard>

      <Modal isOpen={openConfirmModal} setIsOpen={setOpenConfirmModal} title={{ id: 'TOKENS.HIDE_NFT' }}>
        <ConfirmDeleteContent handleCancelDelete={handleCancelDelete} handleConfirmDelete={handleConfirmDelete} />
      </Modal>
    </>
  );
};

export default NftCard;

const ConfirmDeleteContent = ({
  handleCancelDelete,
  handleConfirmDelete,
}: {
  handleCancelDelete: () => void;
  handleConfirmDelete: () => void;
}) => {
  const isMobile = useMediaQuery(theme => theme.breakpoints.down('sm'));

  return (
    <Stack height={'100%'} gap={'2rem'} justifyContent={{ sm: 'space-between' }}>
      <Stack gap="1.5rem">
        <Typography variant="body1" color="neutrals.secondaryText">
          <FormattedMessage id="TOKENS.HIDE_NFT.DESCRIPTION" />
        </Typography>
      </Stack>
      <Stack direction={{ sm: 'row-reverse' }} justifyContent="end" gap={'1rem'}>
        <Button isFullWidth={isMobile} onClick={handleConfirmDelete} size="large">
          <FormattedMessage id="SUMMARY.HIDE" />
        </Button>
        <Button isFullWidth={isMobile} onClick={handleCancelDelete} variant="secondary" size="large">
          <FormattedMessage id="SUMMARY.CANCEL" />
        </Button>
      </Stack>
    </Stack>
  );
};

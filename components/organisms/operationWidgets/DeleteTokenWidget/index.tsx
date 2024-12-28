import { Stack, Typography } from '@mui/material';
import { useCallback, useState } from 'react';
import { FormattedMessage } from 'react-intl';

import { useAppDispatch, useWallet } from '@/hooks';
import { Button, Icon, Modal } from '@/lib/xfi.lib/components/atoms';
import { TrashIcon } from '@/lib/xfi.lib/icons';
import { useMediaQuery } from '@/lib/xfi.lib/theme';
import { deleteToken } from '@/store/walletTokens';

type Props = {
  className?: string;
  contractAddress: string;
};

const DeleteTokenWidget = ({ className, contractAddress }: Props) => {
  const {
    newWallet: { evmAddress },
  } = useWallet();
  const dispatch = useAppDispatch();
  const [isOpenModal, setIsOpenModal] = useState(false);
  const isSm = useMediaQuery(theme => theme.breakpoints.down('sm'));

  const openModal = useCallback(() => setIsOpenModal(true), []);
  const closeModal = useCallback(() => setIsOpenModal(false), []);

  const onClickDelete = useCallback(() => {
    dispatch(deleteToken({ evmWalletAddress: evmAddress, contractAddress }));
    setIsOpenModal(false);
  }, [dispatch, evmAddress, contractAddress]);

  return (
    <>
      <Button onClick={openModal} className={className} variant="secondary" size="mediumIcon">
        <Icon src={TrashIcon} viewBox="0 0 20 20" sx={{ fontSize: '1rem' }} />
      </Button>

      <Modal title={{ id: 'TOKENS.HIDE_TOKEN' }} isOpen={isOpenModal} setIsOpen={setIsOpenModal}>
        <Stack gap="2rem">
          <Typography variant="body1" color="background.light">
            <FormattedMessage id="TOKENS.YOU_CAN_ADD_TOKEN_AGAIN" />
          </Typography>
          <Stack
            gap="1rem"
            alignItems="center"
            justifyContent={{ sm: 'flex-end' }}
            direction={{ sm: 'row', xs: 'column-reverse' }}
          >
            <Button variant="secondary" size="large" isFullWidth={isSm} onClick={closeModal}>
              <FormattedMessage id="SUMMARY.CANCEL" />
            </Button>
            <Button size="large" isFullWidth={isSm} onClick={onClickDelete}>
              <FormattedMessage id="SUMMARY.HIDE" />
            </Button>
          </Stack>
        </Stack>
      </Modal>
    </>
  );
};

export default DeleteTokenWidget;

import { Stack, styled, Typography } from '@mui/material';
import { MxNumberFormatter } from '@xfi/formatters';
import { useCallback, useMemo, useState } from 'react';
import { FormattedMessage } from 'react-intl';

import { ChainRewardRecipientType } from '@/crud/xfiPad';
import { pushNotification } from '@/helpers';
import { useAppDispatch, useAppSelector, useWallet, useWalletTransaction } from '@/hooks';
import { Button, Icon, Modal } from '@/lib/xfi.lib/components/atoms';
import { InfoIcon } from '@/lib/xfi.lib/icons';
import { useMediaQuery } from '@/lib/xfi.lib/theme';
import { XFI_FOR_CLAIM_REWARD_ADDRESS } from '@/shared/constants';
import { CosmosCurrency, CosmosMessageType, SendTransactionOptions, WalletType } from '@/shared/types';
import {
  claimChainRewardsAsync,
  claimChainRewardsSelector,
  getChainRewardsAsync,
  isLoadingChainRewardsSelector,
  walletChainRewardsSelector,
} from '@/store/chainRewards';
import { setClaimRewardId } from '@/store/chainRewards/slice';

import { ChainRewardCard } from '@/components/molecules';

import { SEND_XFI_FOR_CLAIM_REWARD, XFI_FOR_CALC_FEE_TX } from './constants';
import { calculateAmountForTransferXfi, mapChainRewardsToCardData } from './helpers';
import RewardsImage from './RewardsImage';

const GetRewards = () => {
  const dispatch = useAppDispatch();
  const {
    newWallet: { balance },
  } = useWallet();
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useMediaQuery(theme => theme.breakpoints.down('md'));

  const { isLoading: isLoadingClaim, rewardId: loadingRewardId } = useAppSelector(claimChainRewardsSelector);
  const rewardList = useAppSelector(walletChainRewardsSelector);
  const isLoadingRewards = useAppSelector(isLoadingChainRewardsSelector);

  const cardDataList = useMemo(() => mapChainRewardsToCardData(rewardList), [rewardList]);

  const { calculateFee, sendTransaction, fee, isLoadingTransaction, isPendingTx, isLoadingFee } =
    useWalletTransaction();

  const isEnoughXfiForClaimTMpxReward = useMemo(
    () => MxNumberFormatter.toBigInt(balance.xfi) >= MxNumberFormatter.parseUnits('1'),
    [balance]
  );

  const isTMpxRewardAvailable = useMemo(
    () => cardDataList.find(({ recipientType }) => recipientType === ChainRewardRecipientType.TMPX),
    [cardDataList]
  );

  const getFeeForSendXfiTx = useCallback(() => {
    if (isTMpxRewardAvailable && isEnoughXfiForClaimTMpxReward) {
      const message = getTxOptions(MxNumberFormatter.parseUnits(XFI_FOR_CALC_FEE_TX).toString());

      calculateFee(message);
    }
  }, [calculateFee, isEnoughXfiForClaimTMpxReward, isTMpxRewardAvailable]);

  const onClickGetRewardsButton = () => {
    setIsOpen(true);

    getFeeForSendXfiTx();
  };

  const claimRewards = useCallback(
    async (id: string, hash?: string) => {
      try {
        await dispatch(claimChainRewardsAsync(hash ? { id, hash } : { id })).unwrap();

        setIsOpen(false);
        dispatch(getChainRewardsAsync());
        pushNotification({
          type: 'success',
          message: { id: 'SUMMARY.GET_REWARDS' },
          additional: { id: 'NOTIFICATIONS.SUCCESS_CHAIN_REWARD' },
        });
      } catch (error) {
        pushNotification({
          type: 'error',
          message: { id: 'SUMMARY.GET_REWARDS' },
          additional: { id: 'ERRORS.UNEXPECTED_ERROR' },
        });
      }
    },
    [dispatch]
  );

  const getTxOptions = (amount: string): SendTransactionOptions => ({
    type: CosmosMessageType.TRANSFER,
    options: {
      coins: [{ denom: CosmosCurrency.XFI, amount }],
      destinationAddress: XFI_FOR_CLAIM_REWARD_ADDRESS,
      walletType: WalletType.NEW,
      gasCurrency: CosmosCurrency.XFI,
    },
  });

  const onClickClaim = useCallback(
    async (id: string, recipientType: string) => {
      if (recipientType !== ChainRewardRecipientType.TMPX) {
        claimRewards(id);

        return;
      }

      if (fee?.amount) {
        dispatch(setClaimRewardId(id));

        const sendCoins = calculateAmountForTransferXfi(
          MxNumberFormatter.parseUnits(SEND_XFI_FOR_CLAIM_REWARD).toString(),
          fee.amount
        );

        const message = getTxOptions(sendCoins);

        sendTransaction(message, {
          onInitTx: () => {},
          onSuccess: txHash => {
            claimRewards(id, txHash);
          },
          onInitError: () => {
            dispatch(setClaimRewardId(null));
          },
        });
      }
    },
    [fee, dispatch, claimRewards, sendTransaction]
  );

  const getIsClaimDisabled = (recipientType: string) => {
    if (recipientType !== ChainRewardRecipientType.TMPX) return isLoadingClaim;

    return !isEnoughXfiForClaimTMpxReward || isLoadingClaim || isLoadingTransaction || isPendingTx || isLoadingFee;
  };

  const getIsClaimLoading = (id: string, recipientType: string) => {
    if (recipientType !== ChainRewardRecipientType.TMPX) return id === loadingRewardId;

    return isLoadingFee || (id === loadingRewardId && (isLoadingTransaction || isPendingTx));
  };

  return (
    <>
      <Button
        isDisabled={isLoadingRewards || !!loadingRewardId}
        isFullWidth={isMobile}
        onClick={onClickGetRewardsButton}
        variant="secondary"
        size="large"
      >
        <FormattedMessage id="SUMMARY.GET_REWARDS" />
      </Button>

      <Modal isOpen={isOpen} setIsOpen={setIsOpen} title={{ id: 'SUMMARY.GET_REWARDS' }}>
        <Stack position="relative">
          <StyledRewardsImage />
          <StyledContentContainer>
            {cardDataList.map(({ id, recipientType, ...rest }) => (
              <ChainRewardCard
                key={id}
                isLoading={getIsClaimLoading(id, recipientType)}
                isDisabled={getIsClaimDisabled(recipientType)}
                footerSlot={recipientType === ChainRewardRecipientType.TMPX && <TMpxInfoBlock />}
                {...rest}
                onClick={() => onClickClaim(id, recipientType)}
              />
            ))}
          </StyledContentContainer>
        </Stack>
      </Modal>
    </>
  );
};

const TMpxInfoBlock = () => {
  return (
    <Stack
      mt={'1.5rem'}
      padding={'1rem'}
      direction={'row'}
      gap={'0.5rem'}
      sx={{
        border: '1px solid',
        borderColor: 'neutrals.border',
        borderRadius: '1.5rem',
      }}
    >
      <Icon src={InfoIcon} sx={{ fontSize: '1.25rem', flexShrink: 0 }} viewBox="0 0 20 20" />
      <Typography variant="body2">
        <FormattedMessage id={'CHAIN_REWARDS.TMPX.INFO'} />
      </Typography>
    </Stack>
  );
};

const StyledContentContainer = styled(Stack, { name: 'StyledContentContainer' })(({ theme }) => ({
  paddingTop: '16.875rem',
  position: 'relative',
  gap: '1rem',

  [theme.breakpoints.down('sm')]: {
    paddingTop: '12.75rem',
  },
}));

const StyledRewardsImage = styled(RewardsImage, { name: 'StyledRewardsImage' })(({ theme }) => ({
  '&': {
    top: 0,
    right: '50%',
  },

  [theme.breakpoints.up('sm')]: {
    width: '23.75rem',
    height: '23.75rem',
    transform: 'translate(50%, -18%)',
  },

  [theme.breakpoints.down('sm')]: {
    width: '17rem',
    height: '17rem',
    transform: 'translate(50%, -20%)',
  },
}));

export default GetRewards;

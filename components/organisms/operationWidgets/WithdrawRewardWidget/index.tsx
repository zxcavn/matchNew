import { Typography } from '@mui/material';
import { useDebouncedCallback, useDebouncedState } from '@xfi/hooks';
import { useCallback, useState } from 'react';
import { FormattedMessage } from 'react-intl';

import { pushErrorTxNotification, pushInitTxNotification, pushSuccessTxNotification } from '@/helpers';
import { useDelegations, useWallet, useWalletTransaction } from '@/hooks';
import { Delegation } from '@/hooks/useDelegations';
import { Button, ButtonProps, Modal } from '@/lib/xfi.lib/components/atoms';
import { CosmosMessageType, SendTransactionOptions, WalletType } from '@/shared/types';

import { RewardForm, RewardFormValues } from '@/components/molecules/forms';

type Props = {
  validator: Delegation['validator'];
  buttonProps?: ButtonProps;
  walletType?: WalletType;
};

const WithdrawRewardWidget = ({ validator, buttonProps = {}, walletType = WalletType.NEW }: Props) => {
  const { currentWallet } = useWallet({ walletType });
  const walletAddress = currentWallet.address;

  const { fetch: fetchDelegations } = useDelegations(walletAddress);
  const {
    isLoadingFee,
    isLoadingTransaction,
    calculateFee,
    error,
    formattedFee,
    resetTransactionData,
    sendTransaction,
    setFeeData,
    setTxData,
    isPendingTx,
  } = useWalletTransaction();
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [formValues, setFormValues, isFormValuesChanging] = useDebouncedState<RewardFormValues>({});

  const getTxOptions = useCallback(
    (formValues: RewardFormValues): SendTransactionOptions => ({
      type: CosmosMessageType.REWARD,
      options: {
        validatorAddress: validator.address,
        gasCurrency: formValues.gasCurrency,
        walletType,
      },
    }),
    [validator.address, walletType]
  );

  const debouncedCalculateFee = useDebouncedCallback(calculateFee);

  const onChange = useCallback(
    (values: RewardFormValues) => {
      setFeeData(prevValues => ({ ...prevValues, error: '' }));
      setTxData(prevValues => ({ ...prevValues, error: '' }));
      setFormValues(values);
      debouncedCalculateFee(getTxOptions(values));
    },
    [getTxOptions]
  );

  const setIsOpen = (isOpen: boolean) => {
    setIsOpenModal(isOpen);

    if (!isOpen) {
      resetTransactionData();
      setFormValues({});
    }
  };

  const onSubmit = () => {
    sendTransaction(getTxOptions(formValues), {
      onInitTx: () => {
        setIsOpenModal(false);
        pushInitTxNotification();
      },
      onSuccess: () => {
        fetchDelegations({ withTimeout: true });
        pushSuccessTxNotification(CosmosMessageType.REWARD);
      },
      onInitError: error => pushErrorTxNotification(error),
    });
  };

  const isDisabled = isLoadingFee || isLoadingTransaction || Boolean(error) || isFormValuesChanging;

  return (
    <>
      <Button {...buttonProps} isDisabled={isPendingTx} onClick={() => setIsOpenModal(true)}>
        <Typography variant="buttonText2" textTransform="capitalize">
          <FormattedMessage id="LIB.OPERATIONS.CLAIM" />
        </Typography>
      </Button>
      <Modal
        title={{ id: 'WALLET.VALIDATOR_CLAIM', values: { validator: validator.moniker } }}
        isOpen={isOpenModal}
        setIsOpen={setIsOpen}
      >
        <RewardForm
          error={error}
          isDisabled={isDisabled}
          isLoading={isLoadingTransaction || isLoadingFee}
          walletAddress={walletAddress}
          commission={formattedFee}
          onCancel={() => setIsOpen(false)}
          onSubmit={onSubmit}
          onChange={onChange}
        />
      </Modal>
    </>
  );
};

export default WithdrawRewardWidget;

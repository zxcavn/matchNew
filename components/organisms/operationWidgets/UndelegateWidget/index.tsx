import { Typography } from '@mui/material';
import { MxNumberFormatter } from '@xfi/formatters';
import { useDebouncedCallback, useDebouncedState } from '@xfi/hooks';
import { format } from 'date-fns';
import { useCallback, useState } from 'react';
import { FormattedMessage } from 'react-intl';

import { UnbondStatusDto } from '@/crud';
import { pushErrorTxNotification, pushInitTxNotification, pushSuccessTxNotification } from '@/helpers';
import { useDelegations, useWallet, useWalletTransaction } from '@/hooks';
import { Delegation } from '@/hooks/useDelegations';
import { Button, ButtonProps, Modal, Tooltip } from '@/lib/xfi.lib/components/atoms';
import { CosmosCurrency, CosmosMessageType, SendTransactionOptions, WalletType } from '@/shared/types';

import { UndelegateForm, UndelegateFormValues } from '@/components/molecules';

type Props = {
  buttonProps?: ButtonProps;
  walletType?: WalletType;
  delegation: Delegation;
  unbondStatus: UnbondStatusDto;
};

const UndelegateWidget = ({ buttonProps, walletType = WalletType.NEW, delegation, unbondStatus }: Props) => {
  const {
    isLoadingFee,
    isLoadingTransaction,
    calculateFee,
    error,
    formattedFee,
    fee,
    resetTransactionData,
    sendTransaction,
    isPendingTx,
  } = useWalletTransaction();
  const { validator } = delegation;

  const { oldWallet, newWallet, currentWallet } = useWallet({ walletType });
  const { fetch: fetchDelegations } = useDelegations(currentWallet.address);

  const [isOpenModal, setIsOpenModal] = useState(false);
  const [formValues, setFormValues, isFormValuesChanging] = useDebouncedState<UndelegateFormValues>({
    validatorMoniker: '',
    amount: '0',
  });

  const debouncedCalculateFee = useDebouncedCallback(calculateFee);

  const getTxOptions = useCallback(
    ({ amount, gasCurrency }: UndelegateFormValues): SendTransactionOptions => ({
      type: CosmosMessageType.UNDELEGATE,
      options: {
        walletType,
        gasCurrency,
        validatorAddress: delegation.validator.address,
        coin: {
          denom: CosmosCurrency.MPX,
          amount: MxNumberFormatter.parseUnits(amount).toString(),
        },
      },
    }),
    [walletType, delegation.validator.address]
  );

  const onClick = useCallback(() => {
    setIsOpenModal(true);
  }, []);

  const onChange = useCallback(
    (values: UndelegateFormValues) => {
      setFormValues(values);

      if (Number(values.amount)) {
        debouncedCalculateFee(getTxOptions(values));
      }
    },
    [getTxOptions]
  );

  const onSubmit = () => {
    sendTransaction(getTxOptions(formValues), {
      onInitTx: () => {
        setIsOpenModal(false);
        pushInitTxNotification();
      },
      onSuccess: () => {
        fetchDelegations({ withTimeout: true });
        pushSuccessTxNotification(CosmosMessageType.UNDELEGATE);
      },
      onInitError: error => pushErrorTxNotification(error),
    });
  };

  const setIsOpen = (isOpen: boolean) => {
    setIsOpenModal(isOpen);

    if (!isOpen) {
      resetTransactionData();
    }
  };

  const isLoading = isLoadingFee || isLoadingTransaction;
  const isDisabled = !fee || Boolean(error) || isLoading || !Number(formValues.amount) || isFormValuesChanging;

  const isException =
    unbondStatus.exceptionAddresses.includes(newWallet.address) ||
    unbondStatus.exceptionAddresses.includes(oldWallet.address);
  const isDisabledUnbond = isException
    ? false
    : unbondStatus.validators.includes(validator.address) && !unbondStatus.isDatePast;

  const UnbondButton = (
    <Button {...buttonProps} isDisabled={isPendingTx} onClick={() => !isDisabledUnbond && onClick()}>
      <Typography variant="buttonText2" textTransform="capitalize">
        <FormattedMessage id="LIB.OPERATIONS.UNBOND" />
      </Typography>
    </Button>
  );

  return (
    <>
      {isDisabledUnbond ? (
        <Tooltip
          title={
            <Typography variant="body2">
              <FormattedMessage
                id="UNBOUND_STATUS.TEXT"
                values={{ value: format(new Date(unbondStatus.date), 'dd-MM-yyyy') }}
              />
            </Typography>
          }
        >
          {UnbondButton}
        </Tooltip>
      ) : (
        UnbondButton
      )}
      <Modal
        title={{ id: 'WALLET.VALIDATOR_UNBOND', values: { validator: validator.moniker } }}
        isOpen={isOpenModal}
        setIsOpen={setIsOpen}
      >
        <UndelegateForm
          delegation={delegation}
          isDisabled={isDisabled}
          isLoading={isLoading}
          error={error}
          commission={formattedFee}
          onCancel={() => setIsOpen(false)}
          onSubmit={onSubmit}
          onChange={onChange}
        />
      </Modal>
    </>
  );
};

export default UndelegateWidget;

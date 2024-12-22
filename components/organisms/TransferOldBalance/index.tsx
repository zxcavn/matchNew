import { MxNumberFormatter } from '@xfi/formatters';
import { redirect } from '@xfi/helpers';
import clsx from 'clsx';
import { useMemo, useState } from 'react';
import { FormattedMessage } from 'react-intl';

import { pushNotification } from '@/helpers';
import { useAppDispatch, useTransferOldBalance } from '@/hooks';
import { Modal } from '@/lib/xfi.lib/components/atoms/Modal';
import { CURRENCIES } from '@/lib/xfi.lib/constants';
import { notificationTypes, PAGES } from '@/shared/constants';
import { WalletType } from '@/shared/types';
import { setWalletType } from '@/store/wallet';

import { TransferOldBalanceForm } from '@/components/molecules';

import { TransferButton } from './styles';

type Props = {
  className?: string;
};

const TransferOldBalance = ({ className }: Props) => {
  const { isLoading, fromAddress, toAddress, fee, error, transfer, calculateFee, resetTransactionData } =
    useTransferOldBalance();

  const [isOpenModal, setIsOpenModal] = useState(false);
  const dispatch = useAppDispatch();

  const onClickTransferButton = () => {
    setIsOpenModal(true);
    calculateFee();
  };

  const handleModalState = (isOpen: boolean) => {
    setIsOpenModal(isOpen);

    if (!isOpen) resetTransactionData();
  };

  const onSubmit = () => {
    transfer({
      onInitTx: () => setIsOpenModal(false),
      onSuccess: txHash => {
        dispatch(setWalletType(WalletType.NEW));

        redirect(PAGES.cosmosWallet).then(() => {
          pushNotification({
            ...notificationTypes.success,
            message: { id: 'NOTIFICATIONS.SUCCESS_TRANSFER' },
            additional: { text: txHash },
          });
        });
      },
    });
  };

  const displayCommission = useMemo(() => {
    if (!fee) return null;

    return {
      denom: fee.denom,
      amount: MxNumberFormatter.formatUnitsToDisplay(fee.amount, {
        maxFractionalLength: CURRENCIES[fee.denom].formatDecimals,
      }),
    };
  }, [fee]);

  return (
    <>
      <TransferButton onClick={onClickTransferButton} className={clsx('button', className)} size="large">
        <FormattedMessage id="SUMMARY.SEND" />
      </TransferButton>

      <Modal title={{ id: 'WALLET.TRANSFER_ALL_OLD_BALANCE' }} isOpen={isOpenModal} setIsOpen={handleModalState}>
        <TransferOldBalanceForm
          isLoading={isLoading}
          fromAddress={fromAddress}
          toAddress={toAddress}
          onSubmit={onSubmit}
          onCancel={() => handleModalState(false)}
          errorMessage={error}
          commission={displayCommission}
        />
      </Modal>
    </>
  );
};

export default TransferOldBalance;

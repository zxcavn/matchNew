import { MxNumberFormatter } from '@xfi/formatters';
import Long from 'long';
import { useCallback } from 'react';

import { pushErrorTxNotification, pushInitTxNotification, pushSuccessTxNotification } from '@/helpers';
import { CosmosCurrency, CosmosMessageType, SendTransactionOptions } from '@/shared/types';

import type { DepositProposalFormValues } from '@/components/molecules';

import useWalletTransaction from './useWalletTransaction';

const useDepositProposal = () => {
  const {
    isLoadingFee,
    isLoadingTransaction,
    fee: feeValue,
    feeError,
    isPendingTx,
    txError,
    sendTransaction,
    setFeeData,
    calculateFee: calculateTxFee,
  } = useWalletTransaction();

  const getTxOptions = useCallback(
    ({
      proposalId,
      initialDeposit,
      gasCurrency,
    }: DepositProposalFormValues & { proposalId: string }): SendTransactionOptions => {
      return {
        type: CosmosMessageType.DEPOSIT,
        options: {
          proposalId: Long.fromString(proposalId),
          amount: [
            {
              amount: MxNumberFormatter.parseUnits(initialDeposit).toString(),
              denom: CosmosCurrency.MPX,
            },
          ],
          gasCurrency,
        },
      };
    },
    []
  );

  const calculateFee = useCallback(
    (values: DepositProposalFormValues & { proposalId: string }) => {
      calculateTxFee(getTxOptions(values));
    },
    [calculateTxFee]
  );

  const send = useCallback(
    (values: DepositProposalFormValues & { proposalId: string }, onSuccess?: () => void, onInitError?: () => void) => {
      sendTransaction(getTxOptions(values), {
        onInitTx: () => {
          pushInitTxNotification();
        },
        onSuccess: () => {
          pushSuccessTxNotification(CosmosMessageType.DEPOSIT);
          onSuccess?.();
        },
        onInitError: error => {
          setFeeData(values => ({ ...values, error }));
          pushErrorTxNotification(error);
          onInitError?.();
        },
      });
    },
    []
  );

  return {
    send,
    calculateFee,
    fee: feeValue,
    setFeeData,
    isLoadingFee,
    feeError,
    isPendingTx,
    isLoadingTransaction,
    submitProposalError: txError,
  };
};

export default useDepositProposal;

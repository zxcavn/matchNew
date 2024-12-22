import Long from 'long';
import { useCallback } from 'react';

import { pushErrorTxNotification, pushInitTxNotification, pushSuccessTxNotification } from '@/helpers';
import { CosmosMessageType, SendTransactionOptions } from '@/shared/types';

import { VoteProposalFormValues } from '@/components/molecules';

import useWalletTransaction from './useWalletTransaction';

const useVoteProposal = () => {
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
    ({ proposalId, option, gasCurrency }: VoteProposalFormValues & { proposalId: string }): SendTransactionOptions => {
      return {
        type: CosmosMessageType.VOTE,
        options: {
          proposalId: Long.fromString(proposalId),
          option: Number(option),
          gasCurrency,
        },
      };
    },
    []
  );

  const calculateFee = useCallback(
    (values: VoteProposalFormValues & { proposalId: string }) => {
      calculateTxFee(getTxOptions(values));
    },
    [calculateTxFee]
  );

  const send = useCallback((values: VoteProposalFormValues & { proposalId: string }, onSuccess?: () => void) => {
    sendTransaction(getTxOptions(values), {
      onInitTx: () => {
        pushInitTxNotification();
      },
      onSuccess: () => {
        pushSuccessTxNotification(CosmosMessageType.VOTE);
        onSuccess?.();
      },
      onInitError: error => {
        setFeeData(values => ({ ...values, error }));
        pushErrorTxNotification(error);
      },
    });
  }, []);

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

export default useVoteProposal;

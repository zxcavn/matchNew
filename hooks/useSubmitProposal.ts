import { MxNumberFormatter } from '@xfi/formatters';
import Long from 'long';
import { useCallback } from 'react';

import { pushErrorTxNotification, pushInitTxNotification } from '@/helpers';
import type { TransactionResponse } from '@/lib/xfi.lib/helpers';
import { type SendTransactionOptions, CosmosCurrency, CosmosMessageType, ProposalMessageType } from '@/shared/types';

import type { CreateProposalOutputValues, DepositProposalFormValues } from '@/components/molecules';

import useWalletTransaction from './useWalletTransaction';

const useSubmitProposal = () => {
  const {
    isLoadingFee,
    isLoadingTransaction,
    fee: feeValue,
    feeError,
    isPendingTx,
    txError,
    error,
    sendTransaction,
    setFeeData,
    calculateFee: calculateTxFee,
  } = useWalletTransaction();

  const getTxOptions = useCallback(
    (values: CreateProposalOutputValues & DepositProposalFormValues): SendTransactionOptions => {
      const { type, gasCurrency } = values;
      let proposalContent;

      switch (type) {
        case ProposalMessageType.TEXT:
          proposalContent = {
            type,
            title: values.title,
            description: values.description,
          };
          break;

        case ProposalMessageType.COMMUNITY_POOL_SPEND:
          proposalContent = {
            type,
            title: values.title,
            description: values.description,
            recipient: values.recipient,
            amount: values.amount,
          };
          break;

        case ProposalMessageType.SOFTWARE_UPGRADE:
          {
            proposalContent = {
              type,
              title: values.title,
              description: values.description,
              plan: {
                name: values.name,
                height: Long.fromString(values.height),
                info: values.info,
              },
            };
          }
          break;
      }

      return {
        type: CosmosMessageType.SUBMIT_PROPOSAL,
        options: {
          initialDeposit: {
            amount: MxNumberFormatter.parseUnits(values.initialDeposit).toString(),
            denom: CosmosCurrency.MPX,
          },
          content: proposalContent,
          gasCurrency,
        },
      };
    },
    []
  );

  const calculateFee = useCallback(
    (values: CreateProposalOutputValues & DepositProposalFormValues) => {
      calculateTxFee(getTxOptions(values));
    },
    [calculateTxFee]
  );

  const send = useCallback(
    (
      {
        values,
      }: {
        values: CreateProposalOutputValues & DepositProposalFormValues;
      },
      onSuccess?: (tx: TransactionResponse) => void,
      onInitError?: () => void
    ) => {
      sendTransaction(getTxOptions(values), {
        onInitTx: () => {
          pushInitTxNotification();
        },
        onSuccess: (_, tx: TransactionResponse) => {
          onSuccess?.(tx);
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
    error,
    isPendingTx,
    isLoadingTransaction,
    submitProposalError: txError,
  };
};

export default useSubmitProposal;

import { MxNumberFormatter } from '@xfi/formatters';
import sortBy from 'lodash/sortBy';
import { useCallback } from 'react';

import { pushInitTxNotification, pushSuccessTxNotification } from '@/helpers';
import {
  Coin,
  CosmosCurrency,
  CosmosMessageType,
  MultisendOptions,
  SendTransactionOptions,
  WalletType,
} from '@/shared/types';

import { FormChangeValues } from '@/components/molecules';

import useWallet from './useWallet';
import useWalletTransaction from './useWalletTransaction';

type TotalOutputs = Partial<{
  outputMpx: Coin;
  outputXfi: Coin;
}>;

const sortCoinsByDenom = (coins: Coin[]): Coin[] => {
  return sortBy(coins, c => c.denom);
};

const useMultisend = () => {
  const {
    newWallet: { address },
  } = useWallet();
  const {
    isLoadingFee,
    isLoadingTransaction,
    fee: feeValue,
    feeError,
    txError,
    sendTransaction,
    setFeeData,
    calculateFee: calculateTxFee,
  } = useWalletTransaction();

  const mapFormValuesToMultisend = useCallback(
    (formValues: FormChangeValues[]): MultisendOptions & TotalOutputs => {
      const outputs = getOutputCoins(formValues);
      const { mpxAmount, xfiAmount } = getTotalAmount(outputs);

      const mxp = mpxAmount
        ? [
            {
              denom: CosmosCurrency.MPX,
              amount: mpxAmount.toString(),
            },
          ]
        : [];
      const xfi = xfiAmount
        ? [
            {
              denom: CosmosCurrency.XFI,
              amount: xfiAmount.toString(),
            },
          ]
        : [];

      return {
        outputs,
        inputs: [
          {
            address,
            coins: sortCoinsByDenom([...mxp, ...xfi]),
          },
        ],
        outputMpx: mxp[0],
        outputXfi: xfi[0],
      };
    },
    [address]
  );

  const transferOrMultisendOptions = (
    formValues: FormChangeValues[],
    memo: string | undefined,
    gasCurrency?: CosmosCurrency
  ): SendTransactionOptions => {
    const { inputs, outputs } = mapFormValuesToMultisend(formValues);
    const isSingleOutput = outputs.length === 1;

    if (isSingleOutput) {
      return {
        type: CosmosMessageType.TRANSFER,
        options: {
          coins: outputs[0].coins,
          destinationAddress: outputs[0].address,
          walletType: WalletType.NEW,
          memo,
          gasCurrency,
        },
      };
    }
    return {
      type: CosmosMessageType.MULTISEND,
      options: {
        memo,
        inputs,
        outputs,
        gasCurrency,
      },
    };
  };

  const calculateFee = useCallback(
    (formValues: FormChangeValues[], memo: string | undefined, gasCurrency?: CosmosCurrency) => {
      const options: SendTransactionOptions = transferOrMultisendOptions(formValues, memo, gasCurrency);

      calculateTxFee(options);
    },
    [mapFormValuesToMultisend]
  );

  const send = useCallback(
    (
      {
        formValues,
        memo,
        gasCurrency,
      }: { formValues: FormChangeValues[]; memo?: string; gasCurrency?: CosmosCurrency },
      onInitTx: () => void,
      onSuccess?: () => void
    ) => {
      const { outputs } = mapFormValuesToMultisend(formValues);
      const isSingleOutput = outputs.length === 1;

      const options: SendTransactionOptions = transferOrMultisendOptions(formValues, memo, gasCurrency);

      sendTransaction(options, {
        onInitTx: () => {
          pushInitTxNotification();
          onInitTx();
        },
        onSuccess: () => {
          pushSuccessTxNotification(isSingleOutput ? CosmosMessageType.TRANSFER : CosmosMessageType.MULTISEND);
          onSuccess?.();
        },
        onInitError: error => setFeeData(values => ({ ...values, error })),
      });
    },
    [mapFormValuesToMultisend]
  );

  return {
    send,
    calculateFee,
    fee: feeValue,
    isLoadingFee,
    feeError,
    isLoadingTransaction,
    multisendError: txError,
  };
};

export const getOutputCoins = (formValues: FormChangeValues[]): MultisendOptions['outputs'] => {
  return formValues.map(({ values, fieldCount }) => {
    if (fieldCount === 1) {
      return {
        address: values.address,
        coins: [
          {
            denom: values.firstSelect as CosmosCurrency,
            amount: MxNumberFormatter.parseUnits(values.firstInput).toString(),
          },
        ],
      };
    } else {
      return {
        address: values.address,
        coins: sortCoinsByDenom([
          {
            denom: values.firstSelect as CosmosCurrency,
            amount: MxNumberFormatter.parseUnits(values.firstInput).toString(),
          },
          {
            denom: values.secondSelect as CosmosCurrency,
            amount: MxNumberFormatter.parseUnits(values.secondInput).toString(),
          },
        ]),
      };
    }
  });
};

export const getTotalAmount = (outputs: MultisendOptions['outputs']): { mpxAmount: bigint; xfiAmount: bigint } => {
  const outputCoins = outputs.map(({ coins }) => coins).flat();

  const mpxAmount = outputCoins
    .filter(({ denom }) => denom === CosmosCurrency.MPX)
    .reduce((acc, { amount }) => (acc += MxNumberFormatter.toBigInt(amount)), 0n);
  const xfiAmount = outputCoins
    .filter(({ denom }) => denom === CosmosCurrency.XFI)
    .reduce((acc, { amount }) => (acc += MxNumberFormatter.toBigInt(amount)), 0n);

  return { mpxAmount, xfiAmount };
};

export default useMultisend;

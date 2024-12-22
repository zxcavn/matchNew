import { AccountData } from '@cosmjs/proto-signing';
import { StdFee } from '@cosmjs/stargate';
import { MxNumberFormatter } from '@xfi/formatters';

import {
  CosmosCurrency,
  CosmosMessage,
  CosmosMessageType,
  MultisendInputsOutputs,
  MultisendOptions,
  TransactionResponse,
} from '@/shared/types';

import CosmosService from '../cosmosService';
import {
  InsufficientBalanceError,
  InvalidAddressError,
  NotEnoughCoinsForCommissionError,
  performAsync,
} from '../errors';
import { isAccountAddress } from '../helpers';
import { ICosmosTransactionService } from '../interfaces';

class MultisendCosmosService implements ICosmosTransactionService<MultisendOptions> {
  constructor(private readonly baseService: CosmosService) {}

  async calculateFee({ inputs, outputs, gasCurrency, memo }: MultisendOptions): Promise<StdFee> {
    return performAsync(async () => {
      const { newWallet } = await this.baseService.getAccounts();
      const message: CosmosMessage = {
        typeUrl: CosmosMessageType.MULTISEND,
        value: { inputs, outputs },
      };

      this.validateMessageOrThrowError(message);
      await this.checkEnoughCoinsOrThrowError({ wallet: newWallet, inputs });

      const client = await this.baseService.getSigningStargateClient({ gasCurrency });
      const fee = await this.baseService.calculateFeeBase({
        client,
        message,
        accountData: newWallet,
        memo,
        gasCurrency,
      });

      await this.checkEnoughCoinsOrThrowError({ wallet: newWallet, inputs, fee });

      return fee;
    });
  }

  async send(options: MultisendOptions): Promise<TransactionResponse> {
    return performAsync(async () => {
      const { inputs, outputs, gasCurrency, memo } = options;
      const { newWallet } = await this.baseService.getAccounts();
      const message: CosmosMessage = {
        typeUrl: CosmosMessageType.MULTISEND,
        value: {
          inputs,
          outputs,
        },
      };

      this.validateMessageOrThrowError(message);
      await this.checkEnoughCoinsOrThrowError({ wallet: newWallet, inputs });

      const stdFee = await this.calculateFee(options);

      await this.checkEnoughCoinsOrThrowError({ wallet: newWallet, inputs, fee: stdFee });

      const client = await this.baseService.getSigningStargateClient({ gasCurrency });
      const txHash = await client.signAndBroadcastSync(newWallet.address, [message], stdFee, memo);

      return { txHash };
    });
  }

  async checkEnoughCoinsOrThrowError({
    wallet,
    inputs,
    fee,
  }: {
    wallet: AccountData;
    inputs: MultisendInputsOutputs;
    fee?: StdFee;
  }) {
    const { mpx: mpxBalance, xfi: xfiBalance } = await this.baseService.getBalanceByCoins(wallet.address);
    const sendMpx = this.baseService.getCoinFromBalance(CosmosCurrency.MPX, inputs[0].coins);
    const sendXfi = this.baseService.getCoinFromBalance(CosmosCurrency.XFI, inputs[0].coins);
    const isEnoughMpx = MxNumberFormatter.toBigInt(sendMpx.amount) <= MxNumberFormatter.toBigInt(mpxBalance.amount);
    const isEnoughXfi = MxNumberFormatter.toBigInt(sendXfi.amount) <= MxNumberFormatter.toBigInt(xfiBalance.amount);

    if (!isEnoughMpx || !isEnoughXfi) throw new InsufficientBalanceError();

    if (!fee) return;

    const { denom: feeDenom, amount: feeAmount } = fee.amount[0];

    this.baseService.validateCurrency(feeDenom);

    switch (feeDenom) {
      case CosmosCurrency.XFI: {
        const isEnough =
          isEnoughMpx &&
          MxNumberFormatter.toBigInt(sendXfi.amount) + MxNumberFormatter.toBigInt(feeAmount) <=
            MxNumberFormatter.toBigInt(xfiBalance.amount);

        if (!isEnough) throw new NotEnoughCoinsForCommissionError();

        break;
      }

      case CosmosCurrency.MPX: {
        const isEnough =
          isEnoughXfi &&
          MxNumberFormatter.toBigInt(sendMpx.amount) + MxNumberFormatter.toBigInt(feeAmount) <=
            MxNumberFormatter.toBigInt(mpxBalance.amount);

        if (!isEnough) throw new NotEnoughCoinsForCommissionError();

        break;
      }
    }
  }

  private validateMessageOrThrowError({ value }: CosmosMessage & { typeUrl: CosmosMessageType.MULTISEND }) {
    const { inputs, outputs } = value;

    const addresses = [...inputs, ...outputs].map(({ address }) => address);

    addresses.forEach(address => {
      if (!isAccountAddress(address)) {
        throw new InvalidAddressError(address);
      }
    });
  }
}

export default MultisendCosmosService;

import type { AccountData } from '@cosmjs/proto-signing';
import type { StdFee } from '@cosmjs/stargate';
import { MxNumberFormatter, mxToHexAddress } from '@xfi/formatters';

import {
  type ICosmosTransactionService,
  CosmosService,
  InsufficientBalanceError,
  NotEnoughCoinsForCommissionError,
  performAsync,
} from '@/services';
import {
  type CosmosMessage,
  type TransactionResponse,
  ConvertCoinOptions,
  CosmosCurrency,
  CosmosMessageType,
} from '@/shared/types';

class ConvertCoinCosmosService implements ICosmosTransactionService<ConvertCoinOptions> {
  constructor(private readonly baseService: CosmosService) {}

  private getTxOptions({ address, coin }: Omit<ConvertCoinOptions, 'mpxChequeBalance'> & { address: string }) {
    const message: CosmosMessage = {
      typeUrl: CosmosMessageType.CONVERT_COIN,
      value: {
        coin,
        sender: address,
        receiver: mxToHexAddress(address),
      },
    };

    return message;
  }

  async calculateFee({ coin, mpxChequeBalance, gasCurrency }: ConvertCoinOptions): Promise<StdFee> {
    return performAsync(async () => {
      const { newWallet } = await this.baseService.getAccounts();
      const client = await this.baseService.getSigningStargateClient({ gasCurrency });

      await this.checkEnoughCoinsOrThrowError({ wallet: newWallet, coin, mpxChequeBalance });

      const message = this.getTxOptions({ address: newWallet.address, coin });

      const fee = await this.baseService.calculateFeeBase({
        client,
        accountData: newWallet,
        message,
        gasCurrency,
      });

      await this.checkEnoughCoinsOrThrowError({ wallet: newWallet, coin, mpxChequeBalance, fee });

      return fee;
    });
  }

  async send(options: ConvertCoinOptions): Promise<TransactionResponse> {
    return performAsync(async () => {
      const { coin, mpxChequeBalance, gasCurrency } = options;
      const { newWallet } = await this.baseService.getAccounts();
      const client = await this.baseService.getSigningStargateClient({ gasCurrency });

      const message = this.getTxOptions({ address: newWallet.address, coin });

      const stdFee = await this.calculateFee(options);

      await this.checkEnoughCoinsOrThrowError({ wallet: newWallet, coin, mpxChequeBalance, fee: stdFee });

      const txHash = await client.signAndBroadcastSync(newWallet.address, [message], stdFee);

      return { txHash };
    });
  }

  async checkEnoughCoinsOrThrowError({
    wallet,
    coin,
    mpxChequeBalance,
    fee,
  }: {
    wallet: AccountData;
    coin: {
      amount: string;
      denom: CosmosCurrency;
    };
    mpxChequeBalance: string;
    fee?: StdFee;
  }) {
    const { mpx: mpxBalance, xfi: xfiBalance } = await this.baseService.getBalanceByCoins(wallet.address);
    const isEnoughCoins =
      MxNumberFormatter.toBigInt(coin.amount) < MxNumberFormatter.toBigInt(mpxBalance.amount) &&
      MxNumberFormatter.toBigInt(coin.amount) <= MxNumberFormatter.toBigInt(mpxChequeBalance);

    if (!isEnoughCoins) throw new InsufficientBalanceError();

    if (!fee) return;

    const { denom: feeDenom, amount: feeAmount } = fee.amount[0];

    this.baseService.validateCurrency(feeDenom);

    switch (feeDenom) {
      case CosmosCurrency.XFI: {
        const isEnough = MxNumberFormatter.toBigInt(feeAmount) <= MxNumberFormatter.toBigInt(xfiBalance.amount);

        if (!isEnough) throw new NotEnoughCoinsForCommissionError();

        break;
      }

      case CosmosCurrency.MPX: {
        const isEnough =
          MxNumberFormatter.toBigInt(coin.amount) + MxNumberFormatter.toBigInt(feeAmount) <=
          MxNumberFormatter.toBigInt(mpxBalance.amount);

        if (!isEnough) throw new NotEnoughCoinsForCommissionError();

        break;
      }
    }
  }
}

export default ConvertCoinCosmosService;

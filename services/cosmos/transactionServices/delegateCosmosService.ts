import { AccountData } from '@cosmjs/proto-signing';
import { StdFee } from '@cosmjs/stargate';
import { MxNumberFormatter } from '@xfi/formatters';

import {
  Coin,
  CosmosCurrency,
  CosmosMessage,
  CosmosMessageType,
  DelegateOptions,
  TransactionResponse,
} from '@/shared/types';

import CosmosService from '../cosmosService';
import {
  InsufficientBalanceError,
  InvalidAddressError,
  NotEnoughCoinsForCommissionError,
  performAsync,
} from '../errors';
import { isAccountAddress, isValidatorAddress } from '../helpers';
import { ICosmosTransactionService } from '../interfaces';

class DelegateCosmosService implements ICosmosTransactionService<DelegateOptions> {
  constructor(private readonly baseService: CosmosService) {}

  async calculateFee({ validatorAddress, coin, gasCurrency, walletType }: DelegateOptions): Promise<StdFee> {
    return performAsync(async () => {
      const accountData = await this.baseService.getAccountByWalletType(walletType);
      const message: CosmosMessage = {
        typeUrl: CosmosMessageType.DELEGATE,
        value: {
          validatorAddress,
          delegatorAddress: accountData.address,
          amount: coin,
        },
      };

      this.validateMessageOrThrowError(message);
      await this.checkEnoughCoinsOrThrowError({ wallet: accountData, sendCoin: coin });

      const client = await this.baseService.getSigningStargateClient({ gasCurrency });
      const fee = await this.baseService.calculateFeeBase({ client, message, accountData, gasCurrency });

      await this.checkEnoughCoinsOrThrowError({
        wallet: accountData,
        sendCoin: coin,
        fee,
      });

      return fee;
    });
  }

  async send(options: DelegateOptions): Promise<TransactionResponse> {
    return performAsync(async () => {
      const { validatorAddress, coin, gasCurrency, walletType } = options;
      const accountData = await this.baseService.getAccountByWalletType(walletType);
      const message: CosmosMessage = {
        typeUrl: CosmosMessageType.DELEGATE,
        value: {
          validatorAddress,
          delegatorAddress: accountData.address,
          amount: coin,
        },
      };

      this.validateMessageOrThrowError(message);
      await this.checkEnoughCoinsOrThrowError({
        wallet: accountData,
        sendCoin: coin,
      });

      const stdFee = await this.calculateFee(options);

      await this.checkEnoughCoinsOrThrowError({
        wallet: accountData,
        sendCoin: coin,
        fee: stdFee,
      });

      const client = await this.baseService.getSigningStargateClient({ gasCurrency });
      const txHash = await client.signAndBroadcastSync(accountData.address, [message], stdFee);

      return { txHash };
    });
  }

  async checkEnoughCoinsOrThrowError({ wallet, sendCoin, fee }: { wallet: AccountData; sendCoin: Coin; fee?: StdFee }) {
    const { mpx: mpxBalance, xfi: xfiBalance } = await this.baseService.getBalanceByCoins(wallet.address);
    const isEnoughMpxBalance =
      MxNumberFormatter.toBigInt(mpxBalance.amount) >= MxNumberFormatter.toBigInt(sendCoin.amount);

    if (!isEnoughMpxBalance) throw new InsufficientBalanceError();

    if (!fee) return;

    const { denom: feeDenom, amount: feeAmount } = fee.amount[0];

    this.baseService.validateCurrency(feeDenom);

    switch (feeDenom) {
      case CosmosCurrency.XFI: {
        const isEnough =
          isEnoughMpxBalance && MxNumberFormatter.toBigInt(xfiBalance.amount) >= MxNumberFormatter.toBigInt(feeAmount);

        if (!isEnough) throw new NotEnoughCoinsForCommissionError();

        break;
      }

      case CosmosCurrency.MPX: {
        const isEnough =
          MxNumberFormatter.toBigInt(sendCoin.amount) + MxNumberFormatter.toBigInt(feeAmount) <=
          MxNumberFormatter.toBigInt(mpxBalance.amount);

        if (!isEnough) throw new NotEnoughCoinsForCommissionError();

        break;
      }
    }
  }

  private validateMessageOrThrowError({ value }: CosmosMessage & { typeUrl: CosmosMessageType.DELEGATE }) {
    const { delegatorAddress, validatorAddress } = value;

    if (!isAccountAddress(delegatorAddress)) {
      throw new InvalidAddressError(delegatorAddress);
    }

    if (!isValidatorAddress(validatorAddress)) {
      throw new InvalidAddressError(validatorAddress);
    }
  }
}

export default DelegateCosmosService;

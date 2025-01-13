import { AccountData } from '@cosmjs/proto-signing';
import { StdFee } from '@cosmjs/stargate';
import { MxNumberFormatter } from '@xfi/formatters';

import {
  Coin,
  CosmosCurrency,
  CosmosMessage,
  CosmosMessageType,
  TransactionResponse,
  TransferOptions,
  WalletType,
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

class TransferCosmosService implements ICosmosTransactionService<TransferOptions> {
  constructor(private readonly baseService: CosmosService) {}

  async calculateFee({
    gasCurrency,
    destinationAddress,
    coins,
    walletType,
    memo,
    // needs for transfer all only
    checkEnoughCommission = true,
  }: TransferOptions): Promise<StdFee> {
    return performAsync(async () => {
      const { oldWallet, newWallet } = await this.baseService.getAccounts();
      const accountData = walletType === WalletType.NEW ? newWallet : oldWallet;
      const message: CosmosMessage = {
        typeUrl: CosmosMessageType.TRANSFER,
        value: {
          fromAddress: accountData.address,
          toAddress: destinationAddress,
          amount: coins,
        },
      };

      this.validateMessageOrThrowError(message);
      await this.checkEnoughCoinsOrThrowError({ wallet: accountData, coins });

      const client = await this.baseService.getSigningStargateClient({ gasCurrency });
      const fee = await this.baseService.calculateFeeBase({
        client,
        accountData,
        message,
        gasCurrency,
        memo,
      });

      if (checkEnoughCommission) {
        await this.checkEnoughCoinsOrThrowError({ wallet: accountData, coins, fee });
      }

      return fee;
    });
  }

  async send(options: TransferOptions): Promise<TransactionResponse> {
    return performAsync(async () => {
      const { destinationAddress, walletType, coins, gasCurrency, memo } = options;
      const { oldWallet, newWallet } = await this.baseService.getAccounts();
      const wallet = walletType === WalletType.NEW ? newWallet : oldWallet;

      const message: CosmosMessage = {
        typeUrl: CosmosMessageType.TRANSFER,
        value: {
          fromAddress: wallet.address,
          toAddress: destinationAddress,
          amount: coins,
        },
      };

      this.validateMessageOrThrowError(message);
      await this.checkEnoughCoinsOrThrowError({ wallet, coins });

      const stdFee = await this.calculateFee(options);

      await this.checkEnoughCoinsOrThrowError({ wallet, coins, fee: stdFee });

      const client = await this.baseService.getSigningStargateClient({ gasCurrency });
      const txHash = await client.signAndBroadcastSync(wallet.address, [message], stdFee, memo);

      return { txHash };
    });
  }

  async checkEnoughCoinsOrThrowError({ wallet, coins, fee }: { wallet: AccountData; coins: Coin[]; fee?: StdFee }) {
    const { mpx: mpxBalance, xfi: xfiBalance } = await this.baseService.getBalanceByCoins(wallet.address);
    const sendMpx = this.baseService.getCoinFromBalance(CosmosCurrency.MPX, coins);
    const sendXfi = this.baseService.getCoinFromBalance(CosmosCurrency.XFI, coins);
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

  private validateMessageOrThrowError({ value }: CosmosMessage & { typeUrl: CosmosMessageType.TRANSFER }) {
    const { fromAddress, toAddress } = value;

    [fromAddress, toAddress].forEach(address => {
      if (!isAccountAddress(address)) {
        throw new InvalidAddressError(address);
      }
    });
  }
}

export default TransferCosmosService;

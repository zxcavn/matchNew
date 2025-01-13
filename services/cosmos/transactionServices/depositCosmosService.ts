import { AccountData } from '@cosmjs/proto-signing';
import { StdFee } from '@cosmjs/stargate';
import { MxNumberFormatter } from '@xfi/formatters';

import {
  CosmosService,
  ICosmosTransactionService,
  InsufficientBalanceError,
  InvalidAddressError,
  isAccountAddress,
  NotEnoughCoinsForCommissionError,
  performAsync,
} from '@/services';
import { CosmosCurrency, CosmosMessage, CosmosMessageType, DepositOptions, TransactionResponse } from '@/shared/types';

class DepositCosmosService implements ICosmosTransactionService<DepositOptions> {
  constructor(private readonly baseService: CosmosService) {}

  private getTxOptions({ proposalId, amount, depositor }: DepositOptions & { depositor: string }) {
    const message: CosmosMessage = {
      typeUrl: CosmosMessageType.DEPOSIT,
      value: {
        proposalId,
        amount,
        depositor,
      },
    };

    return message;
  }

  async calculateFee({ proposalId, amount, gasCurrency }: DepositOptions): Promise<StdFee> {
    return performAsync(async () => {
      const { newWallet } = await this.baseService.getAccounts();
      const message = this.getTxOptions({ proposalId, depositor: newWallet.address, amount });

      this.validateMessageOrThrowError(message);

      const client = await this.baseService.getSigningStargateClient({ gasCurrency });

      await this.checkEnoughCoinsOrThrowError({ wallet: newWallet, amount });

      const fee = await this.baseService.calculateFeeBase({
        client,
        accountData: newWallet,
        message,
        gasCurrency,
      });

      await this.checkEnoughCoinsOrThrowError({ wallet: newWallet, amount, fee });

      return fee;
    });
  }

  async send(options: DepositOptions): Promise<TransactionResponse> {
    return performAsync(async () => {
      const { proposalId, amount, gasCurrency } = options;
      const { newWallet } = await this.baseService.getAccounts();
      const message = this.getTxOptions({ proposalId, depositor: newWallet.address, amount });

      this.validateMessageOrThrowError(message);

      const stdFee = await this.calculateFee({ proposalId, amount, gasCurrency });

      await this.checkEnoughCoinsOrThrowError({ wallet: newWallet, amount, fee: stdFee });

      const client = await this.baseService.getSigningStargateClient({ gasCurrency });
      const txHash = await client.signAndBroadcastSync(newWallet.address, [message], stdFee);

      return { txHash };
    });
  }

  async checkEnoughCoinsOrThrowError({
    wallet,
    amount,
    fee,
  }: {
    wallet: AccountData;
    amount: {
      amount: string;
      denom: CosmosCurrency;
    }[];
    fee?: StdFee;
  }) {
    const { mpx: mpxBalance, xfi: xfiBalance } = await this.baseService.getBalanceByCoins(wallet.address);
    const isEnoughForDeposit =
      MxNumberFormatter.toBigInt(amount[0].amount) < MxNumberFormatter.toBigInt(mpxBalance.amount);

    if (!isEnoughForDeposit) throw new InsufficientBalanceError();

    if (!fee) return;

    const { denom: feeDenom, amount: feeAmount } = fee.amount[0];

    this.baseService.validateCurrency(feeDenom);

    switch (feeDenom) {
      case CosmosCurrency.XFI: {
        const isEnough =
          isEnoughForDeposit && MxNumberFormatter.toBigInt(feeAmount) <= MxNumberFormatter.toBigInt(xfiBalance.amount);

        if (!isEnough) throw new NotEnoughCoinsForCommissionError();

        break;
      }

      case CosmosCurrency.MPX: {
        const isEnough =
          isEnoughForDeposit &&
          MxNumberFormatter.toBigInt(amount[0].amount) + MxNumberFormatter.toBigInt(feeAmount) <=
            MxNumberFormatter.toBigInt(mpxBalance.amount);

        if (!isEnough) throw new NotEnoughCoinsForCommissionError();

        break;
      }
    }
  }

  private validateMessageOrThrowError({ value }: CosmosMessage & { typeUrl: CosmosMessageType.DEPOSIT }) {
    const { depositor } = value;

    if (!isAccountAddress(depositor)) {
      throw new InvalidAddressError(depositor);
    }
  }
}

export default DepositCosmosService;

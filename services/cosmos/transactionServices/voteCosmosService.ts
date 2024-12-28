import { AccountData } from '@cosmjs/proto-signing';
import { StdFee } from '@cosmjs/stargate';
import { MxNumberFormatter } from '@xfi/formatters';

import {
  CosmosService,
  ICosmosTransactionService,
  InvalidAddressError,
  isAccountAddress,
  NotEnoughCoinsForCommissionError,
  performAsync,
} from '@/services';
import { CosmosCurrency, CosmosMessage, CosmosMessageType, TransactionResponse, VoteOptions } from '@/shared/types';

class VoteCosmosService implements ICosmosTransactionService<VoteOptions> {
  constructor(private readonly baseService: CosmosService) {}

  private getTxOptions({ proposalId, option, voter }: VoteOptions & { voter: string }) {
    const message: CosmosMessage = {
      typeUrl: CosmosMessageType.VOTE,
      value: {
        option,
        proposalId,
        voter,
      },
    };

    return message;
  }

  async calculateFee({ gasCurrency, option, proposalId }: VoteOptions): Promise<StdFee> {
    return performAsync(async () => {
      const { newWallet } = await this.baseService.getAccounts();
      const message = this.getTxOptions({ proposalId, option, voter: newWallet.address });

      this.validateMessageOrThrowError(message);

      const client = await this.baseService.getSigningStargateClient({ gasCurrency });
      const fee = await this.baseService.calculateFeeBase({
        client,
        accountData: newWallet,
        message,
        gasCurrency,
      });

      await this.checkEnoughCoinsOrThrowError({ wallet: newWallet, fee });

      return fee;
    });
  }

  async send(options: Omit<VoteOptions, 'voter'>): Promise<TransactionResponse> {
    return performAsync(async () => {
      const { proposalId, option, gasCurrency } = options;
      const { newWallet } = await this.baseService.getAccounts();
      const message = this.getTxOptions({ proposalId, option, voter: newWallet.address });

      this.validateMessageOrThrowError(message);

      const stdFee = await this.calculateFee({ proposalId, option, gasCurrency });

      await this.checkEnoughCoinsOrThrowError({ wallet: newWallet, fee: stdFee });

      const client = await this.baseService.getSigningStargateClient({ gasCurrency });
      const txHash = await client.signAndBroadcastSync(newWallet.address, [message], stdFee);

      return { txHash };
    });
  }

  async checkEnoughCoinsOrThrowError({ wallet, fee }: { wallet: AccountData; fee: StdFee }) {
    if (!fee) return;

    const { mpx: mpxBalance, xfi: xfiBalance } = await this.baseService.getBalanceByCoins(wallet.address);

    const { denom: feeDenom, amount: feeAmount } = fee.amount[0];

    this.baseService.validateCurrency(feeDenom);

    switch (feeDenom) {
      case CosmosCurrency.XFI: {
        const isEnough = MxNumberFormatter.toBigInt(feeAmount) <= MxNumberFormatter.toBigInt(xfiBalance.amount);

        if (!isEnough) throw new NotEnoughCoinsForCommissionError();

        break;
      }

      case CosmosCurrency.MPX: {
        const isEnough = MxNumberFormatter.toBigInt(feeAmount) <= MxNumberFormatter.toBigInt(mpxBalance.amount);

        if (!isEnough) throw new NotEnoughCoinsForCommissionError();

        break;
      }
    }
  }

  private validateMessageOrThrowError({ value }: CosmosMessage & { typeUrl: CosmosMessageType.VOTE }) {
    const { voter } = value;

    if (!isAccountAddress(voter)) {
      throw new InvalidAddressError(voter);
    }
  }
}

export default VoteCosmosService;

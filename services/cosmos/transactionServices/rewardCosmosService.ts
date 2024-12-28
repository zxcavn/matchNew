import { AccountData } from '@cosmjs/proto-signing';
import { StdFee } from '@cosmjs/stargate';
import { MxNumberFormatter } from '@xfi/formatters';

import { CosmosCurrency, CosmosMessage, CosmosMessageType, RewardOptions, TransactionResponse } from '@/shared/types';

import CosmosService from '../cosmosService';
import { InvalidAddressError, NotEnoughCoinsForCommissionError, performAsync } from '../errors';
import { isAccountAddress, isValidatorAddress } from '../helpers';
import { ICosmosTransactionService } from '../interfaces';

class RewardCosmosService implements ICosmosTransactionService<RewardOptions> {
  constructor(private readonly baseService: CosmosService) {}

  async calculateFee({ validatorAddress, gasCurrency, walletType }: RewardOptions): Promise<StdFee> {
    return performAsync(async () => {
      const accountData = await this.baseService.getAccountByWalletType(walletType);
      const message: CosmosMessage = {
        typeUrl: CosmosMessageType.REWARD,
        value: {
          delegatorAddress: accountData.address,
          validatorAddress,
        },
      };

      this.validateMessageOrThrowError(message);

      const client = await this.baseService.getSigningStargateClient({ gasCurrency });
      const fee = await this.baseService.calculateFeeBase({ client, accountData: accountData, message, gasCurrency });

      await this.checkEnoughCoinsOrThrowError({ wallet: accountData, fee });

      return fee;
    });
  }

  async send(options: RewardOptions): Promise<TransactionResponse> {
    return performAsync(async () => {
      const { validatorAddress, gasCurrency, walletType } = options;
      const accountData = await this.baseService.getAccountByWalletType(walletType);
      const delegatorAddress = accountData.address;
      const message: CosmosMessage = {
        typeUrl: CosmosMessageType.REWARD,
        value: {
          delegatorAddress,
          validatorAddress,
        },
      };

      this.validateMessageOrThrowError(message);
      const stdFee = await this.calculateFee(options);

      await this.checkEnoughCoinsOrThrowError({ wallet: accountData, fee: stdFee });

      const client = await this.baseService.getSigningStargateClient({ gasCurrency });
      const txHash = await client.signAndBroadcastSync(delegatorAddress, [message], stdFee);

      return { txHash };
    });
  }

  async checkEnoughCoinsOrThrowError({ wallet, fee }: { wallet: AccountData; fee: StdFee }) {
    const { denom: feeDenom, amount: feeAmount } = fee.amount[0];

    this.baseService.validateCurrency(feeDenom);

    const { xfi, mpx } = await this.baseService.getBalanceByCoins(wallet.address);
    const balance = feeDenom === CosmosCurrency.MPX ? mpx : xfi;
    const isEnough = MxNumberFormatter.toBigInt(feeAmount) < MxNumberFormatter.toBigInt(balance.amount);

    if (!isEnough) throw new NotEnoughCoinsForCommissionError();
  }

  private validateMessageOrThrowError({ value }: CosmosMessage & { typeUrl: CosmosMessageType.REWARD }) {
    const { delegatorAddress, validatorAddress } = value;

    if (!isAccountAddress(delegatorAddress)) {
      throw new InvalidAddressError(delegatorAddress);
    }

    if (!isValidatorAddress(validatorAddress)) {
      throw new InvalidAddressError(validatorAddress);
    }
  }
}

export default RewardCosmosService;

import {
  Coin,
  CosmosCurrency,
  CosmosMessage,
  CosmosMessageType,
  RedelegateOptions,
  TransactionResponse,
} from '@/shared/types';
import { AccountData } from '@cosmjs/proto-signing';
import { StdFee } from '@cosmjs/stargate';
import { MxNumberFormatter } from '@xfi/formatters';
import find from 'lodash/find';

import CosmosService from '../cosmosService';
import {
  DelegationIsNotExistError,
  InvalidAddressError,
  NotEnoughCoinsForCommissionError,
  performAsync,
  TooMuchDelegationAmountError,
} from '../errors';
import { isAccountAddress, isValidatorAddress } from '../helpers';
import { ICosmosTransactionService } from '../interfaces';

class RedelegateCosmosService implements ICosmosTransactionService<RedelegateOptions> {
  constructor(private readonly baseService: CosmosService) {}

  async calculateFee({
    validatorDstAddress,
    validatorSrcAddress,
    coin,
    gasCurrency,
    walletType,
  }: RedelegateOptions): Promise<StdFee> {
    return performAsync(async () => {
      const accountData = await this.baseService.getAccountByWalletType(walletType);
      const delegatorAddress = accountData.address;
      const message: CosmosMessage = {
        typeUrl: CosmosMessageType.REDELEGATE,
        value: {
          amount: coin,
          delegatorAddress,
          validatorDstAddress,
          validatorSrcAddress,
        },
      };

      this.validateMessageOrThrowError(message);
      await this.checkCorrectRedelegateOrThrowError({
        validatorSrcAddress,
        delegatorAddress,
        coin,
      });

      const client = await this.baseService.getSigningStargateClient({ gasCurrency });
      const fee = await this.baseService.calculateFeeBase({
        client,
        message,
        accountData: accountData,
        gasCurrency,
      });

      await this.checkEnoughCoinsOrThrowError({ wallet: accountData, fee });

      return fee;
    });
  }

  async send(options: RedelegateOptions): Promise<TransactionResponse> {
    return performAsync(async () => {
      const { coin, validatorDstAddress, validatorSrcAddress, gasCurrency, walletType } = options;
      const accountData = await this.baseService.getAccountByWalletType(walletType);
      const delegatorAddress = accountData.address;
      const message: CosmosMessage = {
        typeUrl: CosmosMessageType.REDELEGATE,
        value: {
          amount: coin,
          delegatorAddress,
          validatorDstAddress,
          validatorSrcAddress,
        },
      };

      this.validateMessageOrThrowError(message);
      await this.checkCorrectRedelegateOrThrowError({
        validatorSrcAddress,
        delegatorAddress,
        coin,
      });

      const stdFee = await this.calculateFee(options);

      await this.checkEnoughCoinsOrThrowError({ wallet: accountData, fee: stdFee });

      const client = await this.baseService.getSigningStargateClient({ gasCurrency });
      const txHash = await client.signAndBroadcastSync(delegatorAddress, [message], stdFee);

      return { txHash };
    });
  }

  private async checkCorrectRedelegateOrThrowError({
    validatorSrcAddress,
    delegatorAddress,
    coin,
  }: {
    validatorSrcAddress: string;
    delegatorAddress: string;
    coin: Coin;
  }) {


    const delegationInfo = find(
      () => validatorSrcAddress
    );

    if (!delegationInfo) {
      throw new DelegationIsNotExistError(validatorSrcAddress);
    }

    if (MxNumberFormatter.toBigInt(delegationInfo) < MxNumberFormatter.toBigInt(coin.amount)) {
      throw new TooMuchDelegationAmountError(coin.amount, delegationInfo);
    }
  }

  async checkEnoughCoinsOrThrowError({ wallet, fee }: { wallet: AccountData; fee: StdFee }) {
    const { denom: feeDenom, amount: feeAmount } = fee.amount[0];

    this.baseService.validateCurrency(feeDenom);

    const { xfi, mpx } = await this.baseService.getBalanceByCoins(wallet.address);
    const balance = feeDenom === CosmosCurrency.MPX ? mpx : xfi;
    const isEnough = MxNumberFormatter.toBigInt(feeAmount) < MxNumberFormatter.toBigInt(balance.amount);

    if (!isEnough) throw new NotEnoughCoinsForCommissionError();
  }

  private validateMessageOrThrowError({ value }: CosmosMessage & { typeUrl: CosmosMessageType.REDELEGATE }) {
    const { delegatorAddress, validatorDstAddress, validatorSrcAddress } = value;

    if (!isAccountAddress(delegatorAddress)) {
      throw new InvalidAddressError(delegatorAddress);
    }

    [validatorDstAddress, validatorSrcAddress].forEach(address => {
      if (!isValidatorAddress(address)) {
        throw new InvalidAddressError(address);
      }
    });
  }
}

export default RedelegateCosmosService;

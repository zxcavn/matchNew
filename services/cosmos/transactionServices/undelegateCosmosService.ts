import { AccountData } from '@cosmjs/proto-signing';
import { StdFee } from '@cosmjs/stargate';
import { MxNumberFormatter } from '@xfi/formatters';
import find from 'lodash/find';

import { xfiScanApi } from '@/crud';
import {
  Coin,
  CosmosCurrency,
  CosmosMessage,
  CosmosMessageType,
  TransactionResponse,
  UndelegateOptions,
  WalletType,
} from '@/shared/types';

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

class UndelegateCosmosService implements ICosmosTransactionService<UndelegateOptions> {
  constructor(private readonly baseService: CosmosService) {}

  async calculateFee({
    validatorAddress,
    coin,
    walletType = WalletType.NEW,
    gasCurrency,
  }: UndelegateOptions): Promise<StdFee> {
    return performAsync(async () => {
      const accountData = await this.baseService.getAccountByWalletType(walletType);
      const message: CosmosMessage = {
        typeUrl: CosmosMessageType.UNDELEGATE,
        value: {
          delegatorAddress: accountData.address,
          validatorAddress: validatorAddress,
          amount: coin,
        },
      };

      this.validateMessageOrThrowError(message);
      await this.checkCorrectDelegationOrThrowError({ validatorAddress, delegatorAddress: accountData.address, coin });

      const client = await this.baseService.getSigningStargateClient({ gasCurrency });
      const fee = await this.baseService.calculateFeeBase({ client, accountData, message, gasCurrency });

      await this.checkEnoughCoinsOrThrowError({ wallet: accountData, fee });

      return fee;
    });
  }

  async send(options: UndelegateOptions): Promise<TransactionResponse> {
    return performAsync(async () => {
      const { validatorAddress, coin, walletType = WalletType.NEW, gasCurrency } = options;
      const accountData = await this.baseService.getAccountByWalletType(walletType);
      const delegatorAddress = accountData.address;
      const message: CosmosMessage = {
        typeUrl: CosmosMessageType.UNDELEGATE,
        value: {
          delegatorAddress,
          validatorAddress,
          amount: coin,
        },
      };

      this.validateMessageOrThrowError(message);
      await this.checkCorrectDelegationOrThrowError({ validatorAddress, delegatorAddress, coin });

      const stdFee = await this.calculateFee(options);

      await this.checkEnoughCoinsOrThrowError({ wallet: accountData, fee: stdFee });

      const client = await this.baseService.getSigningStargateClient({ gasCurrency });
      const txHash = await client.signAndBroadcastSync(delegatorAddress, [message], stdFee);

      return { txHash };
    });
  }

  /**
   * @throws {DelegationIsNotExistError}
   * @throws {TooMuchDelegationAmountError}
   * @throws {InvalidAddressError}
   */
  private async checkCorrectDelegationOrThrowError({
    delegatorAddress,
    validatorAddress,
    coin,
  }: {
    delegatorAddress: string;
    validatorAddress: string;
    coin: Coin;
  }) {
    const { data: addressInfo } = await xfiScanApi.getAddressInfo(delegatorAddress, {
      withoutRewards: true,
    });

    const delegationInfo = find(
      addressInfo.delegations,
      ({ delegation }) => delegation.validator_address === validatorAddress
    );

    if (!delegationInfo) {
      throw new DelegationIsNotExistError(validatorAddress);
    }

    if (MxNumberFormatter.toBigInt(delegationInfo.balance.amount) < MxNumberFormatter.toBigInt(coin.amount)) {
      throw new TooMuchDelegationAmountError(coin.amount, delegationInfo.balance.amount);
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

  private validateMessageOrThrowError({ value }: CosmosMessage & { typeUrl: CosmosMessageType.UNDELEGATE }) {
    const { delegatorAddress, validatorAddress } = value;

    if (!isAccountAddress(delegatorAddress)) {
      throw new InvalidAddressError(delegatorAddress);
    }

    if (!isValidatorAddress(validatorAddress)) {
      throw new InvalidAddressError(validatorAddress);
    }
  }
}

export default UndelegateCosmosService;

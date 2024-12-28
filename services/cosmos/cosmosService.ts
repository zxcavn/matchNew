import { AccountData, OfflineDirectSigner } from '@cosmjs/proto-signing';
import {
  calculateFee,
  GasPrice,
  SigningStargateClient,
  SigningStargateClientOptions,
  StargateClient,
  StdFee,
} from '@cosmjs/stargate';
import { HttpBatchClient, Tendermint34Client } from '@cosmjs/tendermint-rpc';
import { retryAsync } from '@xfi/helpers';
import find from 'lodash/find';

import { COSMOS_RPC_URL, MPX_GAS_PRICE, XFI_GAS_PRICE } from '@/shared/constants';
import { CalculateFeeBaseOptions, Coin, CosmosCurrency, WalletType } from '@/shared/types';

import { DEFAULT_GAS_LIMIT_COEFFICIENT, HTTP_BATCH_CLIENT_OPTIONS } from './constants';
import registry from './defaultRegistry';
import { InvalidAddressError, throwTypedError } from './errors';
import { isAccountAddress } from './helpers/address';

class CosmosService {
  private static serviceInstance: CosmosService | null = null;

  private _signer: OfflineDirectSigner | null = null;

  private tmClient: Tendermint34Client | null = null;

  private get signer(): OfflineDirectSigner {
    if (this._signer) return this._signer;

    throw new Error('CosmosService: signer is not exist');
  }

  private constructor(signer: OfflineDirectSigner) {
    this._signer = signer;
  }

  static createInstance({ signer }: { signer: OfflineDirectSigner }): CosmosService {
    CosmosService.serviceInstance = new CosmosService(signer);

    return CosmosService.serviceInstance;
  }

  static getInstanceSafely(): CosmosService | null {
    try {
      return this.getInstance();
    } catch {
      return null;
    }
  }

  static getInstance(): CosmosService {
    if (CosmosService.serviceInstance) {
      return CosmosService.serviceInstance;
    }

    throw new Error('Call "createInstance" before using "getInstance"');
  }

  static destroyInstance() {
    if (CosmosService.serviceInstance) {
      CosmosService.serviceInstance.destroy();
      CosmosService.serviceInstance = null;
    }
  }

  private destroy() {
    this._signer = null;
    this.tmClient?.disconnect();
    this.tmClient = null;
  }

  private async getTendermint34Client(): Promise<Tendermint34Client> {
    if (!this.tmClient) {
      const httpBatchClient = new HttpBatchClient(COSMOS_RPC_URL, HTTP_BATCH_CLIENT_OPTIONS);

      this.tmClient = await Tendermint34Client.create(httpBatchClient);

      return this.tmClient;
    }

    return this.tmClient;
  }

  private async createSigningStargateClient({
    gasCurrency = CosmosCurrency.XFI,
  }: {
    gasCurrency?: CosmosCurrency;
  } = {}): Promise<SigningStargateClient> {
    const tmClient = await this.getTendermint34Client();

    return SigningStargateClient.createWithSigner(
      tmClient as unknown as Parameters<typeof SigningStargateClient.createWithSigner>[0],
      this.signer,
      this.getStargateClientOptions({ gasCurrency })
    );
  }

  async getBalances(address: string): Promise<Coin[]> {
    if (!isAccountAddress(address)) {
      throw new InvalidAddressError(address);
    }

    const client = await this.createSigningStargateClient();

    return this.getBalancesBase({ client, address });
  }

  async getBalanceByCoins(address: string): Promise<{ mpx: Coin; xfi: Coin }> {
    const balances = await this.getBalances(address);

    const mpx = this.getCoinFromBalance(CosmosCurrency.MPX, balances);
    const xfi = this.getCoinFromBalance(CosmosCurrency.XFI, balances);

    return {
      mpx,
      xfi,
    };
  }

  async getAccounts(): Promise<{ oldWallet: AccountData; newWallet: AccountData }> {
    const [oldWallet, newWallet] = await this.signer.getAccounts();

    return { oldWallet, newWallet };
  }

  async getAccountByWalletType(walletType: WalletType = WalletType.NEW): Promise<AccountData> {
    const { oldWallet, newWallet } = await this.getAccounts();

    return walletType === WalletType.OLD ? oldWallet : newWallet;
  }

  validateCurrency(currency: string): currency is CosmosCurrency {
    if (!(<Array<string>>[CosmosCurrency.XFI, CosmosCurrency.MPX]).includes(currency)) {
      throw new Error('Currency is not equal to CosmosCurrency');
    }

    return true;
  }

  getCoinFromBalance(currency: CosmosCurrency, balanceList: Coin[]): Coin {
    return (
      find(balanceList, ({ denom }) => denom === currency) || {
        amount: '0',
        denom: currency,
      }
    );
  }

  getStargateClientOptions({
    gasCurrency = CosmosCurrency.XFI,
  }: {
    gasCurrency?: CosmosCurrency;
  } = {}): SigningStargateClientOptions {
    const gasPrice = {
      [CosmosCurrency.MPX]: GasPrice.fromString(MPX_GAS_PRICE),
      [CosmosCurrency.XFI]: GasPrice.fromString(XFI_GAS_PRICE),
    }[gasCurrency];

    return {
      registry,
      gasPrice,
      broadcastTimeoutMs: 5000,
      broadcastPollIntervalMs: 1000,
    };
  }

  async getBalancesBase({ client, address }: { client: SigningStargateClient | StargateClient; address: string }) {
    const balances = (await client.getAllBalances(address)) as Coin[];

    if (!find(balances, ({ denom }) => denom === CosmosCurrency.XFI)) {
      balances.push({ denom: CosmosCurrency.XFI, amount: '0' });
    }

    if (!find(balances, ({ denom }) => denom === CosmosCurrency.MPX)) {
      balances.push({ denom: CosmosCurrency.MPX, amount: '0' });
    }

    return balances;
  }

  async calculateFeeBase({
    accountData,
    client,
    message,
    gasCurrency = CosmosCurrency.XFI,
    gasLimitCoefficient = DEFAULT_GAS_LIMIT_COEFFICIENT,
    memo,
  }: CalculateFeeBaseOptions): Promise<StdFee | never> {
    const RETRIES = 3;
    const RETRY_TIMEOUT = 500;

    try {
      const gasEstimate = await retryAsync(
        () => client.simulate(accountData.address, [message], memo),
        RETRIES,
        RETRY_TIMEOUT
      );
      const gasLimit = Math.round(gasEstimate * gasLimitCoefficient);
      const gasPrice = this.getStargateClientOptions({ gasCurrency }).gasPrice as GasPrice;

      return calculateFee(gasLimit, gasPrice);
    } catch (error) {
      console.error('calculateFeeBase', error);

      return throwTypedError(error as unknown as Error);
    }
  }

  async getSigningStargateClient({ gasCurrency }: { gasCurrency?: CosmosCurrency }): Promise<SigningStargateClient> {
    return this.createSigningStargateClient({ gasCurrency });
  }
}

export default CosmosService;

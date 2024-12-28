import {
  Contract,
  Interface,
  isAddress,
  isAddress as isHexAddress,
  Provider,
  Signer,
  TransactionResponse,
} from 'ethers';

import ERC20_ABI from './ERC20_ABI.json';
import ERC721_ABI from './ERC721-ABI.json';
import {
  InvalidAddressError,
  InvalidTokenIdOrMethodError,
  NotEnoughCoinsForCommissionError,
  NotEnoughCoinsForSendError,
  NotEnoughErc20TokensForSend,
} from './errors';
import { Erc20, Erc721, EstimatedFee, SendCoin } from './types';

class EthersService {
  private static instance: EthersService | null;

  private static erc20Interface = new Interface(ERC20_ABI);
  private static erc721Interface = new Interface(ERC721_ABI);

  private _provider: Provider | null;

  private get provider(): Provider {
    if (this._provider) return this._provider;

    throw new Error('Provider is not exist');
  }

  private _signer: Signer | null;

  get signer(): Signer {
    if (this._signer) return this._signer;

    throw new Error('EthersService: signer is not exist');
  }

  private constructor(signer: Signer, provider: Provider) {
    this._provider = provider;
    this._signer = signer.connect(this._provider);
  }

  static createInstance({ signer, provider }: { signer: Signer; provider: Provider }): EthersService {
    EthersService.instance = new EthersService(signer, provider);

    return EthersService.instance;
  }

  static getInstanceSafely(): EthersService | null {
    try {
      return this.getInstance();
    } catch {
      return null;
    }
  }

  static getInstance(): EthersService {
    if (EthersService.instance) {
      return EthersService.instance;
    }

    throw new Error('Call "createInstance" before using "getInstance"');
  }

  static destroyInstance() {
    if (EthersService.instance) {
      EthersService.instance.destroy();
      EthersService.instance = null;
    }
  }

  static isAddress(address: unknown): address is string {
    return isHexAddress(address);
  }

  private destroy() {
    this._signer = null;
  }

  private createContract(address: string): Contract {
    return new Contract(address, ERC20_ABI, this.signer);
  }

  async getErc20TokenInfo({ contractAddress }: { contractAddress: string }): Promise<Erc20.TokenInfo> {
    const contract = this.createContract(contractAddress);

    try {
      const [name, symbol, decimals] = await Promise.all([contract.name(), contract.symbol(), contract.decimals()]);

      return {
        name: String(name),
        symbol: String(symbol),
        decimals: Number(decimals),
        contractAddress,
      };
    } catch (error) {
      console.error(error);

      throw new Error('Invalid contract address');
    }
  }

  async balanceOfContract({ address }: { address: string }): Promise<string> {
    const contract = this.createContract(address);
    const walletAddress = await this.signer.getAddress();
    const balance = await contract.balanceOf(walletAddress);

    return String(balance) || '0';
  }

  async sendErc20Token({ contractAddress, recipientAddress, amount }: Erc20.SendOptions): Promise<TransactionResponse> {
    const { maxFeePerGas, maxPriorityFeePerGas } = await this.getSendErc20TokenFee({
      contractAddress,
      recipientAddress,
      amount,
    });

    const data = EthersService.erc20Interface.encodeFunctionData('transfer', [recipientAddress, amount]);

    return this.signer.sendTransaction({
      to: contractAddress,
      data,
      maxFeePerGas,
      maxPriorityFeePerGas,
    });
  }

  async sendCoin({ recipientAddress, amount }: SendCoin.SendOptions): Promise<TransactionResponse> {
    const { maxFeePerGas, maxPriorityFeePerGas } = await this.getSendCoinFee({ recipientAddress, amount });
    const signerAddress = await this.signer.getAddress();

    return this.signer.sendTransaction({
      to: recipientAddress,
      from: signerAddress,
      value: amount,
      maxFeePerGas,
      maxPriorityFeePerGas,
    });
  }

  /**
   * @throws {InvalidAddressError}
   * @throws {NotEnoughCoinsForSendError}
   * @throws {NotEnoughCoinsForCommissionError}
   */
  async getSendCoinFee({ recipientAddress, amount }: SendCoin.CalculateFeeOptions): Promise<EstimatedFee> {
    this.validateAddressOrThrowError(recipientAddress);
    const signerAddress = await this.signer.getAddress();
    const balance = await this.provider.getBalance(signerAddress);

    if (balance < BigInt(amount)) {
      throw new NotEnoughCoinsForSendError(balance.toString(), amount);
    }

    const { maxFeePerGas, maxPriorityFeePerGas } = await this.provider.getFeeData();

    if (!(maxFeePerGas && maxPriorityFeePerGas)) {
      throw new Error('Provider is connected to the legacy network');
    }

    const gasAmount = await this.signer.estimateGas({
      to: recipientAddress,
      from: signerAddress,
      value: amount,
      maxFeePerGas,
      maxPriorityFeePerGas,
    });
    const estimatedFee = BigInt(gasAmount * maxFeePerGas);

    if (balance < BigInt(amount) + estimatedFee) {
      throw new NotEnoughCoinsForCommissionError(balance.toString(), estimatedFee.toString());
    }

    return {
      amount: estimatedFee,
      maxFeePerGas,
      maxPriorityFeePerGas,
    };
  }

  /**
   * @throws {InvalidAddressError}
   * @throws {NotEnoughCoinsForCommissionError}
   * @throws {NotEnoughErc20TokensForSend}
   */
  async getSendErc20TokenFee({
    contractAddress,
    recipientAddress,
    amount,
  }: Erc20.CalculateFeeOptions): Promise<EstimatedFee> {
    this.validateAddressOrThrowError(contractAddress, recipientAddress);

    const signerAddress = await this.signer.getAddress();
    const balance = await this.provider.getBalance(signerAddress);
    const tokenAmount = await this.balanceOfContract({ address: contractAddress });

    if (BigInt(tokenAmount) < BigInt(amount)) {
      throw new NotEnoughErc20TokensForSend(tokenAmount, amount);
    }

    const data = EthersService.erc20Interface.encodeFunctionData('transfer', [recipientAddress, amount]);
    const { maxFeePerGas, maxPriorityFeePerGas } = await this.provider.getFeeData();

    if (!(maxFeePerGas && maxPriorityFeePerGas)) {
      throw new Error('Provider is connected to the legacy network');
    }

    const gasAmount = await this.signer.estimateGas({
      data,
      to: contractAddress,
      maxFeePerGas,
      maxPriorityFeePerGas,
    });

    const estimatedFee = BigInt(gasAmount * maxFeePerGas);

    if (balance < estimatedFee) {
      throw new NotEnoughCoinsForCommissionError(balance.toString(), estimatedFee.toString());
    }

    return {
      amount: estimatedFee,
      maxFeePerGas,
      maxPriorityFeePerGas,
    };
  }

  /**
   * @throws {InvalidAddressError}
   * @throws {NotEnoughCoinsForCommissionError}
   */
  async getSendErc721TokenFee({
    contractAddress,
    recipientAddress,
    tokenId,
  }: Erc721.CalculateFeeOptions): Promise<EstimatedFee> {
    this.validateAddressOrThrowError(contractAddress, recipientAddress);

    const signerAddress = await this.signer.getAddress();

    const balance = await this.provider.getBalance(signerAddress);

    const data = EthersService.erc721Interface.encodeFunctionData(
      'safeTransferFrom(address from, address to, uint256 tokenId)',
      [signerAddress, recipientAddress, BigInt(tokenId)]
    );

    const { maxFeePerGas, maxPriorityFeePerGas } = await this.provider.getFeeData();

    if (!(maxFeePerGas && maxPriorityFeePerGas)) {
      throw new Error('Provider is connected to the legacy network');
    }

    const gasAmount = await this.signer.estimateGas({
      data,
      to: contractAddress,
      maxFeePerGas,
      maxPriorityFeePerGas,
    });

    const estimatedFee = BigInt(gasAmount * maxFeePerGas);

    if (balance < estimatedFee) {
      throw new NotEnoughCoinsForCommissionError(balance.toString(), estimatedFee.toString());
    }

    return {
      amount: estimatedFee,
      maxFeePerGas,
      maxPriorityFeePerGas,
    };
  }

  private validateAddressOrThrowError(...addresses: string[]) {
    addresses.forEach(address => {
      if (!isAddress(address)) {
        throw new InvalidAddressError(address);
      }
    });
  }

  private createERC721Contract(contractAddress: string): Contract {
    return new Contract(contractAddress, ERC721_ABI, this.provider);
  }

  async getErc721TokenInfo({
    contractAddress,
  }: {
    contractAddress: string;
  }): Promise<Promise<Erc721.TokenInfo> | null> {
    const contract = this.createERC721Contract(contractAddress);

    try {
      const [name, symbol] = await Promise.all([contract.name(), contract.symbol()]);

      return {
        name: String(name),
        symbol: String(symbol),
        contractAddress,
      };
    } catch (error) {
      console.error(error);

      throw new Error(`getErc721TokenInfo error. Address ${contractAddress}`);
    }
  }

  async isOwnerOfErc721Token({
    contractAddress,
    tokenId,
    ownerAddress,
  }: {
    contractAddress: string;
    tokenId: string;
    ownerAddress: string;
  }): Promise<boolean> {
    const contract = this.createERC721Contract(contractAddress);

    try {
      const owner = await contract.ownerOf(BigInt(tokenId));

      return owner.toLowerCase() === ownerAddress.toLowerCase();
    } catch (error) {
      console.error(error);

      throw new InvalidTokenIdOrMethodError(contractAddress, tokenId);
    }
  }

  async getTokenURI(contractAddress: string, tokenId: string): Promise<string | undefined> {
    try {
      const contract = this.createERC721Contract(contractAddress);

      return await contract.tokenURI(tokenId);
    } catch (error) {
      console.error('Error fetching token URI:', error);
    }
  }

  async sendErc721Token({
    contractAddress,
    recipientAddress,
    tokenId,
  }: Erc721.SendOptions): Promise<TransactionResponse> {
    const { maxFeePerGas, maxPriorityFeePerGas } = await this.getSendErc721TokenFee({
      contractAddress,
      recipientAddress,
      tokenId,
    });

    const senderAddress = await this.signer.getAddress();

    const data = EthersService.erc721Interface.encodeFunctionData(
      'safeTransferFrom(address from, address to, uint256 tokenId)',
      [senderAddress, recipientAddress, tokenId]
    );

    return this.signer.sendTransaction({
      to: contractAddress,
      data,
      maxFeePerGas,
      maxPriorityFeePerGas,
    });
  }
}

export default EthersService;

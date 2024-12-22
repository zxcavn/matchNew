import { type Keplr, EthSignType } from '@keplr-wallet/types';
import { mxToHexAddress } from '@xfi/formatters';
import { hexlify } from '@xfi/helpers';
import {
  AbstractSigner,
  Provider,
  Signature,
  Signer,
  Transaction,
  TransactionRequest,
  TypedDataDomain,
  TypedDataField,
} from 'ethers';

class EthereumKeplrSigner extends AbstractSigner implements Signer {
  constructor(provider: Provider | null, private readonly keplr: Keplr, private readonly chainId: string) {
    super(provider);
  }

  connect(provider: Provider): Signer {
    return new EthereumKeplrSigner(provider, this.keplr, this.chainId);
  }

  async getAddress(): Promise<string> {
    const key = await this.keplr.getKey(this.chainId);

    return mxToHexAddress(key.bech32Address);
  }

  async signTransaction(tx: TransactionRequest): Promise<string> {
    const populatedTx = await this.populateTransaction(tx);

    const rawSignature = await this.keplr.signEthereum(
      this.chainId,
      await this.getAddress(),
      this.stringify(populatedTx),
      EthSignType.TRANSACTION
    );

    populatedTx.signature = Signature.from(hexlify(rawSignature));

    return Transaction.from(populatedTx).serialized;
  }

  async signMessage(message: string | Uint8Array): Promise<string> {
    const rawSignature = await this.keplr.signEthereum(
      this.chainId,
      await this.getAddress(),
      message,
      EthSignType.MESSAGE
    );

    return hexlify(rawSignature);
  }

  // TODO: Implement this method
  async signTypedData(
    _domain: TypedDataDomain,
    _types: Record<string, TypedDataField[]>,
    _value: Record<string, unknown>
  ): Promise<string> {
    throw new Error('Method not implemented.');
  }

  private stringify<T extends object>(entry: T): string {
    return JSON.stringify(
      Object.fromEntries(
        Object.entries(entry).map(([key, value]) =>
          typeof value === 'bigint' ? [key, value.toString()] : [key, value]
        )
      )
    );
  }
}

export default EthereumKeplrSigner;

import type { AccountData, Algo, DirectSignResponse, OfflineDirectSigner } from '@cosmjs/proto-signing';
import type { Keplr } from '@keplr-wallet/types';

type SignDoc = DirectSignResponse['signed'];

class KeplrCosmosSigner implements OfflineDirectSigner {
  constructor(private readonly keprl: Keplr, private readonly chainId: string) {}

  async getAccounts(): Promise<readonly AccountData[]> {
    try {
      const key = await this.keprl.getKey(this.chainId);

      const addressData: AccountData = {
        address: key.bech32Address,
        algo: <Algo>key.algo,
        pubkey: key.pubKey,
      };

      return [addressData, addressData];
    } catch (e) {
      console.error('KeplrCosmosSigner: getAccounts', e);

      throw e;
    }
  }

  async signDirect(signerAddress: string, signDoc: SignDoc): Promise<DirectSignResponse> {
    const signer = await this.getOfflineSigner();

    return signer.signDirect(signerAddress, signDoc);
  }

  private async getOfflineSigner(): Promise<OfflineDirectSigner> {
    return this.keprl.getOfflineSigner(this.chainId);
  }
}

export default KeplrCosmosSigner;

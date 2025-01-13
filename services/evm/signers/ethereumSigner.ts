import { HDNodeWallet, Signer } from 'ethers';

class EthereumSigner {
  static createFromMnemonic(mnemonic: string): Signer {
    return HDNodeWallet.fromPhrase(mnemonic);
  }
}

export default EthereumSigner;

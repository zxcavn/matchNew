import { type OfflineDirectSigner, DirectSecp256k1HdWallet } from '@cosmjs/proto-signing';

import { HD_PATHS } from '../constants';
import { ADDRESS_PREFIX } from '../helpers/address';

class CosmosSigner {
  static async createFromMnemonic(mnemonic: string): Promise<OfflineDirectSigner> {
    const options = {
      prefix: ADDRESS_PREFIX,
      hdPaths: HD_PATHS,
    };

    return await DirectSecp256k1HdWallet.fromMnemonic(mnemonic, options);
  }
}

export default CosmosSigner;

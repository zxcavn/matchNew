import { generateMnemonic, validateMnemonic } from 'bip39';

class Bip39Service {
  static generate() {
    return generateMnemonic(160);
  }
  static isValid(mnemonic: string) {
    return validateMnemonic(mnemonic);
  }
}

export default Bip39Service;

import { LOCAL_STORAGE_FIELDS, LocalStorageFieldsKeys } from '@/shared/constants/localStorageFields';
import { SECRET_KEY } from '@/shared/constants/variables';
import type { AutoLockData } from '@/store/app/types';
import { createHash, decryptHash } from '@xfi/helpers';

class LocalStorageBaseService {
  static get<T = string>(key: LocalStorageFieldsKeys): T | null {
    try {
      const storageValue = localStorage.getItem(key);

      return storageValue && JSON.parse(storageValue);
    } catch {
      return null;
    }
  }

  static set<T = string>(key: LocalStorageFieldsKeys, value: T): void {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('LocalStorageBaseService error:', error);
    }
  }

  static remove(key: LocalStorageFieldsKeys): void {
    localStorage.removeItem(key);
  }
}

class MnemonicStorageService extends LocalStorageBaseService {
  static getMnemonic(): string {
    try {
      const mnemonic = super.get(LOCAL_STORAGE_FIELDS.mnemonic);

      if (!mnemonic) return '';

      return decryptHash(SECRET_KEY, mnemonic);
    } catch (e) {
      return '';
    }
  }

  static setMnemonic(mnemonic: string) {
    try {
      const value = createHash(SECRET_KEY, mnemonic);

      super.set(LOCAL_STORAGE_FIELDS.mnemonic, value);
    } catch (e) {
      return void 1;
    }
  }
}

export class LocalStorageService extends LocalStorageBaseService {
  static getMnemonic(): string {
    return MnemonicStorageService.getMnemonic();
  }

  static setMnemonic(value: string) {
    MnemonicStorageService.setMnemonic(value);
  }

  static setAutoLockData(autoLock: AutoLockData) {
    super.set(LOCAL_STORAGE_FIELDS.autoLockData, autoLock);
  }

  static getAutoLockData(): AutoLockData {
    return (
      super.get<AutoLockData>(LOCAL_STORAGE_FIELDS.autoLockData) || {
        expiresIn: 0,
        timer: 0,
      }
    );
  }

  static setAutoDetectToken(value: boolean) {
    super.set(LOCAL_STORAGE_FIELDS.autoDetectToken, value);
  }
  static setAutoDetectNft(value: boolean) {
    super.set(LOCAL_STORAGE_FIELDS.autoDetectNft, value);
  }

  static getAutoDetectToken(): boolean {
    return super.get(LOCAL_STORAGE_FIELDS.autoDetectToken) || false;
  }
  static getAutoDetectNft(): boolean {
    const value = super.get(LOCAL_STORAGE_FIELDS.autoDetectNft);

    return value !== null && value !== undefined ? !!value : true;
  }

  static getAppPassword(): string {
    return super.get(LOCAL_STORAGE_FIELDS.appPassword) || '';
  }

  static setAppPassword(password: string): void {
    super.set(LOCAL_STORAGE_FIELDS.appPassword, password);
  }

  static getLocale(): string {
    return super.get(LOCAL_STORAGE_FIELDS.i18n) || '';
  }

  static setLocale(value: string): void {
    super.set(LOCAL_STORAGE_FIELDS.i18n, value);
  }


  static removeTokens(): void {
    super.remove(LOCAL_STORAGE_FIELDS.a_t);
    super.remove(LOCAL_STORAGE_FIELDS.r_t);
  }

}

export class NftStorageService extends LocalStorageBaseService {
  static getAll(ownerAddress: string): [] {
    const storageData = this.get<{ [key: string]: [] }>(LOCAL_STORAGE_FIELDS.nftInventory);

    return storageData?.[ownerAddress.toLowerCase()] || [];
  }

  static getToken(ownerAddress: string, contractAddress: string, tokenId: string): | undefined {
    const items = this.getAll(ownerAddress.toLowerCase());

  }

  static setAll(ownerAddress: string, items: []): void {
    const storageData = this.get<{ [key: string]: [] }>(LOCAL_STORAGE_FIELDS.nftInventory) || {};

    storageData[ownerAddress.toLowerCase()] = items;
    this.set(LOCAL_STORAGE_FIELDS.nftInventory, storageData);
  }

  static syncItems(ownerAddress: string, newItems: []): void {
    const normalizedOwnerAddress = ownerAddress.toLowerCase();
    const existingItems = this.getAll(normalizedOwnerAddress);

    const newItemsMap = new Map(newItems.map(item => [`${item}`, item]));

    const updatedItems = existingItems.filter(existingItem => {

      return false;
    });

    newItemsMap.forEach(newItem => {
      updatedItems.push(newItem);
    });

    this;
  }

  static removeItem(ownerAddress: string, contractAddress: string, tokenId: string): void {
    const items = this.getAll(ownerAddress.toLowerCase());
    const filteredItems = items.filter(item => !(item === contractAddress && item === tokenId));

    this.setAll;
  }

  static setItem({
    ownerAddress,
    contractAddress,
    tokenId,
    image,
    tokenName,
  }: {
    ownerAddress: string;
    contractAddress: string;
    tokenId: string;
    image?: string;
    tokenName?: string;
  }): void {
    const owner = ownerAddress.toLowerCase();
    const items = this.getAll(owner);
    const exists = items.some(
      existingItem => existingItem === contractAddress && existingItem === tokenId
    );

    if (!exists) {
      this.setAll(ownerAddress, items);
    }
  }
}

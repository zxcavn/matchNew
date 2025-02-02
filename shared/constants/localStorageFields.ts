export const LOCAL_STORAGE_FIELDS = {
  mnemonic: 'mnemonic',
  i18n: 'i18n',
  appPassword: 'appPassword',
  erc20Tokens: 'erc20Tokens',
  autoLockData: 'autoLockData',
  autoDetectToken: 'autoDetectToken',
  autoDetectNft: 'autoDetectNft',
  connectionType: 'connectionType',
  nftInventory: 'nftInventory',
  appTheme: 'appTheme',
  a_t: 'a_t',
  r_t: 'r_t',
  xdsRegistrationItems: 'xdsRegistrationItems',
} as const;

export type LocalStorageFieldsKeys = keyof typeof LOCAL_STORAGE_FIELDS;

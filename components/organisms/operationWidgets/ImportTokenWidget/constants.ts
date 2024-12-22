export enum TabType {
  search = 'search',
  user = 'user',
}

export const IMPORT_TOKEN_TABS: Array<{ value: TabType; label: string }> = [
  { value: TabType.search, label: 'TOKENS.SEARCH' },
  { value: TabType.user, label: 'TOKENS.USER_TOKEN' },
];

export const PREFIX = 'PROFILE';

export const enum FaucetFetchMethod {
  getLinkAsync = `${PREFIX}/getLinkAsync`,
  checkAuthAsync = `${PREFIX}/checkAuthAsync`,
  claimCoinAsync = `${PREFIX}/claimCoinAsync`,
}

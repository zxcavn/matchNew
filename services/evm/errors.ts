export abstract class EthersServiceError extends Error {}

export class InvalidAddressError extends EthersServiceError {
  constructor(address: unknown) {
    super(`Invalid address ${address}`);
  }
}

export class NotEnoughCoinsForCommissionError extends EthersServiceError {
  constructor(balance: string, commission: string) {
    super(`Not enough coins for commission. Balance: ${balance}. Expected commission amount: ${commission}`);
  }
}

export class NotEnoughErc20TokensForSend extends EthersServiceError {
  constructor(balance: string, actual: string) {
    super(`Not enough tokens. Balance: ${balance}. Actual: ${actual}`);
  }
}

export class NotEnoughCoinsForSendError extends EthersServiceError {
  constructor(balance: string, actual: string) {
    super(`Not enough coins. Balance: ${balance}. Actual: ${actual}`);
  }
}

export class InvalidTokenIdOrMethodError extends EthersServiceError {
  constructor(address: string, tokenId: string) {
    super(`Invalid tokenId or method not supported. Address: ${address}. Token ID: ${tokenId}`);
  }
}

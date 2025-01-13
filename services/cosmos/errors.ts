export abstract class CosmosServiceError extends Error {}

export class InvalidAddressError extends CosmosServiceError {
  constructor(public readonly address: string) {
    super(`Cosmos address is not valid: ${address}`);
  }
}

export class InsufficientBalanceError extends CosmosServiceError {
  constructor() {
    super('Insufficient funds on the balance');
  }
}

export class NotEnoughCoinsForCommissionError extends CosmosServiceError {
  constructor() {
    super('Not enough coins for commission');
  }
}

export class DelegationIsNotExistError extends CosmosServiceError {
  constructor(public readonly validatorAddress: string) {
    super(`Delegation is not exist in validator ${validatorAddress}`);
  }
}

export class TooMuchDelegationAmountError extends CosmosServiceError {
  constructor(undelegateAmount: string, delegationAmount: string) {
    super(`Try undelegate too much amount. Amount: ${undelegateAmount}, available amount: ${delegationAmount} `);
  }
}

export class RedelegationInProgressError extends CosmosServiceError {
  constructor(message: string) {
    super(message);
  }
}

export class ValidatorDoesNotExistError extends CosmosServiceError {
  constructor(message: string) {
    super(message);
  }
}

export class AccountSequenceMismatchError extends CosmosServiceError {
  constructor(message: string) {
    super(message);
  }
}

const REDELEGATION_IN_PROGRESS = 'redelegation to this validator already in progress';
const VALIDATOR_DOES_NOT_EXIST = 'validator does not exist';
const ACCOUNT_SEQUENCE_MISMATCH = 'account sequence mismatch';

export const throwTypedError = (error: unknown): never => {
  if (error instanceof CosmosServiceError) {
    throw error;
  }

  if (!(error instanceof Error)) {
    throw error;
  }

  const message = error.message;

  if (message.match(REDELEGATION_IN_PROGRESS)) {
    throw new RedelegationInProgressError(message);
  }

  if (message.match(VALIDATOR_DOES_NOT_EXIST)) {
    throw new ValidatorDoesNotExistError(message);
  }

  if (message.match(ACCOUNT_SEQUENCE_MISMATCH)) {
    throw new AccountSequenceMismatchError(message);
  }

  throw error;
};

export const performAsync = async <R>(fn: () => Promise<R>): Promise<R> => {
  try {
    return await fn();
  } catch (error) {
    throwTypedError(error);

    throw error;
  }
};

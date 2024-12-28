import { isCallException } from 'ethers';

export abstract class EthRegistrarControllerError extends Error {}

/**
 * error CommitmentTooNew(bytes32 commitment)
 */
export class CommitmentTooNewError extends EthRegistrarControllerError {
  constructor(public readonly commitment: string) {
    super();
  }
}

/**
 * error CommitmentTooOld(bytes32 commitment);
 */
export class CommitmentTooOldError extends EthRegistrarControllerError {
  constructor(public readonly commitment: string) {
    super();
  }
}

/**
 * error NameNotAvailable(string name);
 */
export class NameNotAvailableError extends EthRegistrarControllerError {
  constructor(public readonly notAvailableName: string) {
    super();
  }
}

/**
 * error DurationTooShort(uint256 duration);
 */
export class DurationTooShortError extends EthRegistrarControllerError {
  constructor(public readonly duration: number) {
    super();
  }
}

// error UnexpiredCommitmentExists(bytes32 commitment);
export class UnexpiredCommitmentExistsError extends EthRegistrarControllerError {
  constructor(public readonly commitment: string) {
    super();
  }
}

/**
 * error InsufficientValue();
 */
export class InsufficientValueError extends EthRegistrarControllerError {}

const revertErrors = {
  ['CommitmentTooNew']: CommitmentTooNewError,
  ['CommitmentTooOld']: CommitmentTooOldError,
  ['NameNotAvailable']: NameNotAvailableError,
  ['DurationTooShort']: DurationTooShortError,
  ['UnexpiredCommitmentExists']: UnexpiredCommitmentExistsError,
  ['InsufficientValue']: InsufficientValueError,
};

function getTypedError(error: unknown) {
  if (!isCallException(error)) {
    throw error;
  }

  const revertName = error.revert?.name || '';
  const args = error.revert?.args || [];
  const TypedError = revertErrors[revertName as keyof typeof revertErrors];

  if (!TypedError) {
    throw error;
  }

  return new (TypedError as any)(...args);
}

export const performAsyncOrThrowError = async <T>(func: () => Promise<T>): Promise<T> => {
  try {
    return await func();
  } catch (error) {
    throw getTypedError(error);
  }
};

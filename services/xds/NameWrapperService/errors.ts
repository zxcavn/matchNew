import { isCallException } from 'ethers';

export abstract class NameWrapperError extends Error {}

/**
 * error IncorrectTargetOwner(address owner)
 */
export class IncorrectTargetOwnerError extends NameWrapperError {
  constructor(public readonly address: string) {
    super();
  }
}

/**
 * error NameIsStillExpired()
 */
export class NameIsStillExpiredError extends NameWrapperError {
  constructor() {
    super();
  }
}

/**
 * Revert error by `require(false, "ERC1155: insufficient balance for transfer")` contract function
 */
export class OwnershipRightError extends NameWrapperError {}

const REVERT_ERRORS = {
  ['IncorrectTargetOwner']: IncorrectTargetOwnerError,
  ['NameIsStillExpired']: NameIsStillExpiredError,
};

const REQUIRE_FUNCTION_ERRORS: Record<string, typeof OwnershipRightError> = {
  'ERC1155: insufficient balance for transfer': OwnershipRightError,
};

function getTypedError(error: unknown) {
  if (!isCallException(error)) {
    throw error;
  }

  const revertName = error.revert?.name || '';
  const args = error.revert?.args || [];
  const TypedError = REVERT_ERRORS[revertName as keyof typeof REVERT_ERRORS];

  if (TypedError) {
    return new (TypedError as any)(...args);
  }

  if (error.reason && !!REQUIRE_FUNCTION_ERRORS[error.reason]) {
    return new REQUIRE_FUNCTION_ERRORS[error.reason]();
  }

  throw error;
}

export const performAsyncOrThrowError = async <T>(func: () => Promise<T>): Promise<T> => {
  try {
    return await func();
  } catch (error) {
    throw getTypedError(error);
  }
};

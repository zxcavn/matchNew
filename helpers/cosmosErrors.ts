import {
  AccountSequenceMismatchError,
  InsufficientBalanceError,
  NotEnoughCoinsForCommissionError,
  RedelegationInProgressError,
  TooMuchDelegationAmountError,
  ValidatorDoesNotExistError,
} from '@/services';

import { isExtensionActionRejectedError } from './common';

/**
 * @returns {FormattedMessageId | undefined}
 */
export const getErrorMessage = (error: unknown): string | undefined => {
  if (error instanceof InsufficientBalanceError) {
    return 'ERRORS.INSUFFICIENT_BALANCE';
  }

  if (error instanceof TooMuchDelegationAmountError) {
    return 'ERRORS.TOO_MUCH_DELEGATION_AMOUNT';
  }

  if (error instanceof RedelegationInProgressError) {
    return 'ERRORS.REDELEGATION_IN_PROGRESS';
  }

  if (error instanceof NotEnoughCoinsForCommissionError) {
    return 'ERRORS.NOT_ENOUGH_FOR_COMMISSION';
  }

  if (error instanceof ValidatorDoesNotExistError) {
    return 'ERRORS.VALIDATOR_DOES_NOT_EXIST';
  }

  if (error instanceof AccountSequenceMismatchError) {
    return 'ERRORS.WAIT_PREVIOUS_TX_COMPLETES';
  }

  if (isExtensionActionRejectedError(error)) {
    return 'ERRORS.KEPLR_REQUEST_HAS_BEEN_REJECTED';
  }
};

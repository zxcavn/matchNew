import { CallExceptionError, isCallException, isError } from 'ethers';

import {
  EthersServiceError,
  InvalidAddressError,
  NotEnoughCoinsForCommissionError,
  NotEnoughCoinsForSendError,
  NotEnoughErc20TokensForSend,
} from '@/services/evm';
import {
  CommitmentTooNewError,
  CommitmentTooOldError,
  DurationTooShortError,
  EthRegistrarControllerError,
  InsufficientValueError,
  NameNotAvailableError,
  UnexpiredCommitmentExistsError,
} from '@/services/xds/EthRegistrarControllerService';
import { NameWrapperError, OwnershipRightError } from '@/services/xds/NameWrapperService';


export type FeeError = {
  /** @type {FormattedMessageId} */
  commission?: string;
  /** @type {FormattedMessageId} */
  amount?: string;
  /** @type {FormattedMessageId} */
  wallet?: string;
};

export const getFeeErrorMessage = (error: unknown): FeeError => {
  if (error instanceof InvalidAddressError) {
    return { wallet: 'ERRORS.INCORRECT_WALLET_ADDRESS' };
  }

  if (error instanceof NotEnoughCoinsForCommissionError) {
    return { commission: 'ERRORS.INSUFFICIENT_BALANCE' };
  }

  if (error instanceof NotEnoughErc20TokensForSend || error instanceof NotEnoughCoinsForSendError) {
    return { amount: 'ERRORS.INSUFFICIENT_BALANCE' };
  }

  if (isUnknownContractRevertError(error)) {
    return { wallet: 'ERRORS.CHECK_THAT_THE_ENTERED_ADDRESS_IS_CORRECT' };
  }

  return { commission: 'ERRORS.GET_COMMISSION_ERROR' };
};

export const getTxErrorMessage = (error: unknown): string => {
  if (error instanceof InvalidAddressError) {
    return 'ERRORS.INCORRECT_WALLET_ADDRESS';
  }

  if (
    error instanceof NotEnoughCoinsForCommissionError ||
    error instanceof NotEnoughCoinsForSendError ||
    error instanceof NotEnoughErc20TokensForSend
  ) {
    return 'ERRORS.INSUFFICIENT_BALANCE';
  }

  return 'ERRORS.TRANSACTION_ERROR';
};

export const mapXdsErrorMessage = (error: unknown): string => {
  if (error instanceof CommitmentTooNewError) {
    return 'ERRORS.XDS.COMMITMENT_TOO_NEW';
  }

  if (error instanceof CommitmentTooOldError) {
    return 'ERRORS.XDS.COMMITMENT_TOO_OLD';
  }

  if (error instanceof DurationTooShortError) {
    return 'ERRORS.XDS.DURATION_TOO_SHORT';
  }

  if (error instanceof InsufficientValueError) {
    return 'ERRORS.XDS.INSUFFICIENT_VALUE';
  }

  if (error instanceof NameNotAvailableError) {
    return 'ERRORS.XDS.NAME_NOT_AVAILABLE';
  }

  if (error instanceof UnexpiredCommitmentExistsError) {
    return 'ERRORS.XDS.UNEXPIRED_COMMITMENT_EXISTS';
  }

  if (error instanceof OwnershipRightError) {
    return 'ERRORS.XDS.THERE_IS_NO_OWNERSHIP_RIGHT_FOR_THIS_NAME';
  }

  if (isError(error, 'INSUFFICIENT_FUNDS')) {
    return 'ERRORS.INSUFFICIENT_FUNDS_ON_THE_BALANCE';
  }

  return 'ERRORS.UNEXPECTED_ERROR';
};

/**
 * @see https://docs.ethers.org/v5/troubleshooting/errors/#error-codes--help-CALL_EXCEPTION--common-causes
 */
export const isUnknownContractRevertError = (error: unknown): error is CallExceptionError => {
  if (!isCallException(error) || !error.info) {
    return false;
  }

  const CONTRACT_REVERT_MESSAGE = 'rpc error: code = Unknown desc = execution reverted';
  const message = (error.info as any)?.error?.message;

  return message === CONTRACT_REVERT_MESSAGE;
};

/**
 * This error occurs when contract revert error is unknown and transaction data is empty
 */
export const isSendNativeCoinsToContractError = (error: unknown): boolean => {
  const EMPTY_TX_DATA = '0x';

  return isUnknownContractRevertError(error) && error.transaction.data === EMPTY_TX_DATA;
};

export const isHandledEvmError = (error: unknown): boolean => {
  return (
    error instanceof EthRegistrarControllerError ||
    error instanceof NameWrapperError ||
    error instanceof EthersServiceError ||
    isError(error, 'INSUFFICIENT_FUNDS') || 
    isUnknownContractRevertError(error)
  );
};

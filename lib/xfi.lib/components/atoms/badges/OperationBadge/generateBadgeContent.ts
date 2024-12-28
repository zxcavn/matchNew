import { Theme } from '@mui/material';

import type { TxOperationType } from '../../../../helpers';

export const generateBadgeContent = (type: TxOperationType, theme: Theme) => {
  const badgeColors: Record<TxOperationType, { color: string; backgroundColor: string; text: string }> = {
    send: {
      color: theme.palette.badges.send.color,
      backgroundColor: theme.palette.badges.send.background,
      text: 'LIB.OPERATIONS.SEND',
    },
    sendIn: {
      color: theme.palette.badges.send.color,
      backgroundColor: theme.palette.badges.send.background,
      text: 'LIB.OPERATIONS.SEND_IN',
    },
    sendOut: {
      color: theme.palette.badges.send.color,
      backgroundColor: theme.palette.badges.send.background,
      text: 'LIB.OPERATIONS.SEND_OUT',
    },
    bond: {
      color: theme.palette.badges.bond.color,
      backgroundColor: theme.palette.badges.bond.background,
      text: 'LIB.OPERATIONS.BOND',
    },
    unbond: {
      color: theme.palette.badges.unbond.color,
      backgroundColor: theme.palette.badges.unbond.background,
      text: 'LIB.OPERATIONS.UNBOND',
    },
    claim: {
      color: theme.palette.badges.claim.color,
      backgroundColor: theme.palette.badges.claim.background,
      text: 'LIB.OPERATIONS.CLAIM',
    },
    receive: {
      color: theme.palette.badges.receive.color,
      backgroundColor: theme.palette.badges.receive.background,
      text: 'LIB.OPERATIONS.RECEIVE',
    },
    rebond: {
      color: theme.palette.badges.rebond.color,
      backgroundColor: theme.palette.badges.rebond.background,
      text: 'LIB.OPERATIONS.REBOND',
    },
    fail: {
      color: theme.palette.badges.fail.color,
      backgroundColor: theme.palette.badges.fail.background,
      text: 'LIB.OPERATIONS.FAIL',
    },
    multisend: {
      color: theme.palette.badges.multisend.color,
      backgroundColor: theme.palette.badges.multisend.background,
      text: 'LIB.OPERATIONS.MULTISEND',
    },
    other: {
      color: theme.palette.badges.other.color,
      backgroundColor: theme.palette.badges.other.background,
      text: 'LIB.OPERATIONS.OTHER',
    },
    evm: {
      color: theme.palette.badges.evm.color,
      backgroundColor: theme.palette.badges.evm.background,
      text: 'LIB.OPERATIONS.EVM',
    },
    contractCall: {
      color: theme.palette.badges.contractCall.color,
      backgroundColor: theme.palette.badges.contractCall.background,
      text: 'LIB.OPERATIONS.CONTRACT_CALL',
    },
    createValidator: {
      color: theme.palette.badges.createValidator.color,
      backgroundColor: theme.palette.badges.createValidator.background,
      text: 'LIB.OPERATIONS.CREATE_VALIDATOR',
    },
    unjail: {
      color: theme.palette.badges.unjail.color,
      backgroundColor: theme.palette.badges.unjail.background,
      text: 'LIB.OPERATIONS.UNJAIL',
    },
    submitProposal: {
      color: theme.palette.badges.submitProposal.color,
      backgroundColor: theme.palette.badges.submitProposal.background,
      text: 'LIB.OPERATIONS.SUBMIT_PROPOSAL',
    },
    vote: {
      color: theme.palette.badges.claim.color,
      backgroundColor: theme.palette.badges.claim.background,
      text: 'LIB.OPERATIONS.VOTE',
    },
    deposit: {
      color: theme.palette.badges.send.color,
      backgroundColor: theme.palette.badges.send.background,
      text: 'LIB.OPERATIONS.DEPOSIT',
    },
    convertCoin: {
      color: theme.palette.badges.send.color,
      backgroundColor: theme.palette.badges.send.background,
      text: 'LIB.OPERATIONS.CONVERT_COIN',
    },
  };

  const badge = badgeColors[type];

  if (badge) {
    return {
      color: badge.color,
      backgroundColor: badge.backgroundColor,
      text: badge.text,
    };
  }

  return {
    color: theme.palette.badges.other.color,
    backgroundColor: theme.palette.badges.other.background,
    text: 'LIB.OPERATIONS.OTHER',
  };
};

import { isAccountAddress } from '@/services/cosmos/helpers';
import { ProposalMessageType } from '@/shared/types';

import {
  type CreateProposalFormValues,
  PROPOSAL_DESCRIPTION_LENGTH,
  PROPOSAL_INFO_LENGTH,
  PROPOSAL_TITLE_LENGTH,
} from '@/components/molecules';

export const isValidValues = ({
  formValues,
}: {
  formValues: CreateProposalFormValues & { type: ProposalMessageType };
}): boolean => {
  const titleRule =
    Boolean(formValues.title?.trim()) &&
    formValues.title?.trim().length >= PROPOSAL_TITLE_LENGTH.from &&
    formValues.title?.trim().length <= PROPOSAL_TITLE_LENGTH.to;

  const descriptionRules =
    Boolean(formValues.description?.trim()) &&
    formValues.description?.trim().length >= PROPOSAL_DESCRIPTION_LENGTH.from &&
    formValues.description?.trim().length <= PROPOSAL_DESCRIPTION_LENGTH.to;

  const commonRules = titleRule && descriptionRules;

  switch (formValues.type) {
    case ProposalMessageType.TEXT: {
      return commonRules;
    }

    case ProposalMessageType.COMMUNITY_POOL_SPEND: {
      const isRecipientAddressValid = formValues.recipient?.trim()
        ? isAccountAddress(formValues.recipient.trim())
        : false;

      return commonRules && isRecipientAddressValid;
    }

    case ProposalMessageType.SOFTWARE_UPGRADE: {
      const infoRules = Boolean(formValues.info?.trim()) && formValues.info.trim().length <= PROPOSAL_INFO_LENGTH.to;

      return commonRules && Boolean(formValues.name?.trim()) && Boolean(formValues.height?.trim()) && infoRules;
    }
  }
};

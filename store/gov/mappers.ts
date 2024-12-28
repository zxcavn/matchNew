import { GovParamsResponse, ProposalDepositResponse, ProposalResponse, ProposalVoteResponse } from '@/crud/cosmos';
import { ProposalMessageType } from '@/shared/types';

export const mapProposalResponse = (response: ProposalResponse) => {
  let content;

  switch (response.content['@type']) {
    case ProposalMessageType.TEXT: {
      content = {
        type: ProposalMessageType.TEXT,
        title: response.content?.title,
        description: response.content?.description,
      };

      break;
    }

    case ProposalMessageType.COMMUNITY_POOL_SPEND: {
      content = {
        type: ProposalMessageType.COMMUNITY_POOL_SPEND,
        title: response.content?.title,
        description: response.content?.description,
        recipient: response.content?.recipient,
        amount: response.content?.amount
          ? response.content?.amount?.map(item => ({
              amount: item.amount,
              denom: item.denom,
            }))
          : [],
      };

      break;
    }

    case ProposalMessageType.SOFTWARE_UPGRADE: {
      content = {
        type: ProposalMessageType.SOFTWARE_UPGRADE,
        title: response.content?.title,
        description: response.content?.description,
        plan: {
          name: response.content?.plan.name,
          height: response.content?.plan.height,
          info: response.content?.plan.info,
        },
      };

      break;
    }

    case ProposalMessageType.MSG_SOFTWARE_UPGRADE: {
      content = {
        type: ProposalMessageType.MSG_SOFTWARE_UPGRADE,
        title: `CrossFi ${response.content?.plan.name} Software Upgrade`,
        authority: response.content?.authority,
        plan: {
          name: response.content?.plan.name,
          height: response.content?.plan.height,
          info: response.content?.plan.info,
        },
      };

      break;
    }

    case ProposalMessageType.PARAMETER_CHANGE: {
      content = {
        type: ProposalMessageType.PARAMETER_CHANGE,
        title: response.content?.title,
        description: response.content?.description,
        changes: response.content?.changes,
      };

      break;
    }
  }

  return {
    proposalId: response.proposal_id,
    content,
    status: response.status,
    finalTallyResult: {
      yes: response.final_tally_result.yes,
      no: response.final_tally_result.no,
      abstain: response.final_tally_result.abstain,
      noWithVeto: response.final_tally_result.no_with_veto,
    },
    submitTime: response.submit_time,
    depositEndTime: response.deposit_end_time,
    totalDeposit: {
      denom: response.total_deposit[0].denom,
      amount: response.total_deposit[0].amount,
    },
    votingStartTime: !response?.voting_start_time.includes('0001-') ? response?.voting_start_time : undefined,
    votingEndTime: !response?.voting_end_time.includes('0001-') ? response?.voting_end_time : undefined,
  };
};

export const mapGovParamsResponse = ({
  voting_params,
  deposit_params,
  tally_params,
}: {
  voting_params: GovParamsResponse['voting_params'];
  deposit_params: GovParamsResponse['deposit_params'];
  tally_params: GovParamsResponse['tally_params'];
}) => ({
  votingParams: {
    votingPeriod: voting_params.voting_period,
  },
  depositParams: {
    minDeposit: {
      denom: deposit_params.min_deposit[0].denom,
      amount: deposit_params.min_deposit[0].amount,
    },
    maxDepositPeriod: deposit_params.max_deposit_period,
  },
  tallyParams: {
    quorum: tally_params.quorum,
    threshold: tally_params.threshold,
    vetoThreshold: tally_params.veto_threshold,
  },
});

export const mapProposalVotesResponse = (response: ProposalVoteResponse) => {
  return {
    proposalId: response.proposal_id,
    voter: response.voter,
    option: {
      name: response.options[0].option,
      weight: response.options[0].weight,
    },
  };
};

export const mapProposalDepositResponse = (response: ProposalDepositResponse) => {
  return {
    proposalId: response.proposal_id,
    depositor: response.depositor,
    amount: response.amount[0],
  };
};

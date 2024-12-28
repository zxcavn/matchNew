import { Validator, ValidatorListResponse } from '@/crud/xfiScan';

export const mapValidator = (validator: Validator) => ({
  operatorAddress: validator.operator_address,
  jailed: validator.jailed,
  status: validator.status,
  tokens: validator.tokens,
  delegatorShares: validator.delegator_shares,
  description: {
    ...validator.description,
    securityContact: validator.description.security_contact,
  },
  unbondingHeight: validator.unbonding_height,
  unbondingTime: validator.unbonding_time,
  commission: {
    updateTime: validator.commission.update_time,
    rate: validator.commission.commission_rates.rate,
    ratePercent: 100 * Number(validator.commission.commission_rates.rate),
    maxRate: validator.commission.commission_rates.max_rate,
    maxChangeRate: validator.commission.commission_rates.max_change_rate,
  },
  minSelfDelegation: validator.min_self_delegation,
});

export const mapValidatorsListResponse = ({ docs }: ValidatorListResponse) => {
  return docs.map(({ delegators_count, validator, pictures }) => ({
    delegatorsCount: delegators_count,
    validator: mapValidator(validator),
    picture: pictures?.primary.url,
  }));
};

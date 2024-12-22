import { useMemo } from 'react';

import { ValidatorStatus } from '@/crud/xfiScan';
import { ValidatorsList } from '@/store/validators';

const useBondedAndOthersValidators = (validators: ValidatorsList) => {
  return useMemo(() => {
    const bondedValidators: ValidatorsList = [];
    const othersValidators: ValidatorsList = [];

    validators.forEach(validator => {
      if (validator.validator.status === ValidatorStatus.BONDED) {
        bondedValidators.push(validator);
      } else {
        othersValidators.push(validator);
      }
    });

    return { bondedValidators, othersValidators };
  }, [validators]);
};

export default useBondedAndOthersValidators;

import { getCurrentStep } from '@/helpers';

import { createDeepEqualSelector } from '../helpers';
import type { RootState } from '../index';
import { RegistrationStep } from './types';

export const registrationItemsSelector = (address: string, chainId: number) =>
  createDeepEqualSelector(
    (state: RootState) => state.xds.registration.items,
    items => items.filter(({ payload, chainId: _chainId }) => address === payload.owner && chainId === _chainId)
  );

export const currentRegistrationItemSelector = (state: RootState) => state.xds.registration.currentItem;
export const isLoadingInitRegistrationSelector = (state: RootState) => state.xds.isLoadingInit;

export const primaryNameSelector = (address: string) => (state: RootState) => state.xds.primaryNames.names[address];
export const isLoadingPrimaryNameSelector = (state: RootState) => state.xds.primaryNames.isLoading;

export const isShowSearchNameSelector = (state: RootState) => {
  const data = currentRegistrationItemSelector(state);

  return !data || getCurrentStep(data) === RegistrationStep.PRICING;
};

export const isShowPricingStepSelector = (state: RootState) => {
  const data = currentRegistrationItemSelector(state);

  return data && getCurrentStep(data) === RegistrationStep.PRICING;
};

export const isShowTimerStepSelector = (state: RootState) => {
  const data = currentRegistrationItemSelector(state);

  return data && getCurrentStep(data) === RegistrationStep.TRANSACTION;
};

export const isShowCompleteRegistrationStepSelector = (state: RootState) => {
  const data = currentRegistrationItemSelector(state);

  return data && getCurrentStep(data) === RegistrationStep.COMPLETE;
};

export const xdsNameListSelector = (state: RootState) => state.xds.nameList;
export const xdsNameSelector = (state: RootState) => state.xds.name;

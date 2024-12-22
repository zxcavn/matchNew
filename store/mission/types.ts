import type { MissionResponse } from '@/crud/xfiPad';
import { DefaultState } from '@/shared/types';

export const SLICE_NAME = 'MISSION';

export const enum MissionFetchMethod {
  getMissionAsync = `${SLICE_NAME}/getMissionAsync`,
  postMissionAsync = `${SLICE_NAME}/postMissionAsync`,
  checkSwapMissionAsync = `${SLICE_NAME}/checkSwapMissionAsync`,
  checkExchangeBuyXfiAsync = `${SLICE_NAME}/checkExchangeBuyXfiAsync`,
  checkSocialNetworkSubscriptionAsync = `${SLICE_NAME}/checkSocialNetworkSubscriptionAsync`,
}

export type MissionState = DefaultState<MissionResponse> & {
  isSwapMissionSuccess: boolean;
  isCheckBuyXfiSuccess: boolean;
  checkProgressMissionId?: string | null;
};

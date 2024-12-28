import { MissionHistoryResponse } from '@/crud/xfiPad';
import { ErrorType } from '@/shared/types';

export const SLICE_NAME = 'MISSION_HISTORY';

export const enum HistoryFetchMethod {
  getMissionHistoryAsync = `${SLICE_NAME}/getMissionHistoryAsync`,
}

export type MissionHistoryState = {
  isLoading?: boolean;
  error?: ErrorType;
  data: MissionHistoryResponse;
};

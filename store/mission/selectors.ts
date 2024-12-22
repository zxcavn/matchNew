import groupBy from 'lodash/groupBy';
import orderBy from 'lodash/orderBy';

import { Mission, MissionGroup } from '@/crud/xfiPad';
import { MISSION_GROUP_ORDER, MISSION_LIST_ORDER } from '@/shared/constants/missions';
import type { RootState } from '@/store';

export const missionsSelector = (state: RootState) => state.mission;

export const groupedMissionsSelector = (state: RootState) => {
  const missions = state.mission.data?.docs || [];
  const orderlyMissions = orderBy(missions, mission => MISSION_LIST_ORDER.indexOf(mission.validator));
  const grouped = groupBy(orderlyMissions, ({ group }) => group) as { [key in MissionGroup]: Mission[] };
  const entries = Object.entries(grouped) as Array<[MissionGroup, Array<Mission>]>;

  return orderBy(entries, ([group]) => MISSION_GROUP_ORDER.indexOf(group));
};

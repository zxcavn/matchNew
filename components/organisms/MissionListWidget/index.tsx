import { Stack, Typography } from '@mui/material';
import { useDocumentVisibility } from '@xfi/hooks';
import { useCallback, useState } from 'react';
import { FormattedMessage } from 'react-intl';

import { SocialNetworkType } from '@/crud/xfiPad';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { ALL_VALUE } from '@/shared/constants';
import {
  checkMissionProgressAsync,
  checkSocialNetworkSubscriptionAsync,
  groupedMissionsSelector,
  missionsSelector,
} from '@/store/mission';

import { CheckMissionModal, DappMissionCard, MissionCard } from '@/components/molecules';

import BlockTitle from './BlockTitle';
import { DAPPS_MISSIONS, MISSION_DETAILS_LIST, MISSION_GROUP_DETAILS_LIST } from './constants';

type Props = {
  getMissions: () => void;
  selectedGroup: string;
};

const MissionListWidget = ({ selectedGroup, getMissions }: Props) => {
  const dispatch = useAppDispatch();
  const isDocumentVisible = useDocumentVisibility(getMissions);

  const groupedMissionList = useAppSelector(groupedMissionsSelector);
  const { checkProgressMissionId } = useAppSelector(missionsSelector);
  const [checkMissionId, setCheckMissionId] = useState<string | null>(null);
  const [socialNetwork, setSocialNetwork] = useState<SocialNetworkType | null>(null);

  const onCheckMission = useCallback(
    ({ id, socialNetwork }: { id: string; socialNetwork: SocialNetworkType | null }) => {
      setCheckMissionId(id);
      setSocialNetwork(socialNetwork);
    },
    []
  );

  const onSubmit = async (hash: string) => {
    const missionId = checkMissionId || '';

    try {
      if (!socialNetwork) {
        await dispatch(
          checkMissionProgressAsync({
            hash,
            missionId,
          })
        ).unwrap();
      } else {
        await dispatch(
          checkSocialNetworkSubscriptionAsync({
            hash,
            missionId,
            socialNetwork,
          })
        ).unwrap();
      }

      getMissions();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Stack gap={{ xs: '1.5rem' }}>
      {selectedGroup === ALL_VALUE && (
        <>
          <BlockTitle text="MISSION_GROUP.DAPPS.TITLE" sx={{ padding: '1rem 0' }} />
          {DAPPS_MISSIONS.map(details => {
            return <DappMissionCard key={details.name} details={details} />;
          })}
        </>
      )}
      {!groupedMissionList.length && (
        <Typography color={'neutrals.secondaryText'} sx={{ paddingTop: '9.25rem', textAlign: 'center' }}>
          <FormattedMessage id="SUMMARY.NO_DATA_TO_DISPLAY" />!
        </Typography>
      )}
      {groupedMissionList.map(([group, missionList]) => {
        if (!missionList.length || !MISSION_GROUP_DETAILS_LIST[group]) return;

        const { title } = MISSION_GROUP_DETAILS_LIST[group];

        return (
          <>
            <BlockTitle text={title} sx={{ padding: '1rem 0' }} />

            {missionList.map(mission => {
              const details = MISSION_DETAILS_LIST[mission.validator];

              if (!details) return null;

              return (
                <MissionCard
                  onClickCheck={onCheckMission}
                  key={mission.validator}
                  mission={mission}
                  details={details}
                  isDocumentVisible={isDocumentVisible}
                  isLoading={checkProgressMissionId === mission.id}
                />
              );
            })}
          </>
        );
      })}

      <CheckMissionModal
        setIsOpen={() => setCheckMissionId(null)}
        isOpen={Boolean(checkMissionId)}
        onSubmit={({ hash }) => {
          onSubmit(hash);
          setCheckMissionId(null);
        }}
      />
    </Stack>
  );
};

export default MissionListWidget;

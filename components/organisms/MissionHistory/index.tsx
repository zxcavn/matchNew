import { useEffect } from 'react';

import { MissionHistoryType } from '@/crud/xfiPad';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { Table, TableBlock } from '@/lib/xfi.lib/components/molecules';
import { getMissionHistory, MISSION_HISTORY_LIMIT, missionHistorySelector } from '@/store/missionHistory';

import { MOBILE_CONFIG, TABLE_COLUMNS } from './constants';

const MissionHistory = () => {
  const dispatch = useAppDispatch();
  const { isLoading, data } = useAppSelector(missionHistorySelector);

  useEffect(() => {
    const { abort } = dispatch(getMissionHistory({ offset: 0 }));

    return () => abort();
  }, [dispatch]);

  const onChange = (page: number) => {
    dispatch(
      getMissionHistory({
        offset: MISSION_HISTORY_LIMIT * (page - 1),
      })
    );
  };

  return (
    <TableBlock
      title="SUMMARY.ARCHIVED"
      notFound={{ text: 'SUMMARY.NO_ARCHIVED' }}
      isLoading={isLoading}
      hasData={Boolean(data.docs.length)}
    >
      <Table<MissionHistoryType>
        rows={data.docs}
        columns={TABLE_COLUMNS}
        mobileConfig={MOBILE_CONFIG}
        pagination={{ variant: 'default', page: data.page, count: data.totalPages, onChange }}
      />
    </TableBlock>
  );
};

export default MissionHistory;

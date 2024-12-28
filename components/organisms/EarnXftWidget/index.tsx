import { Stack, styled } from '@mui/material';
import { useQueryParam } from '@xfi/hooks';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';

import { MissionGroup } from '@/crud/xfiPad';
import { useAppDispatch } from '@/hooks';
import { OptionType, Select, SelectProps, Tabs } from '@/lib/xfi.lib/components/atoms';
import { useMediaQuery } from '@/lib/xfi.lib/theme';
import { ALL_VALUE } from '@/shared/constants';
import { getMissionsAsync } from '@/store/mission';

import { MissionHistory, MissionListWidget } from '@/components/organisms';

import { EARN_XFT_TABS, GROUP_OPTIONS } from './constants';

const EarnXftWidget = () => {
  const isMobile = useMediaQuery(theme => theme.breakpoints.down('md'));

  const dispatch = useAppDispatch();
  const tab = useQueryParam('tab') || EARN_XFT_TABS[0].value;
  const { query, replace } = useRouter();

  const [selectedGroup, setSelectedGroup] = useState<MissionGroup | typeof ALL_VALUE>(ALL_VALUE);

  const getMissions = useCallback(() => {
    let groups: MissionGroup[] = [];

    if (selectedGroup !== ALL_VALUE) {
      groups = [selectedGroup as MissionGroup];
    }

    return dispatch(getMissionsAsync({ groups, types: [] }));
  }, [dispatch, selectedGroup]);

  useEffect(() => {
    const { abort } = getMissions();

    return () => {
      abort();
    };
  }, [getMissions, selectedGroup]);

  const onCategoryChange: SelectProps['onChange'] = e => {
    if (Array.isArray(e.target.value)) {
      return;
    }

    const value = e.target.value as MissionGroup | typeof ALL_VALUE;

    setSelectedGroup(value);
  };

  const onChangeTab = (newTab: string) => {
    replace(
      {
        query: { ...query, tab: newTab },
      },
      undefined,
      { scroll: false }
    );
  };

  return (
    <StyledEarnXftWidget>
      <Stack direction={{ md: 'row' }} gap={'1.5rem'} justifyContent={'space-between'} alignItems={'center'}>
        <Tabs value={tab} tabs={EARN_XFT_TABS} setTab={onChangeTab} size={isMobile ? 'small' : 'large'} />
        {tab === EARN_XFT_TABS[0].value && (
          <Select
            options={GROUP_OPTIONS}
            value={selectedGroup}
            onChange={onCategoryChange}
            variant={'transparent'}
            renderValue={renderValue}
            isFullWidth={isMobile}
            className="categorySelect"
          />
        )}
      </Stack>
      {tab === EARN_XFT_TABS[0].value && <MissionListWidget selectedGroup={selectedGroup} getMissions={getMissions} />}
      {tab === EARN_XFT_TABS[1].value && <MissionHistory />}
    </StyledEarnXftWidget>
  );
};

const StyledEarnXftWidget = styled(Stack, { name: 'StyledEarnXftWidget' })(({ theme }) => ({
  gap: '1.5rem',

  '&&& .categorySelect': {
    [theme.breakpoints.down('md')]: {
      padding: '0.5625rem 1rem 0.8125rem',
    },
  },
}));

export default EarnXftWidget;

const isIntlOption = <T,>(
  option: OptionType<T> | undefined
): option is OptionType<T> & { label: { type: 'intl'; id: string } } => {
  if (!option) return false;
  return option.label?.type === 'intl' && 'id' in option.label;
};

const renderValue = (selected: unknown) => {
  const selectedValue = selected as string;

  const option = GROUP_OPTIONS.find(el => el.value === selectedValue);
  const translation = isIntlOption(option) ? <FormattedMessage id={option.label.id} /> : selectedValue;

  return (
    <>
      <FormattedMessage id="SUMMARY.CATEGORY" />: {translation}
    </>
  );
};

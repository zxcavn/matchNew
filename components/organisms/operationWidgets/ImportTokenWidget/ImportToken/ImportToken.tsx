import { Stack } from '@mui/material';

import { Tabs } from '@/lib/xfi.lib/components/atoms';

import { IMPORT_TOKEN_TABS, TabType } from '../constants';
import type { ImportTokenProps } from '../types';
import SearchTokens from './SearchTokens';
import UserToken from './UserToken';

const ImportToken = (props: ImportTokenProps) => {
  const { tab, setTab } = props;

  const Component = tab === TabType.user ? UserToken : SearchTokens;

  return (
    <Stack width="100%" gap="2rem">
      <Tabs tabs={IMPORT_TOKEN_TABS} value={tab} setTab={setTab} sx={{ width: '100%' }} />
      <Component {...props} />
    </Stack>
  );
};

export default ImportToken;

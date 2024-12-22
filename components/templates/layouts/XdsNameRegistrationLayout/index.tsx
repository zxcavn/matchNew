import { Stack } from '@mui/material';
import type { PropsWithChildren } from 'react';

import { BackButton, Loader } from '@/lib/xfi.lib/components/atoms';
import { PAGES } from '@/shared/constants';

type Props = PropsWithChildren<{
  isLoading?: boolean;
}>;

const XdsNameRegistrationLayout = ({ children, isLoading }: Props) => {
  // TODO: Add show logic
  const isShowBackButton = true;

  return (
    <Stack pb={{ md: '5rem' }} position="relative">
      {isShowBackButton && (
        <Stack pl={{ md: '1.25rem' }} zIndex={theme => theme.zIndex.mobileStepper}>
          <BackButton backText="XDS.BACK_TO_ALL_NAMES" href={PAGES.xds.pathname} />
        </Stack>
      )}
      <Stack alignSelf="center" width="100%" maxWidth={{ md: '63.5rem', xs: '100%' }}>
        {children}
      </Stack>
      {isLoading && <Loader />}
    </Stack>
  );
};

export default XdsNameRegistrationLayout;

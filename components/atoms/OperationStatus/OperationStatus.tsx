import { Stack, Typography } from '@mui/material';
import { ReactNode } from 'react';

import { Icon } from '@/lib/xfi.lib/components/atoms';
import { CheckIcon, FailedIcon } from '@/lib/xfi.lib/icons';

export const TEST_ID = 'success-token-operation-test-id';

export type Props = {
  text: ReactNode;
  status?: 'success' | 'error';
};

const OperationStatus = ({ text, status = 'success' }: Props) => {
  const StatusIcon = status === 'success' ? CheckIcon : FailedIcon;

  return (
    <Stack alignItems="center" gap="1.5rem" data-testid={TEST_ID}>
      <Icon src={StatusIcon} sx={{ fontSize: '3rem' }} viewBox="0 0 20 20" />
      <Typography textAlign="center" variant="h4" color="neutrals.secondaryText">
        {text}
      </Typography>
    </Stack>
  );
};

export default OperationStatus;

import { Stack, StackProps, Typography } from '@mui/material';
import { FormattedMessage } from 'react-intl';

import { Icon } from '@/lib/xfi.lib/components/atoms';
import { CheckIcon } from '@/lib/xfi.lib/icons';

type Props = Omit<StackProps, 'children'>;

const PrimaryNameLabel = (props: Props) => {
  return (
    <Stack direction={'row'} gap={'0.5rem'} alignItems={'center'} {...props}>
      <Icon src={CheckIcon} viewBox={'0 0 20 20'} sx={{ fontSize: '1.25rem' }} />
      <Typography color={'alerts.success'}>
        <FormattedMessage id={'SUMMARY.PRIMARY_NAME'} />
      </Typography>
    </Stack>
  );
};

export default PrimaryNameLabel;

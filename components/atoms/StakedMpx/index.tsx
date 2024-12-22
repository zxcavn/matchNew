import { Stack, Typography } from '@mui/material';
import { MxNumberFormatter } from '@xfi/formatters';
import { FormattedMessage } from 'react-intl';

import { Icon } from '@/lib/xfi.lib/components/atoms';
import { CURRENCIES } from '@/lib/xfi.lib/constants';
import { CoinsInStakeIcon } from '@/public/icons';

type Props = {
  className?: string;
  coins?: string;
};

const StakedMpx = ({ className, coins }: Props) => {
  return (
    <Stack className={className} flexDirection={'row'} gap={'0.25rem'}>
      <Icon sx={{ marginTop: '-0.1875rem' }} src={CoinsInStakeIcon} viewBox="0 0 24 24" />
      <Stack flexDirection={'row'} gap={'0.25rem'} flexWrap={'wrap'}>
        <Typography variant="body2">
          <FormattedMessage id={'TOTAL_AMOUNT_IN_STAKE'} />
        </Typography>
        <Typography variant="subtitle2" color="primary.main">
          {MxNumberFormatter.formatUnitsToDisplay(coins || '0', {
            maxFractionalLength: CURRENCIES.mpx.formatDecimals,
          })}{' '}
          {CURRENCIES.mpx.text}
        </Typography>
      </Stack>
    </Stack>
  );
};

export default StakedMpx;

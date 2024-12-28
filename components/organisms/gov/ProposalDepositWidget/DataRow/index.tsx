import { Typography } from '@mui/material';
import { formatAddressToDisplay, MxNumberFormatter } from '@xfi/formatters';
import Link from 'next/link';
import { useMemo } from 'react';
import urlJoin from 'url-join';

import { Icon, NumberWithSuffix } from '@/lib/xfi.lib/components/atoms';
import { CURRENCIES } from '@/lib/xfi.lib/constants';
import { LinkIcon } from '@/lib/xfi.lib/icons';
import { XFI_SCAN_URL } from '@/shared/constants';
import { ProposalDeposit } from '@/store/gov';

import { StyledDataRow } from './styles';

type Props = {
  item: ProposalDeposit;
};

const DataRow = ({ item }: Props) => {
  const displayAddress = useMemo(() => formatAddressToDisplay(item.depositor), [item]);

  return (
    <StyledDataRow direction={'row'} justifyContent={'space-between'} gap={'1.25rem'}>
      <Link className="addressIconWrapper" href={urlJoin(XFI_SCAN_URL, 'address', item.depositor)} target={'_blank'}>
        <Typography variant="subtitle2">{displayAddress}</Typography>
        <Icon className="linkIcon" src={LinkIcon} viewBox="0 0 20 20" sx={{ fontSize: '1rem' }} />
      </Link>
      <Typography variant="body2" color="neutrals.secondaryText">
        <NumberWithSuffix
          value={MxNumberFormatter.formatUnits(item?.amount.amount)}
          maxFractionDigits={CURRENCIES.mpx.formatDecimals}
        />{' '}
        {CURRENCIES.mpx.text}
      </Typography>
    </StyledDataRow>
  );
};

export default DataRow;

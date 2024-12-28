import { Typography } from '@mui/material';
import { formatAddressToDisplay } from '@xfi/formatters';
import Link from 'next/link';
import { useMemo } from 'react';
import { FormattedMessage } from 'react-intl';
import urlJoin from 'url-join';

import { Icon } from '@/lib/xfi.lib/components/atoms';
import { LinkIcon } from '@/lib/xfi.lib/icons';
import { XFI_SCAN_URL } from '@/shared/constants';
import { ProposalVote } from '@/store/gov';

import { VOTE_CONFIG } from '../constants';
import { StyledDataRow } from './styles';

type Props = {
  item: ProposalVote;
};

const DataRow = ({ item }: Props) => {
  const displayAddress = useMemo(() => formatAddressToDisplay(item.voter), [item]);

  return (
    <StyledDataRow direction={'row'} justifyContent={'space-between'} gap={'1.25rem'}>
      <Link className="addressIconWrapper" href={urlJoin(XFI_SCAN_URL, 'address', item.voter)} target={'_blank'}>
        <Typography variant="subtitle2">{displayAddress}</Typography>
        <Icon className="linkIcon" src={LinkIcon} viewBox="0 0 20 20" sx={{ fontSize: '1rem' }} />
      </Link>
      <Typography
        variant="subtitle2"
        sx={{
          color: VOTE_CONFIG[item.option.name].color,
          textTransform: 'lowercase',
        }}
      >
        <FormattedMessage id={VOTE_CONFIG[item.option.name].text} />
      </Typography>
    </StyledDataRow>
  );
};

export default DataRow;

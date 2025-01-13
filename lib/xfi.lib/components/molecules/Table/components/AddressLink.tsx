import { Box, Stack } from '@mui/material';
import { formatAddressToDisplay, formatXdsNameToDisplay } from '@xfi/formatters';
import { useMemo } from 'react';

import { CircleInfoIcon } from '../../../../icons';
import { useMediaQuery } from '../../../../theme';
import { CopyButton, Icon, XdsAddressTooltip } from '../../../atoms';
import { type BaseTableCopyLinkProps, BaseTableCopyLink, BaseTableLink } from './base';

export type Props = Pick<BaseTableCopyLinkProps, 'href' | 'target'> & {
  address: string;
  xdsName?: string;
  displayValue?: string;
  /** @type {FormattedMessageId} */
  copyText?: string;
};

const AddressLink = (props: Props) => {
  return props.xdsName ? <AddressWithXdsName {...props} /> : <Address {...props} />;
};

const AddressWithXdsName = ({ address, xdsName = '', href, target, displayValue }: Props) => {
  const isMobile = useMediaQuery(theme => theme.breakpoints.down('md'));
  const displayName = useMemo(
    () => displayValue || (xdsName ? formatXdsNameToDisplay(xdsName) : ''),
    [xdsName, displayValue]
  );

  const DisplayLinkComponent = (
    <BaseTableLink href={href} target={target}>
      {displayName}
    </BaseTableLink>
  );

  if (isMobile) {
    return (
      <Stack direction="row" alignItems="center" gap="0.5rem">
        {DisplayLinkComponent}
        <XdsAddressTooltip name={xdsName} address={address}>
          <Box component="span" height="1.25rem">
            <Icon src={CircleInfoIcon} viewBox="0 0 20 20" sx={{ fontSize: '1.25rem', cursor: 'pointer' }} />
          </Box>
        </XdsAddressTooltip>
        <CopyButton value={address} hasText={false} />
      </Stack>
    );
  }

  return (
    <XdsAddressTooltip withCopyAddress name={xdsName} address={address}>
      <span>{DisplayLinkComponent}</span>
    </XdsAddressTooltip>
  );
};

const Address = ({ address, href, target, displayValue: displayValueProps, copyText = 'LIB.COPY_ADDRESS' }: Props) => {
  const displayValue = useMemo(
    () => displayValueProps || formatAddressToDisplay(address),
    [displayValueProps, address]
  );

  return (
    <BaseTableCopyLink copyText={copyText} href={href} copyValue={address} target={target}>
      {displayValue}
    </BaseTableCopyLink>
  );
};

export default AddressLink;

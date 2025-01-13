import { formatAddressToDisplay } from '@xfi/formatters';
import { useMemo } from 'react';

import { type BaseTableLinkProps, BaseTableCopyLink } from './base';

export type Props = Pick<BaseTableLinkProps, 'href' | 'target'> & {
  hash: string;
  /** @type {FormattedMessageId} */
  copyText?: string;
};

const HashLink = ({ hash, href, target, copyText = 'LIB.COPY_HASH' }: Props) => {
  const displayValue = useMemo(() => formatAddressToDisplay(hash), [hash]);

  return (
    <BaseTableCopyLink copyText={copyText} href={href} copyValue={hash} target={target}>
      {displayValue}
    </BaseTableCopyLink>
  );
};

export default HashLink;

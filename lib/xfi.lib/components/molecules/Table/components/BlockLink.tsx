import { formatBlockHeightToDisplay } from '@xfi/formatters';
import { useMemo } from 'react';

import { BaseTableCopyLink, BaseTableLinkProps } from './base';

export type Props = Pick<BaseTableLinkProps, 'href' | 'target'> & {
  height: string | number;
  /** @type {FormattedMessageId} */
  copyText?: string;
};

const BlockLink = ({ href, height, target, copyText = 'LIB.COPY_BLOCK' }: Props) => {
  const displayValue = useMemo(() => formatBlockHeightToDisplay(String(height)), [height]);

  return (
    <BaseTableCopyLink copyText={copyText} href={href} copyValue={String(height)} target={target}>
      {displayValue}
    </BaseTableCopyLink>
  );
};

export default BlockLink;

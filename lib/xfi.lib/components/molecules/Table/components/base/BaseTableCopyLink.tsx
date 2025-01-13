import { Stack } from '@mui/material';

import { useMediaQuery } from '../../../../../theme';
import { Copy } from '../../../../atoms/copy';
import BaseTableLink, { type Props as BaseTableLinkProps } from './BaseTableLink';

export const TEST_ID = 'base-table-copy-link-test-id';

export type Props = BaseTableLinkProps & {
  copyValue: string;
  /** @type {FormattedMessageId} */
  copyText?: string;
};

/**
 * @description Do not use it outside `Table` component
 */
const BaseTableCopyLink = ({ copyValue, copyText, ...linkProps }: Props) => {
  const isMobile = useMediaQuery(theme => theme.breakpoints.down('md'));

  if (isMobile) {
    return (
      <Stack direction="row" alignItems="center" gap="0.5rem" data-testid={TEST_ID}>
        <BaseTableLink {...linkProps} />
        <Copy variant="button" value={copyValue} />
      </Stack>
    );
  }

  return (
    <Copy data-testid={TEST_ID} variant="tooltip" value={copyValue} copyText={copyText}>
      <BaseTableLink {...linkProps} />
    </Copy>
  );
};

export default BaseTableCopyLink;

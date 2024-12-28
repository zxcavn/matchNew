import { Typography } from '@mui/material';
import type { HTMLAttributeAnchorTarget, PropsWithChildren } from 'react';

import { Link } from '../../../../atoms/Link';

export const TEST_ID = 'base-table-link-test-id';

export type Props = PropsWithChildren<
  Partial<{
    href: string;
    target: HTMLAttributeAnchorTarget;
  }>
>;

/**
 * @description Do not use it outside `Table` component
 */
const BaseTableLink = ({ href, target, children }: Props) => {
  return href ? (
    <Link data-testid={TEST_ID} href={href} target={target}>
      {children}
    </Link>
  ) : (
    <Typography data-testid={TEST_ID} sx={{ textWrap: 'nowrap' }} variant="link" color="background.light">
      {children}
    </Typography>
  );
};

export default BaseTableLink;

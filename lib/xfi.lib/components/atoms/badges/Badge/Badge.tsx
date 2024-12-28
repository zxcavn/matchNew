import { type SxProps, type Theme } from '@mui/material';
import { type PropsWithChildren } from 'react';

import { type PropsWithTestId } from '../../../../helpers/test/types';
import { StyledBadge } from './styles';

export const TEST_ID = 'badge-test-id';

export type Props = PropsWithChildren<{
  className?: string;
  sx?: SxProps<Theme>;
  color?: string;
  backgroundColor?: string;
}> &
  PropsWithTestId;

/**
 * A customizable badge component.
 *
 * This component renders a badge with optional custom styling and colors.
 *
 * @component
 *
 * @param {Props} props - The props for the component.
 * @param {ReactNode} props.children - The content to be displayed within the badge.
 * @param {string} [props.className] - Additional CSS class name(s) to apply to the badge.
 * @param {SxProps} [props.sx] - Custom styling using Material-UI's SxProps.
 * @param {string} [props.color] - Color of the badge.
 * @param {string} [props.backgroundColor] - Background color of the badge.
 * @param {string} [props['data-testid']] - Unique identifier for testing purposes.
 *
 * @returns {FC<Props>} The Badge component.
 */
const Badge = ({ children, className, color, backgroundColor, ...props }: Props) => {
  return (
    <StyledBadge
      data-testid={TEST_ID}
      className={className}
      $color={color}
      $backgroundColor={backgroundColor}
      {...props}
    >
      {children}
    </StyledBadge>
  );
};

export default Badge;

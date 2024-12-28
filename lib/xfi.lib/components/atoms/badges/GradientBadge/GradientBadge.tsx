import type { BoxProps } from '@mui/material';

import type { PropsWithTestId } from '../../../../helpers/test';
import type { GradientBadgeType } from '../../../../theme/theme';
import { StyledBadgeContainer } from './styles';

export type Color = keyof GradientBadgeType;

export type Props = BoxProps &
  PropsWithTestId & {
    color?: Color;
  };

const GradientBadge = ({ color = 'lightBlue', children, ...props }: Props) => {
  return (
    <StyledBadgeContainer as="span" $color={color} {...props}>
      {children}
    </StyledBadgeContainer>
  );
};

export default GradientBadge;

import { HTMLAttributes } from 'react';

import { StyledFigure } from './styles';

export type Props = HTMLAttributes<HTMLDivElement> & {
  color?: 'primary' | 'secondary';
  size?: number;
};

/**
 * A stylized graphical figure element, typically used for decorative purposes.
 *
 * The `Figure` component is used to render graphical figures or decorative elements within a user interface. It can be customized by specifying the color and size of the figure. The `color` prop determines the primary or secondary color, and the `size` prop specifies the size of the figure.
 *
 * @component
 *
 * @param {Props} props - The props for the component.
 * @param {string} [props.color='primary'] - The color of the figure, which can be 'primary' or 'secondary'.
 * @param {number} [props.size=2.75] - The size of the figure, typically in rem or other suitable units.
 * @param {...any} [props.other] - Additional HTML attributes to be passed to the underlying figure element.
 *
 * @returns {FC} The Figure component.
 */
const Figure = (props: Props) => {
  const { size = 2.75, color = 'primary', children, ...other } = props;

  return (
    <StyledFigure $color={color} $size={size} {...other}>
      {children}
    </StyledFigure>
  );
};

export default Figure;

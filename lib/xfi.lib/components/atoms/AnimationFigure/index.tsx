import NextImage from 'next/image';

import { useTheme as useAppTheme } from './../../../theme/ThemeProvider';
import brandFigureDark from './brandFigureDark.webp';
import brandFigureLight from './brandFigureLight.webp';
import { StyledFigureContainer } from './styles';

export type Props = {
  className?: string;
};

/**
 * A simple animated figure component that displays an image using the Next.js Image component.
 *
 * The `AnimationFigure` component is used to display an animated figure, typically for branding or decorative purposes. It uses the Next.js Image component to optimize image loading and rendering.
 *
 * @component
 *
 * @param {Props} props - The props for the component.
 * @param {string} [props.className] - An optional CSS class name to apply to the component.
 *
 * @returns {FC} The AnimationFigure component.
 */

const AnimationFigure = ({ className }: Props) => {
  const { themeVariant } = useAppTheme();

  const currentBrandFigure = themeVariant === 'dark' ? brandFigureDark : brandFigureLight;

  return (
    <StyledFigureContainer className={className}>
      <NextImage fill src={currentBrandFigure} priority alt="figure" quality={100} />
    </StyledFigureContainer>
  );
};

export default AnimationFigure;

import { IconProps, useTheme } from '@mui/material';
import SvgIcon from '@mui/material/SvgIcon';
import { ElementType } from 'react';

import { type ThemeIcon, isThemeIcon } from '../../../icons/types';

export type Props = {
  src: ElementType | ThemeIcon;
  className?: string;
  viewBox?: string;
  onClick?: (e: MouseEvent) => void;
  htmlColor?: string;
} & IconProps;

/**
 * A versatile component for rendering SVG icons within a user interface.
 *
 * The `Icon` component allows you to display SVG icons in your application. It provides options for specifying the source icon, customizing its appearance, and handling interactions like click events.
 *
 * @component
 *
 * @param {Props} props - The props for the component.
 * @param {ElementType} props.src - The source icon component to render. This can be an imported SVG icon or a Material-UI icon component.
 * @param {string} [props.className] - Additional CSS class name to apply to the icon.
 * @param {string} [props.viewBox] - The viewBox attribute for the SVG icon.
 * @param {function} [props.onClick] - A function to handle click events on the icon.
 * @param {string} [props.htmlColor='transparent'] - The HTML color of the icon, which can be any valid CSS color value.
 * @param {...IconProps} [props.other] - Additional props to be passed to the underlying Material-UI SvgIcon component.
 *
 * @returns {FC} The Icon component displaying the specified icon.
 */
const Icon = ({ src: IconComponent, htmlColor = 'transparent', ...other }: Props) => {
  const theme = useTheme();
  const Icon = isThemeIcon(IconComponent) ? IconComponent[theme.palette.mode] : IconComponent;

  return <SvgIcon component={Icon} htmlColor={htmlColor} {...other} />;
};

export default Icon;

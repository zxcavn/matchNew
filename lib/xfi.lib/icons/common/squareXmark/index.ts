import type { ThemeIcon } from '../../types';
import { default as SquareXmarkDarkIcon } from './squareXmark.dark.svg';
import { default as SquareXmarkLightIcon } from './squareXmark.light.svg';

const SquareXmarkIcon: ThemeIcon = {
  light: SquareXmarkLightIcon,
  dark: SquareXmarkDarkIcon,
} as const;

export default SquareXmarkIcon;

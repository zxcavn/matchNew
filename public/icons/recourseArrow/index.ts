import { ThemeIcon } from '@/lib/xfi.lib/icons/types';
import { default as RecourseArrowLightIcon } from './recourseArrow.light.svg';
import { default as RecourseArrowDarkIcon } from './recourseArrow.dark.svg'

const RecourseArrowIcon: ThemeIcon = {
  light: RecourseArrowLightIcon,
  dark: RecourseArrowDarkIcon,
} as const;

export default RecourseArrowIcon;

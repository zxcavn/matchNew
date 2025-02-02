import type { ThemeIcon } from '../../types';
import { default as EditDarkIcon } from './edit.dark.svg';
import { default as EditLightIcon } from './edit.light.svg';

const EditIcon: ThemeIcon = {
  light: EditLightIcon,
  dark: EditDarkIcon,
} as const;

export default EditIcon;

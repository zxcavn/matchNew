import type { ThemeIcon } from '../../types';
import { default as SelectedTaskDarkIcon } from './selectedTask.dark.svg';
import { default as SelectedTaskLightIcon } from './selectedTask.light.svg';

const SelectedTaskIcon: ThemeIcon = {
  light: SelectedTaskLightIcon,
  dark: SelectedTaskDarkIcon,
} as const;

export default SelectedTaskIcon;

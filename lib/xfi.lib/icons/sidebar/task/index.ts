import type { ThemeIcon } from '../../types';
import { default as TaskDarkIcon } from './task.dark.svg';
import { default as TaskLightIcon } from './task.light.svg';

const TaskIcon: ThemeIcon = {
  light: TaskLightIcon,
  dark: TaskDarkIcon,
} as const;

export default TaskIcon;

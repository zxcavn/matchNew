import { ThemeIcon } from '@/lib/xfi.lib/icons/types';
import { default as NodesGuruDarkIcon } from './nodesGuru.dark.svg';
import { default as NodesGuruLightIcon } from './nodesGuru.light.svg';

const NodesGuruIcon: ThemeIcon = {
  light: NodesGuruLightIcon,
  dark: NodesGuruDarkIcon,
} as const;

export default NodesGuruIcon;

import { ThemeIcon } from '@/lib/xfi.lib/icons/types';
import { default as DexGuruDarkIcon } from './dexGuru.dark.svg';
import { default as DexGuruLightIcon } from './dexGuru.light.svg';

const DexGuruIcon: ThemeIcon = {
  light: DexGuruLightIcon,
  dark: DexGuruDarkIcon,
} as const;

export default DexGuruIcon;

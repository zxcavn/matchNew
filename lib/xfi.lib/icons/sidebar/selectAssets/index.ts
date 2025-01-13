import type { ThemeIcon } from '../../types';
import { default as SelectedAssetsLightIcon } from './selectAssets.light.svg';
import { default as SelectedAssetsDarkIcon } from './selectedAssets.dark.svg';

const SelectedAssetsIcon: ThemeIcon = {
  light: SelectedAssetsLightIcon,
  dark: SelectedAssetsDarkIcon,
} as const;

export default SelectedAssetsIcon;

import { useTheme } from '@mui/material';
import clsx from 'clsx';

import { ThemeToggleIcon } from '@/public/icons';
import { AppThemeVariant } from '@/theme';
import { useTheme as useAppTheme } from '@/theme/ThemeProvider';
import { StyledThemeToggle } from './styles';

export type ThemeToggleSize = 'small' | 'large';

type Props = {
  className?: string;
  size?: ThemeToggleSize;
};

const ThemeToggle = ({ className, size = 'small' }: Props) => {
  const { toggleTheme } = useAppTheme();
  const {
    palette: { mode },
  } = useTheme();

  return (
    <StyledThemeToggle
      className={clsx(className, size)}
      value={mode === AppThemeVariant.light}
      onChange={toggleTheme}
      icons={{
        default: { src: ThemeToggleIcon.dark, viewBox: '0 0 20 20' },
        checked: { src: ThemeToggleIcon.light, viewBox: '0 0 20 20' },
      }}
    />
  );
};

export default ThemeToggle;

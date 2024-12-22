import { Box, BoxProps, styled } from '@mui/material';
import Image from 'next/image';

import { AppThemeVariant } from '@/lib/xfi.lib/theme';
import { useTheme } from '@/lib/xfi.lib/theme/ThemeProvider';

const RewardsImage = (props: BoxProps) => {
  const { themeVariant } = useTheme();
  const isDark = themeVariant === AppThemeVariant.dark;

  return (
    <StyledImageContainer {...props}>
      <Image src={`/images/rewards/${isDark ? 'dark' : 'light'}.png`} alt="rewards" fill />
    </StyledImageContainer>
  );
};

const StyledImageContainer = styled(Box, { name: 'StyledImageContainer' })(({ theme }) => ({
  position: 'absolute',
  width: '28.375rem',
  height: '28.375rem',
  pointerEvents: 'none',

  [theme.breakpoints.down('md')]: {
    width: '17.75rem',
    height: '17.75rem',
  },
}));

export default RewardsImage;

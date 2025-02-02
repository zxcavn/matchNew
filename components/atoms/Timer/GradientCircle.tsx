import { styled, useTheme } from '@mui/material';

import { shouldForwardProp } from '../../../helpers';
import { AppThemeVariant } from '../../../theme';

import { getColors } from './helpers';

type Props = {
  withAnimation?: boolean;
  className?: string;
};

const GradientCircle = ({ withAnimation, className }: Props) => {
  const theme = useTheme();
  const { from, to } = getColors(withAnimation, theme.palette.mode === AppThemeVariant.dark);

  return (
    <StyledSvg
      className={className}
      $withAnimation={withAnimation}
      viewBox="0 0 166 166"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="1.44767"
        y="1.44767"
        width="98%"
        height="98%"
        rx="81.5523"
        stroke="url(#paint0_linear_0_4)"
        strokeWidth="2.89535"
      />
      <defs>
        <linearGradient
          id="paint0_linear_0_4"
          x1="128.604"
          y1="15.0495"
          x2="83"
          y2="166"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor={from} />
          <stop offset="1" stopColor={to} />
        </linearGradient>
      </defs>
    </StyledSvg>
  );
};

const StyledSvg = styled('svg', { name: 'StyledSvg', shouldForwardProp })<{ $withAnimation?: boolean }>(
  ({ $withAnimation }) => ({
    width: '100%',
    height: '100%',
    borderRadius: '50%',

    ...($withAnimation
      ? {
          animation: 'animation 1.3s linear',
          animationIterationCount: 'infinite',
        }
      : {
          filter: 'drop-shadow(0px 0px 10px #0CC2FF)',
        }),

    '@keyframes animation': {
      '0%': { transform: 'rotate(0deg)' },
      '100%': { transform: 'rotate(360deg)' },
    },
  })
);

export default GradientCircle;

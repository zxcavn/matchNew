import { useTheme } from '@mui/material';

import { AppThemeVariant } from '@/lib/xfi.lib/theme';

import { getColors } from './helpers';

type Props = {
  className?: string;
};

const Check = ({ className }: Props) => {
  const theme = useTheme();
  const { from, to } = getColors(false, theme.palette.mode === AppThemeVariant.dark);

  return (
    <svg
      className={className}
      width="100%"
      height="100%"
      viewBox="0 0 70 62"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M31.9968 61.1262C31.7899 61.1262 31.5853 61.0834 31.3957 61.0005C31.2062 60.9175 31.0358 60.7963 30.8954 60.6443L1.19734 28.5195C0.99937 28.3054 0.868125 28.0381 0.819673 27.7505C0.771221 27.4629 0.807663 27.1675 0.92454 26.9002C1.04142 26.633 1.23366 26.4057 1.47774 26.246C1.72181 26.0864 2.00714 26.0014 2.29879 26.0014H16.5938C16.8084 26.0014 17.0206 26.0474 17.2159 26.1364C17.4112 26.2254 17.5851 26.3553 17.726 26.5172L27.6512 37.9358C28.7238 35.6429 30.8003 31.8251 34.4441 27.173C39.8309 20.2955 49.8506 10.1808 66.9932 1.05005C67.3245 0.873606 67.71 0.827812 68.0734 0.921709C68.4369 1.01561 68.7519 1.24237 68.9563 1.55722C69.1608 1.87207 69.2397 2.25212 69.1775 2.62233C69.1154 2.99254 68.9167 3.32599 68.6207 3.55685C68.5553 3.608 61.9457 8.813 54.3389 18.3468C47.3381 27.1203 38.0318 41.4663 33.4524 59.9868C33.372 60.3122 33.1849 60.6013 32.921 60.8079C32.6571 61.0145 32.3316 61.1268 31.9964 61.1269L31.9968 61.1262Z"
        fill="url(#paint0_linear_74_8233)"
      />
      <defs>
        <linearGradient id="paint0_linear_74_8233" x1="88" y1="-28.5" x2="24" y2="62" gradientUnits="userSpaceOnUse">
          <stop offset="0.01" stopColor={from} />
          <stop offset="0.791772" stopColor={to} />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default Check;

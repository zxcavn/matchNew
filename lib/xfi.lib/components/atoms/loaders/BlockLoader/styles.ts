import { Box, styled } from '@mui/material';

import { shouldForwardProp } from '../../../../helpers';

const BLOCK_LOADER = 'BlockLoader';

export const classes = {
  container: `${BLOCK_LOADER}-container`,
  dotsContainer: `${BLOCK_LOADER}-dotContainer`,
  dot: `${BLOCK_LOADER}-dot`,
  dotFigure: `${BLOCK_LOADER}-dotFigure`,
};

type StylesType = {
  [key: string]: unknown;
};

type PropsType = {
  $idSvg: string;
};

export const StyledBlockLoader = styled(Box, { name: 'StyledBlockLoader', shouldForwardProp })<PropsType>(
  ({ theme, $idSvg }) => {
    const nthChild: StylesType = {};
    const dotColorsAnimationFrames: StylesType = {};
    const dotRotateAnimation: StylesType = {};

    for (let i = 0; i < 4; i++) {
      nthChild[`&:nth-of-type(${i + 1})`] = {
        animation: `dot-rotate-${i + 1} 4s calc(${i} * 4s / 4) linear infinite`,

        [`& .${classes.dotFigure}`]: {
          animation: `dot-move 4s calc(${i} * 4s/4) ease infinite`,

          '& svg *': {
            fill: theme.palette.primary.main,
          },
        },
      };

      dotColorsAnimationFrames[`${i * 25}%`] = {
        fill: theme.palette.primary.main,
      };

      dotRotateAnimation[`@keyframes dot-rotate-${i + 1}`] = {
        '0%': {
          transform: `rotate(calc(${i + 1} * 270deg - 375deg))`,
        },

        '100%': {
          transform: `rotate(calc(${i + 1} * 270deg + 0deg))`,
        },
      };
    }

    return {
      width: 0,
      height: 0,
      position: 'absolute',
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
      margin: 'auto',
      filter: `url(#${$idSvg})`,

      [`& .${classes.dot}`]: {
        width: 0,
        height: 0,
        position: 'absolute',
        left: 0,
        top: 0,

        [`& .${classes.dotFigure}`]: {
          content: '""',
          width: '1rem',
          height: '1rem',
          borderRadius: '50px',
          background: theme.palette.primary.main,
          position: 'absolute',
          left: '50%',
          transform: 'translateY(0) rotate(0deg)',
          marginLeft: 'calc(-1rem / 2)',
          marginTop: 'calc(-1rem / 2)',
        },

        ...nthChild,

        [`&:nth-of-type(5) .${classes.dotFigure}`]: {
          zIndex: 100,
          width: 'calc(1rem * 1.3)',
          height: 'calc(1rem * 1.3)',
          marginLeft: 'calc(-1rem * 0.65)',
          marginTop: 'calc(-1rem * 0.65)',
        },
      },

      dotFigure: {},

      '@keyframes dot-colors': {
        ...dotColorsAnimationFrames,

        '100%': {
          backgroundColor: theme.palette.primary.main,
        },
      },

      '@keyframes dot-move': {
        '0%': {
          transform: 'translateY(0)',
        },
        '18%, 22%': {
          transform: 'translateY(-2rem)',
        },

        '40%, 100%': {
          transform: 'translateY(0)',
        },
      },

      ...dotRotateAnimation,
    };
  }
);

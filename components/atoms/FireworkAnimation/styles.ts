import { keyframes, styled } from '@mui/material';

import { cos, sin } from './helpers';

const len = 80;
const deg = ((360 / len) * Math.PI) / 180;
const radius = 30;

const random = (max: number): number => Math.floor(Math.random() * max * 1.5);

const generateKeyframes = (i: number, colors: string[]) => {
  const firecrackerGravity = keyframes`
    from { transform: translate3d(0,0,0); }
    to { transform: translate3d(0, ${random(15) + 20}px, 0); }
  `;

  const tri = keyframes`
    from {
      transform: translate3d(-10px,-2px,0) rotate(${deg * i}rad);
      border-radius: 50%;
      background: white;
    }
    50% {
      border-radius: 0;
      box-shadow: 0px 0px ${random(2)}px ${random(2)}px ${colors[0]};
      background: ${colors[0]};
    }
    70% {
      border-radius: 0;
      opacity: 1;
    }
    90% {
      border-radius: 50%;
      background: ${colors[1]};
      box-shadow: 0px 0px ${random(5)}px ${random(5)}px ${colors[1]};
      transform: translate3d(${cos(deg * i) * radius * (random(3) + 1 / 2)}px, ${
    sin(deg * i) * radius * (random(3) + 1 / 2)
  }px, 0) rotate(${deg * i}rad) scale3d(0.9, 0.3, 1);
    }
    to {
      transform: translate3d(${cos(deg * i) * radius * (random(3) + 1 / 2)}px, ${
    sin(deg * i) * radius * (random(3) + 1 / 2)
  }px, 0) rotate(${deg * i}rad) scale3d(1.5, 0.1, 1);
      opacity: 0;
    }
  `;

  return { firecrackerGravity, tri };
};

const StyledFireworkAnimation = styled('div', { name: 'StyledFireworkAnimation' })<{
  $colors: string[];
}>(({ $colors }) => {
  const animationStyles = Array.from({ length: len }, (_, index) => index + 1).map(i => {
    const { firecrackerGravity, tri } = generateKeyframes(i, $colors);

    const delay = random(30) / 100;

    return {
      i: {
        position: 'absolute',
        width: '2px',
        height: '1px',
        left: 0,
        top: 0,
      },

      [`&:nth-of-type(${i})`]: {
        animation: `${firecrackerGravity} 1.2s linear ${delay}s 3`,
        i: {
          transformOrigin: 'center',
          animation: `${tri} 1.2s cubic-bezier(0.215, 0.61, 0.355, 1) ${delay}s 3`,
        },
      },
    };
  });

  return {
    span: {
      position: 'absolute',
      left: '7px',
      top: 0,

      ...animationStyles.reduce((acc, styles) => ({ ...acc, ...styles }), {}),
    },
  };
});

export { StyledFireworkAnimation };

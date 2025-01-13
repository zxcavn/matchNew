import { styled } from '@mui/material';
import { useEffect, useRef } from 'react';

import { type AnimationOptions, startAnimation } from './animationHelpers';

export type Props = {
  className?: string;
  animationOptions?: AnimationOptions;
};

/**
 * A React component for creating background animations using the HTML5 canvas element.
 *
 * The `BackgroundAnimation` component is used to generate dynamic background animations. It utilizes the HTML5 canvas element and provides options for configuring the animation behavior.
 *
 * @component
 *
 * @param {Props} props - The props for the component.
 * @param {string} [props.className] - An optional CSS class name to apply to the component.
 * @param {AnimationOptions} [props.animationOptions] - An optional configuration object for customizing the animation behavior.
 *
 * @returns The BackgroundAnimation component.
 */
const BackgroundAnimation = ({ className, animationOptions }: Props) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const cleanUpRef = useRef<() => void>();

  useEffect(() => {
    const hideCanvas = () => {
      if (canvasRef.current) {
        canvasRef.current.style.display = 'none';
      }
    };

    try {
      if (typeof window === 'undefined' || !canvasRef.current) return;

      cleanUpRef.current = startAnimation(canvasRef.current, animationOptions);

      window.addEventListener('beforeunload', hideCanvas);
    } catch {
      hideCanvas();
    }

    return () => {
      cleanUpRef.current?.();
      cleanUpRef.current = undefined;

      window.removeEventListener('beforeunload', hideCanvas);
    };
  }, [animationOptions]);

  return <StyledCanvas className={className} ref={canvasRef} />;
};

const StyledCanvas = styled('canvas', { name: 'StyledCanvas' })(({ theme }) => ({
  width: '100%',
  height: '100%',
  zIndex: 0,
  backgroundColor: theme.palette.background.dark,
}));

export default BackgroundAnimation;

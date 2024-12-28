import { Box, styled } from '@mui/material';
import dynamic from 'next/dynamic';
import type { ReactElement } from 'react';

import { FigureType } from '@/lib/xfi.lib/components/atoms/IconShape';
import { shouldForwardProp } from '@/lib/xfi.lib/helpers';
import { AppThemeVariant } from '@/lib/xfi.lib/theme';
import { WithKeyPrefix } from '@/shared/types';

const IconShape = dynamic(() => import('@/lib/xfi.lib/components/atoms/IconShape'), { ssr: false });

type BackgroundProps = {
  width: number;
  height: number;
  rotation: number;
  x: number;
  y: number;
};

type Props = {
  className?: string;
  figureType: FigureType;
  width?: number;
  height?: number;
  cameraFov?: number;
  badge?: ReactElement;
  backgroundProps?: BackgroundProps;
};

const ShapeBackground = ({
  className,
  figureType,
  width = 360,
  height = 360,
  cameraFov = 60,
  badge,
  backgroundProps,
}: Props) => {
  return (
    <Box position={'relative'} className={className}>
      <IconShape
        className={'shapeContainer'}
        figureType={figureType}
        width={width}
        height={height}
        cameraFov={cameraFov}
      />
      {badge}
      <StyledShapeBackground
        {...{
          $width: backgroundProps?.width ?? DEFAULT_BACKGROUND_PROPS.width,
          $height: backgroundProps?.height ?? DEFAULT_BACKGROUND_PROPS.height,
          $rotation: backgroundProps?.rotation ?? DEFAULT_BACKGROUND_PROPS.rotation,
          $x: backgroundProps?.x ?? DEFAULT_BACKGROUND_PROPS.x,
          $y: backgroundProps?.y ?? DEFAULT_BACKGROUND_PROPS.y,
        }}
      />
    </Box>
  );
};

export default ShapeBackground;

type ShapeBackgroundProps = WithKeyPrefix<Required<BackgroundProps>, '$'>;

const DEFAULT_BACKGROUND_PROPS = {
  width: 190,
  height: 642,
  rotation: 45,
  y: -100,
  x: -25,
};

const StyledShapeBackground = styled(Box, { name: 'StyledShapeBackground', shouldForwardProp })<ShapeBackgroundProps>(
  ({ theme, $width, $height, $rotation, $x, $y }) => ({
    position: 'absolute',
    top: `${$y}%`,
    right: `${$x}%`,
    display: theme.palette.mode === AppThemeVariant.dark ? 'initial' : 'none',
    width: `${$width}px`,
    height: `${$height}px`,
    borderRadius: '50%',
    backgroundColor: '#0CC2FF',
    opacity: 0.2,
    filter: 'blur(30px)',
    transform: `rotate(${$rotation}deg)`,

    [theme.breakpoints.down('md')]: {
      display: 'none',
    },
  })
);

import { Box, Stack } from '@mui/material';
import { useDocumentVisibility } from '@xfi/hooks';
import clsx from 'clsx';
import { useEffect, useMemo, useRef, useState } from 'react';

import { ResourceLinkType } from '@/shared/constants';

import ResourcesLink from '../ResourcesLink';
import { createImageText, ImageCanvas } from './image';
import { StyledResourcesImageLinks } from './styles';

type Props = {
  isMirrored?: boolean;
  startImage: ResourceLinkType;
  links: ResourceLinkType[];
};

const ResourcesImageLinks = ({ isMirrored, startImage, links }: Props) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imgResults = useMemo(() => ({} as Record<string, string[]>), []);

  const [image, setImage] = useState<ImageCanvas | null>(null);
  const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);
  const [currentImage, setCurrentImage] = useState<ResourceLinkType>(startImage);
  const [canvasSize, setCanvasSize] = useState(getCanvasSize());

  useEffect(() => {
    const handleResize = () => {
      setCanvasSize(getCanvasSize());
    };

    window.addEventListener('resize', handleResize);

    if (image && context) {
      createImageText(currentImage.src, context, imgResults, res => image.set(res));
    }

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [context, currentImage, image, imgResults]);

  const renderImage = () => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');

    if (context) {
      setImage(new ImageCanvas(context, canvasSize.width, canvasSize.height));
      setContext(context);
    }
  };

  useEffect(() => {
    renderImage();
  }, []);

  useDocumentVisibility(() => {
    renderImage();
  });

  useEffect(() => {
    if (image && context) {
      createImageText(currentImage.src, context, imgResults, res => image.set(res));
    }
  }, [image]);

  const onMouseEnter = (imageUrl: ResourceLinkType) => {
    if (context && image !== null) {
      createImageText(imageUrl.src, context, imgResults, res => image.set(res));
      setCurrentImage(imageUrl);
    }
  };

  return (
    <StyledResourcesImageLinks className={clsx({ isMirrored })} flexDirection={'row'} position={'relative'}>
      <Stack className="list">
        {links.map(item => {
          return (
            <ResourcesLink
              key={item.href}
              selected={currentImage.href === item.href}
              className={'resourceLink'}
              href={item.href}
              title={item.title}
              onMouseEnter={() => onMouseEnter(item)}
            />
          );
        })}
      </Stack>
      <Box className={clsx('canvasWrapper', { isMirrored })} position={'absolute'} right={0} top={'-7rem'}>
        <canvas ref={canvasRef} width={canvasSize.width} height={canvasSize.height} />
      </Box>
    </StyledResourcesImageLinks>
  );
};

export default ResourcesImageLinks;

const CANVAS_SIZE = {
  maxWidth: 620,
  maxHeight: 590,
};

const WIDTH_RATIO = 0.53;
const HEIGHT_RATIO = 0.5;

const getCanvasSize = () => {
  if (typeof window !== 'undefined') {
    const calculatedWidth = Math.floor(window.innerWidth * WIDTH_RATIO);
    const calculatedHeight = Math.floor(window.innerWidth * HEIGHT_RATIO);

    return {
      width: calculatedWidth > CANVAS_SIZE.maxWidth ? CANVAS_SIZE.maxWidth : calculatedWidth,
      height: calculatedHeight > CANVAS_SIZE.maxHeight ? CANVAS_SIZE.maxHeight : calculatedHeight,
    };
  } else {
    return {
      width: CANVAS_SIZE.maxWidth,
      height: CANVAS_SIZE.maxHeight,
    };
  }
};

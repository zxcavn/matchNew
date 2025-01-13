import { Backdrop } from '@mui/material';
import dynamic from 'next/dynamic';
import { HTMLAttributes } from 'react';

import { BlockLoader } from '../BlockLoader';
import { StyledLoader } from './style';

const PageLoader = dynamic(() => import('../PageLoader').then(m => m.PageLoader), { ssr: false });

export type Props = {
  variant?: 'page' | 'block';
  scale?: number;
} & HTMLAttributes<HTMLDivElement>;

/**
 * A versatile loader component for displaying loading indicators in web applications.
 *
 * The `Loader` component is designed to display loading indicators, providing visual feedback to users while data is being loaded or processed. It supports two variants: "page" and "block," which can be used to show full-page or block-level loaders. The component allows customization of the scale and other HTML attributes.
 *
 * @component
 *
 * @param {Props} props - The props for the component.
 * @param {string} [props.variant='block'] - The loader variant, which can be 'page' or 'block'. 'page' displays a full-page loader, while 'block' displays a loader within a specific block or section.
 * @param {number} [props.scale=1] - The scale factor for the loader, which adjusts its size. A larger scale increases the loader's size.
 * @param {string} [props.className] - Additional CSS class name to apply to the loader component.
 *
 * @returns {FC} The Loader component, displaying loading indicators based on the chosen variant.
 */
const Loader = (props: Props) => {
  const { variant = 'block', scale = 1, className } = props;

  return (
    <StyledLoader suppressHydrationWarning $scale={scale}>
      <Backdrop open={variant === 'block'} />
      {variant === 'page' && <PageLoader className={className} />}
      {variant === 'block' && <BlockLoader className={className} />}
    </StyledLoader>
  );
};

export default Loader;

import dynamic from 'next/dynamic';

import { Icon } from '../../../../../../components/atoms/Icon';
import { LoadingIcon } from '../../../../icons';
import AnimationFigure from '../../AnimationFigure';
import { StyledPageLoaderContainer } from './styles';
import styles from './styles.module.scss';

export type Props = { className?: string };

const BackgroundAnimation = dynamic(() => import('../../BackgroundAnimation'), {
  ssr: false,
});

/**
 * A full-page loader component for displaying during data loading or processing.
 *
 * The `PageLoader` component creates a full-page loader with animated figures and icons to indicate that a page is loading or data is being processed. It is typically used when waiting for data to load on a page.
 *
 * @component
 *
 * @param {Props} props - The props for the component.
 * @param {string} [props.className] - Additional CSS classes to apply to the component for styling.
 *
 * @returns {FC} The `PageLoader` component, which displays an animated full-page loader.
 */
const PageLoader = ({ className }: Props) => {
  return (
    <StyledPageLoaderContainer className={className}>
      <div className={styles.styledImagesContainer}>
        <AnimationFigure className="animationFigure" />
        <Icon className="loadingIcon" src={LoadingIcon} viewBox="0 0 346 55" />
      </div>
      <BackgroundAnimation />
    </StyledPageLoaderContainer>
  );
};

export default PageLoader;

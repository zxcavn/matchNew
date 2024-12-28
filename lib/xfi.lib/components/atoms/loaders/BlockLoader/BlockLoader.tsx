import clsx from 'clsx';
import { HTMLAttributes, useId } from 'react';

import { Figure } from '../../Figure';
import { classes, StyledBlockLoader } from './styles';

const DOTS_COUNT = 5;

/**
 * A block loader component for displaying animated loading dots.
 *
 * The `BlockLoader` component is used to create a block loader with animated loading dots. It's typically used to indicate ongoing processes or loading states.
 *
 * @component
 *
 * @param {Props} props - The props for the component.
 * @param {string} [props.className] - An optional CSS class name to apply to the block loader container.
 *
 * @returns {FC} The BlockLoader component.
 */
const BlockLoader = ({ className }: HTMLAttributes<HTMLDivElement>) => {
  const idSvg = useId();

  const loaderDots = Array.from({ length: DOTS_COUNT });

  return (
    <StyledBlockLoader className={clsx(classes.dotsContainer, className)} $idSvg={idSvg}>
      {loaderDots.map((v, i) => (
        <div className={classes.dot} key={i}>
          <Figure className={classes.dotFigure} />
        </div>
      ))}
    </StyledBlockLoader>
  );
};

export default BlockLoader;

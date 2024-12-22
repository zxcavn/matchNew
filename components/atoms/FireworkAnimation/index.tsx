import { HTMLAttributes } from 'react';

import { StyledFireworkAnimation } from './styles';

type Props = Omit<HTMLAttributes<HTMLDivElement>, 'children'> & {
  colors?: string[];
};

const FireworkAnimation = ({ className, colors = ['#0CC2FF', '#005271'], ...props }: Props) => {
  return (
    <StyledFireworkAnimation $colors={colors} className={className} {...props}>
      {Array.from({ length: 80 }, (_, index) => {
        return (
          <span key={index}>
            <i></i>
          </span>
        );
      })}
    </StyledFireworkAnimation>
  );
};

export default FireworkAnimation;

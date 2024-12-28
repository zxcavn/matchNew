import { useEffect, useRef } from 'react';

import { Icon } from '@/lib/xfi.lib/components/atoms';
import { HashCheckIcon as LibHashCheckIcon } from '@/lib/xfi.lib/icons';
import { useMediaQuery } from '@/lib/xfi.lib/theme';

import { StyledAnimationContainer, StyledIconAnimation, StyledIconContainer } from './styles';

const HashCheckIcon = () => {
  const animationRef = useRef<HTMLDivElement | null>(null);
  const isTablet = useMediaQuery(theme => theme.breakpoints.down('lg'));

  useEffect(() => {
    const interval = setInterval(() => {
      if (animationRef.current) {
        animationRef.current.classList.add('lightStripeAnimation');

        setTimeout(() => {
          if (animationRef.current) {
            animationRef.current.classList.remove('lightStripeAnimation');
          }
        }, 1300);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <StyledIconContainer>
      <StyledAnimationContainer>
        <StyledIconAnimation ref={animationRef} />
      </StyledAnimationContainer>
      <Icon src={LibHashCheckIcon} viewBox={'0 0 32 32'} sx={{ fontSize: isTablet ? '2rem' : '1.25rem' }} />
    </StyledIconContainer>
  );
};

export default HashCheckIcon;

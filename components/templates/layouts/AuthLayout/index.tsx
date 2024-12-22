import dynamic from 'next/dynamic';
import { PropsWithChildren } from 'react';

import { StyledAppFooter, StyledAuthHeader, StyledAuthLayout, StyledMainContent } from './styles';

const BackgroundAnimation = dynamic(() => import('@/lib/xfi.lib/components/atoms/BackgroundAnimation'), {
  ssr: false,
});

const AuthLayout = ({ children }: PropsWithChildren) => {
  return (
    <StyledAuthLayout>
      <StyledMainContent>
        <StyledAuthHeader />
        <div className="children">{children}</div>
        <BackgroundAnimation animationOptions={BG_ANIMATION_OPTIONS} className="backgroundAnimation" />
      </StyledMainContent>
      <StyledAppFooter />
    </StyledAuthLayout>
  );
};

const BG_ANIMATION_OPTIONS = {
  cameraPosition: {
    y: 320,
  },
};

export default AuthLayout;

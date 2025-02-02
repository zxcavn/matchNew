import { PropsWithChildren } from 'react';

import { StyledAppFooter, StyledAuthHeader, StyledAuthLayout, StyledMainContent } from './styles';



const AuthLayout = ({}: PropsWithChildren) => {
  return (
    <StyledAuthLayout>
      <StyledMainContent>
        <StyledAuthHeader />
      </StyledMainContent>
      <StyledAppFooter />
    </StyledAuthLayout>
  );
};

export default AuthLayout;

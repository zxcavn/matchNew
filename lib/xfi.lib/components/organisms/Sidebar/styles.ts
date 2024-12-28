import { styled } from '@mui/material';

import { BottomNavigation } from './BottomNavigation';
import { SideNavigation } from './SideNavigation';

export const StyledSideNavigation = styled(SideNavigation, { name: 'StyledSideNavigation' })(({ theme }) => ({
  zIndex: theme.zIndex.appBar,
  position: 'sticky',
  top: 0,
  height: '100vh',
}));

export const StyledBottomNavigation = styled(BottomNavigation, { name: 'StyledBottomNavigation' })(({ theme }) => ({
  position: 'sticky',
  bottom: 0,
  width: '100%',
  zIndex: theme.zIndex.appBar,
}));

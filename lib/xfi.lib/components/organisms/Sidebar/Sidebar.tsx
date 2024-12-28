import { useRouter } from 'next/router';
import { useMemo } from 'react';

import { useMediaQuery } from '../../../theme';
import { StyledBottomNavigation, StyledSideNavigation } from './styles';
import type { Props, SidebarItem } from './types';

const Sidebar = (props: Props) => {
  const { asPath } = useRouter();
  const isTablet = useMediaQuery(theme => theme.breakpoints.down('lg'));

  const isSelected = useMemo(
    () => props.isSelected || ((item: SidebarItem) => asPath.includes(item.href)),
    [asPath, props.isSelected]
  );

  const Component = isTablet ? StyledBottomNavigation : StyledSideNavigation;

  return <Component {...props} isSelected={isSelected} />;
};

export default Sidebar;

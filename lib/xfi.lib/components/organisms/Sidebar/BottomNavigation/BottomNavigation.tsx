import { Popover } from '@mui/material';
import { MouseEvent, useCallback, useMemo, useState } from 'react';

import { useNavbarOverflow } from '../../../../hooks';
import { MenuIcon, SolidCloseIcon } from '../../../../icons';
import { Icon, Tooltip } from '../../../atoms';
import { type InternalProps, type NavItem, type RenderNavItem, isSidebarItem } from '../types';
import { Background } from './Background';
import {
  StyledBottomNavigation,
  StyledButton,
  StyledCenterItemsContainer,
  StyledLink,
  StyledOverflowContainer,
  StyledSideItemsContainer,
} from './styles';

const BottomNavigation = ({ className, config: configProp, bottomConfig = [], isSelected }: InternalProps) => {
  const config = useMemo(() => {
    return [...configProp, ...bottomConfig].flatMap(category => category.items);
  }, [configProp, bottomConfig]);

  const { visibleItems, groupedVisibleItems, isOverflow, hiddenItems } = useNavbarOverflow(config);

  const hasMenuActiveItem = useMemo(
    () => !!hiddenItems.find(item => isSidebarItem(item) && isSelected(item)),
    [hiddenItems, isSelected]
  );

  const renderItem: RenderNavItem = useCallback(
    item => {
      if (!isSidebarItem(item)) return item;

      return (
        <Tooltip
          slotProps={{
            popper: {
              modifiers: [
                {
                  name: 'offset',
                  options: {
                    offset: [0, 4],
                  },
                },
              ],
            },
          }}
          enterNextDelay={150}
          disableTouchListener
          title={item.title}
          placement={'top'}
          key={item.href}
        >
          <StyledLink key={item.href} href={item.href}>
            {isSelected(item) ? item.selectedIcon : item.icon}
          </StyledLink>
        </Tooltip>
      );
    },
    [isSelected]
  );

  return (
    <StyledBottomNavigation component="nav" className={className} $isOverflow={isOverflow}>
      {isOverflow ? (
        <StyledOverflowContainer>
          {groupedVisibleItems.map((group, index) => (
            <StyledSideItemsContainer key={`group-${index}`}>{group.map(renderItem)}</StyledSideItemsContainer>
          ))}
          <div className={'round'}>
            <Menu hasActiveItem={hasMenuActiveItem} items={hiddenItems} renderItem={renderItem} />
          </div>
        </StyledOverflowContainer>
      ) : (
        <StyledCenterItemsContainer>{visibleItems.map(renderItem)}</StyledCenterItemsContainer>
      )}
      {isOverflow && <Background />}
    </StyledBottomNavigation>
  );
};

type MenuProps = {
  items: Array<NavItem>;
  renderItem: RenderNavItem;
  hasActiveItem?: boolean;
};

const Menu = ({ items, renderItem, hasActiveItem }: MenuProps) => {
  const [anchorElement, setAnchorElement] = useState<HTMLButtonElement | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorElement(event.currentTarget);
    setIsOpen(true);
  };

  const handleClose = () => {
    setAnchorElement(null);
    setIsOpen(false);
  };

  return (
    <>
      <StyledButton onClick={handleClick} disableTouchRipple disableRipple $isActive={!isOpen && hasActiveItem}>
        <Icon sx={{ fontSize: '2rem' }} src={isOpen ? SolidCloseIcon : MenuIcon} viewBox="0 0 32 32" />
      </StyledButton>
      <Popover
        anchorOrigin={{
          horizontal: 'center',
          vertical: 'top',
        }}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        anchorEl={anchorElement}
        open={isOpen}
        onClose={handleClose}
        sx={{ transform: 'translateY(-1rem)' }}
      >
        <StyledBottomNavigation sx={{ p: '1rem 1.5rem' }}>
          <StyledCenterItemsContainer sx={{ maxHeight: 'fit-content', justifyContent: 'center', flexWrap: 'wrap' }}>
            {items.map(renderItem)}
          </StyledCenterItemsContainer>
        </StyledBottomNavigation>
      </Popover>
    </>
  );
};

export default BottomNavigation;

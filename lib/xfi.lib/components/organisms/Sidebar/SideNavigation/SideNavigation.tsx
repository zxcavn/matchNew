import { Box, Stack, Typography, useTheme } from '@mui/material';
import clsx from 'clsx';
import Link from 'next/link';
import { Fragment, ReactElement, useEffect, useRef, useState } from 'react';
import { FormattedMessage } from 'react-intl';

import { CollapseToggleIcon, ColorThemeIcon, OpenToggleIcon } from '../../../../icons';
import { LocalStorageService } from '../../../../services';
import { Accordion, Divider, Icon, ThemeToggle, Tooltip } from '../../../atoms';
import type { InternalProps, SidebarItem, SidebarState } from '../types';
import { StyledSideNavigation } from './styles';

const getInitialSidebarState = (): SidebarState => LocalStorageService.getSidebarState();

const SideNavigation = ({
  config,
  bottomConfig,
  isSelected,
  logoSlot,
  isShowThemeToggle = false,
  className,
}: InternalProps) => {
  const theme = useTheme();

  const sidebarRef = useRef<HTMLDivElement | null>(null);
  const [sidebarState, setSidebarState] = useState<SidebarState>(getInitialSidebarState);

  useEffect(() => {
    LocalStorageService.setSidebarState(sidebarState);
  }, [sidebarState]);

  const isOpen = sidebarState.isOpen;
  const accordionState = sidebarState.accordionState;

  const ToggleIcon = isOpen ? CollapseToggleIcon : OpenToggleIcon;

  const handleAccordionToggle = (category: string) => {
    const newAccordionState = { ...accordionState, [category]: !accordionState[category] };

    setSidebarState({ ...sidebarState, accordionState: newAccordionState });
  };

  const renderLinkContent = (item: SidebarItem, isSelectedItem: boolean) => (
    <Link key={item.href} href={item.href} className={clsx('sidebarItem', { isSelected: isSelectedItem })}>
      <Stack width={'100%'} direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
        <Stack direction={'row'} gap={'0.5rem'} alignItems={'center'}>
          {isSelectedItem ? item.selectedIcon : item.icon}
          {isOpen && (
            <Typography variant={'body2'} color={'background.light'} noWrap>
              <FormattedMessage id={item.title} />
            </Typography>
          )}
        </Stack>
        {isOpen && item.extra}
      </Stack>
    </Link>
  );

  const renderItems = (items: SidebarItem[]) => {
    const currentItem = (item: SidebarItem, linkContent: ReactElement) =>
      !isOpen ? (
        <Tooltip
          componentsProps={tooltipComponentsProps}
          enterNextDelay={150}
          disableTouchListener
          title={item?.tooltipTitle || item.title}
          placement={'right'}
          key={item.href}
        >
          {linkContent}
        </Tooltip>
      ) : (
        <Fragment key={item.href}>{linkContent}</Fragment>
      );

    return (
      <Stack className="sidebarLinksWrapper">
        {items.map(item => {
          const isSelectedItem = isSelected(item);
          const linkContent = renderLinkContent(item, isSelectedItem);

          return currentItem(item, linkContent);
        })}
      </Stack>
    );
  };

  const toggleSidebar = () => {
    setSidebarState({ ...sidebarState, isOpen: !isOpen });
  };

  const isShowBottomSection = isShowThemeToggle || !!bottomConfig?.length;

  return (
    <StyledSideNavigation className={className} ref={sidebarRef} $isOpen={isOpen}>
      <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'} padding={'0 1rem'}>
        {isOpen && logoSlot}
        <Box role={'button'} onClick={toggleSidebar} sx={{ cursor: 'pointer' }}>
          <Icon src={ToggleIcon} viewBox={'0 0 24 24'} />
        </Box>
      </Stack>
      <div className="itemsWrapper">
        {config.map(({ category, categoryTitle, items, isBottomItems }, index) => (
          <Stack
            key={index}
            gap={isOpen ? 0 : '0.25rem'}
            width={'100%'}
            height={isBottomItems ? '100%' : 'auto'}
            justifyContent={isBottomItems ? 'end' : 'auto'}
            padding={isOpen ? '0 1rem' : '0 1.25rem'}
          >
            {category && categoryTitle && isOpen ? (
              <Accordion
                key={category}
                headerSlot={
                  <Typography
                    variant="body2"
                    fontSize={'0.75rem'}
                    color={'neutrals.secondaryText'}
                    textTransform={'capitalize'}
                  >
                    <FormattedMessage id={categoryTitle} />
                  </Typography>
                }
                isExpandedDefault={!accordionState[category]}
                isShowDivider={false}
                variant={'sidebar'}
                onChange={() => handleAccordionToggle(category)}
                detailsSlot={<div className="pagesLinksWrapper">{renderItems(items)}</div>}
              />
            ) : (
              renderItems(items)
            )}
            {!isOpen && index < config.length - 1 && <Divider sx={{ mt: '1rem' }} />}
          </Stack>
        ))}

        {isShowBottomSection && (
          <Stack
            alignItems={'flex-end'}
            width={'100%'}
            height={'min-content'}
            justifyContent={'flex-end'}
            gap={'0.5rem'}
            marginTop={'auto'}
          >
            <Divider
              sx={{
                borderColor: theme.palette.neutrals.tableLine,
                borderTopWidth: 1,
              }}
            />
            {isShowThemeToggle && (
              <Stack
                direction={'row'}
                width={'100%'}
                justifyContent={'space-between'}
                padding={isOpen ? '0.5rem 1rem 0' : '0.5rem 0.875rem 0'}
              >
                {isOpen && (
                  <Stack direction={'row'} gap={'0.5rem'} alignItems={'center'} width={'100%'} paddingInline={'0.5rem'}>
                    <Icon src={ColorThemeIcon} viewBox={'0 0 32 32'} sx={{ fontSize: '1.25rem' }} />

                    <Typography variant={'body2'} color={'background.light'} noWrap>
                      <FormattedMessage id={'LIB.SUMMARY.THEME'} />
                    </Typography>
                  </Stack>
                )}
                <Stack paddingRight={isOpen ? '0.5rem' : 0}>
                  <ThemeToggle />
                </Stack>
              </Stack>
            )}
            {bottomConfig?.map(({ items }, index) => (
              <Stack key={index} gap={isOpen ? 0 : '0.5rem'} width={'100%'} padding={isOpen ? '0 1rem' : '0 1.25rem'}>
                {renderItems(items)}
              </Stack>
            ))}
          </Stack>
        )}
      </div>
    </StyledSideNavigation>
  );
};

export const tooltipComponentsProps = {
  tooltip: {
    sx: { '&&&': { marginLeft: '1.5rem', padding: '0.69rem 0.75rem' } },
  },
};

export default SideNavigation;

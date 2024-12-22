import { Icon } from '@/lib/xfi.lib/components/atoms';
import type { SidebarCategory } from '@/lib/xfi.lib/components/organisms/Sidebar';
import {
  CosmosWalletIcon,
  EcosystemIcon,
  EvmWalletIcon,
  GovIcon,
  ResourcesIcon,
  SelectedCosmosWalletIcon,
  SelectedEcosystemIcon,
  SelectedEvmWalletIcon,
  SelectedGovIcon,
  SelectedHashCheckIcon,
  SelectedResourcesIcon,
  SelectedSettingsIcon,
  SelectedStakingIcon,
  SelectedTaskIcon,
  SelectedWalletIcon,
  SelectedXdsIcon,
  SettingsIcon,
  StakingIcon,
  TaskIcon,
  WalletIcon,
  XdsIcon,
} from '@/lib/xfi.lib/icons';
import { IS_PRODUCTION, PAGES } from '@/shared/constants';

import { HashCheckIcon } from '@/components/atoms';

const MOBILE_ICON_PROPS = { viewBox: '0 0 32 32', sx: { fontSize: '2rem' } };
const DESKTOP_ICON_PROPS = { viewBox: '0 0 32 32', sx: { fontSize: '1.25rem' } };

const getDefaultIconProps = (isTablet: boolean) => (isTablet ? MOBILE_ICON_PROPS : DESKTOP_ICON_PROPS);

export const SIDEBAR_CONFIG_NEW_BALANCE = (isTablet: boolean): SidebarCategory[] => {
  const defaultIconProps = getDefaultIconProps(isTablet);

  return [
    {
      category: 'Cosmos',
      categoryTitle: 'SUMMARY.COSMOS',
      items: [
        {
          title: 'SUMMARY.WALLET',
          tooltipTitle: 'SUMMARY.COSMOS_WALLET',
          href: PAGES.cosmosWallet.pathname,
          icon: <Icon src={CosmosWalletIcon} {...defaultIconProps} />,
          selectedIcon: <Icon src={SelectedCosmosWalletIcon} {...defaultIconProps} />,
        },
        {
          title: 'SUMMARY.STAKING',
          href: PAGES.validators.pathname,
          icon: <Icon src={StakingIcon} {...defaultIconProps} />,
          selectedIcon: <Icon src={SelectedStakingIcon} {...defaultIconProps} />,
        },
        ...(IS_PRODUCTION
          ? []
          : [
              {
                title: 'SUMMARY.GOV',
                href: PAGES.proposals.pathname,
                icon: <Icon src={GovIcon} {...defaultIconProps} />,
                selectedIcon: <Icon src={SelectedGovIcon} {...defaultIconProps} />,
              },
            ]),
      ],
    },
    {
      category: 'EVM',
      categoryTitle: 'SUMMARY.EVM',
      items: [
        {
          title: 'SUMMARY.WALLET',
          tooltipTitle: 'SUMMARY.EVM_WALLET',
          href: PAGES.evmWallet.pathname,
          icon: <Icon src={EvmWalletIcon} {...defaultIconProps} />,
          selectedIcon: <Icon src={SelectedEvmWalletIcon} {...defaultIconProps} />,
        },
        ...(IS_PRODUCTION
          ? []
          : [
              {
                title: 'SUMMARY.XDS_NAME',
                href: PAGES.xds.pathname,
                icon: <Icon src={XdsIcon} {...defaultIconProps} />,
                selectedIcon: <Icon src={SelectedXdsIcon} {...defaultIconProps} />,
                // extra: (
                //   <Box
                //     sx={{
                //       padding: '0 0.375rem',
                //       display: 'flex',
                //       backgroundColor: 'neutrals.dark',
                //       borderRadius: '0.25rem',
                //     }}
                //   >
                //     <Typography variant={'caption'} color={'neutrals.secondaryText'}>
                //       <FormattedMessage id={'SUMMARY.BETA'} />
                //     </Typography>
                //   </Box>
                // ),
              },
            ]),
      ],
    },
    ...(IS_PRODUCTION
      ? []
      : [
          {
            category: 'Testnet',
            categoryTitle: 'SUMMARY.TESTNET',
            items: [
              {
                title: 'SUMMARY.EARN_XFT',
                href: PAGES.earnXft.pathname,
                icon: <Icon src={TaskIcon} {...defaultIconProps} />,
                selectedIcon: <Icon src={SelectedTaskIcon} {...defaultIconProps} />,
              },
              {
                title: 'SUMMARY.ADDITIONAL_MPX',
                href: PAGES.hashCheck.pathname,
                icon: <Icon src={HashCheckIcon} {...defaultIconProps} />,
                selectedIcon: <Icon src={SelectedHashCheckIcon} {...defaultIconProps} />,
              },
            ],
          },
          {
            category: 'About',
            categoryTitle: 'SUMMARY.ABOUT',
            items: [
              {
                title: 'SUMMARY.RESOURCES',
                href: PAGES.resources.pathname,
                icon: <Icon src={ResourcesIcon} {...defaultIconProps} />,
                selectedIcon: <Icon src={SelectedResourcesIcon} {...defaultIconProps} />,
              },
              {
                title: 'SUMMARY.ECOSYSTEM',
                href: PAGES.ecosystem.pathname,
                icon: <Icon src={EcosystemIcon} {...defaultIconProps} />,
                selectedIcon: <Icon src={SelectedEcosystemIcon} {...defaultIconProps} />,
              },
            ],
          },
        ]),
  ];
};

export const SIDEBAR_CONFIG_OLD_BALANCE = (isTablet: boolean): SidebarCategory[] => {
  const defaultIconProps = getDefaultIconProps(isTablet);

  return [
    {
      items: [
        {
          title: 'SUMMARY.WALLET',
          href: PAGES.oldBalance.pathname,
          icon: <Icon src={WalletIcon} {...defaultIconProps} />,
          selectedIcon: <Icon src={SelectedWalletIcon} {...defaultIconProps} />,
        },
      ],
    },
  ];
};

export const SIDEBAR_BOTTOM_CONFIG = (isTablet: boolean): SidebarCategory[] => {
  const defaultIconProps = getDefaultIconProps(isTablet);

  return [
    {
      items: [
        {
          title: 'SUMMARY.SETTINGS',
          href: PAGES.settings.pathname,
          icon: <Icon src={SettingsIcon} {...defaultIconProps} />,
          selectedIcon: <Icon src={SelectedSettingsIcon} {...defaultIconProps} />,
        },
      ],
    },
  ];
};

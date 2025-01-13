import '@mui/material/styles/createPalette';

type BackgroundType = Record<'light' | 'dark', string>;

type GradientType = Record<'card' | 'sidebar' | 'mobileSidebar' | 'cardBlue' | 'cardBlack' | 'menuItemActive', string>;

type AlertsType = Record<'success' | 'error' | 'warning' | 'info', string>;

type ShadowType = Record<'primary', string>;

type NeutralsType = Record<
  | 'light'
  | 'dark'
  | 'main'
  | 'border'
  | 'secondaryText'
  | 'bg'
  | 'label'
  | 'link'
  | 'toast'
  | 'buttonText'
  | 'select'
  | 'tableLine'
  | 'sidebar',
  string
>;

type GradientBadgeType = Record<
  'lightBlue' | 'turquoise' | 'purple' | 'orange' | 'lightGreen' | 'pink' | 'mintGreen',
  { background: string; color: string }
>;

type BadgesType = Record<
  | 'send'
  | 'sendIn'
  | 'sendOut'
  | 'bond'
  | 'unbond'
  | 'claim'
  | 'receive'
  | 'rebond'
  | 'fail'
  | 'multisend'
  | 'other'
  | 'active'
  | 'ready'
  | 'jailed'
  | 'evm'
  | 'contractCall'
  | 'submitProposal'
  | {
      background: string;
      color: string;
    }
>;

declare module '@mui/material/styles/createPalette' {
  interface CommonColors {
    lightGray: string;
    gray: string;
    main?: string;
  }

  interface TypeBackground {
    dark: string;
    light: string;
  }

  interface SimplePaletteColorOptions {
    lighter?: string;
  }

  interface PaletteColor {
    lighter?: string;
  }

  interface Palette extends MuiPallete {
    [key: string]: never;
    neutrals: NeutralsType;
    badges: BadgesType;
    background: BackgroundType;
    gradient: GradientType;
    alerts: AlertsType;
    shadow: ShadowType;
    gradientBadge: GradientBadgeType;
  }

  interface PaletteOptions extends MuiPaletteOptions {
    neutrals: NeutralsType;
    badges: BadgesType;
    background: BackgroundType;
    gradient: GradientType;
    alerts: AlertsType;
    shadow: ShadowType;
    gradientBadge: GradientBadgeType;
  }
}

declare module '@mui/material/styles' {
  interface TypographyVariants {
    buttonText1: React.CSSProperties;
    buttonText2: React.CSSProperties;
    buttonText3: React.CSSProperties;
    link: React.CSSProperties;
  }

  interface Theme {
    overrides: Record<string, unknown>;
  }

  interface ThemeOptions {
    props: unknown;
  }

  // allow configuration using `createTheme`
  interface TypographyVariantsOptions {
    buttonText1?: React.CSSProperties;
    buttonText2?: React.CSSProperties;
    buttonText3?: React.CSSProperties;
    link?: React.CSSProperties;
    h1_infynyte?: React.CSSProperties;
    h2_infynyte?: React.CSSProperties;
    h3_infynyte?: React.CSSProperties;
    h4_infynyte?: React.CSSProperties;
  }
}

// Update the Typography's variant prop options
declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    h1: true;
    h2: true;
    h3: true;
    h4: true;
    h1_infynyte: true;
    h2_infynyte: true;
    h3_infynyte: true;
    h4_infynyte: true;
    subtitle1: true;
    subtitle2: true;
    body1: true;
    body2: true;
    link: true;
    buttonText1: true;
    buttonText2: true;
    buttonText3: true;
  }
}

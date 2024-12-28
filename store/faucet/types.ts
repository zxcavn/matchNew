import { DefaultState } from '@/shared/types';

export enum FaucetWidgetStep {
  OPEN_TELEGRAM = 'open_telegram',
  LOGIN_TELEGRAM = 'login_telegram',
  CLAIM = 'claim',
}

export type TgAuthTokenType = {
  token: string;
  link: string;
};

export type TgAccountType = {
  status: string;
  telegram_user: {
    id: number;
    first_name: string;
    username: string;
    photo_url: string;
    auth_date: number;
    hash: string;
    is_premium: boolean;
  };
};

export type ClaimIconType = {
  lastClaimTime: number | null;
  isLoading: boolean;
};

export type FaucetState = Omit<
  DefaultState<string> & {
    tgAuthToken: TgAuthTokenType | null;
    tgAccount: TgAccountType | null;
    step: FaucetWidgetStep;
    mpx: ClaimIconType;
    xfi: ClaimIconType;
  },
  'data'
>;

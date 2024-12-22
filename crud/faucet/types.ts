export interface TelegramUser {
  id: number;
  first_name: string;
  username: string;
  photo_url: string;
  auth_date: number;
  hash: string;
  is_premium: boolean;
}

export type LastClaimResponse = {
  last_claim_time: number;
};

export type TokenResponse = {
  token: string;
  link: string;
};

export type TelegramAuthResponse = {
  status: string;
  telegram_user: TelegramUser;
};

import { APP_ENV } from './variables';

const REGISTRATION_INTERVALS_BY_ENV: Record<string, keyof Duration> = {
  development: 'hours',
  staging: 'days',
  production: 'years',
};

export const REGISTRATION_INTERVAL: keyof Duration = REGISTRATION_INTERVALS_BY_ENV[APP_ENV] || 'months';

export const RENT_PRICE_TX_MULTIPLIER = 110n;

export enum SendNameStep {
  CHOOSE_RECIPIENT = 'CHOOSE_RECIPIENT',
  NOTICE = 'NOTICE',
  UPDATE_ADDRESS_TX = 'UPDATE_ADDRESS_TX',
  TRANSFER_OWNERSHIP_TX = 'TRANSFER_OWNERSHIP_TX',
  COMPLETE = 'COMPLETE',
}

export enum SetAsPrimaryNameStep {
  MISMATCH_ADDRESS = 'MISMATCH_ADDRESS',
  UPDATE_ADDRESS_TX = 'UPDATE_ADDRESS_TX',
  SET_AS_PRIMARY_TX = 'SET_AS_PRIMARY_TX',
  COMPLETE = 'COMPLETE',
}

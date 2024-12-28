import { combineReducers } from '@reduxjs/toolkit';

import localeReducer from '@/lib/i18n/i18n';
import addressReducer from '@/store/address/slice';
import appReducer from '@/store/app/slice';
import chainRewardsReducer from '@/store/chainRewards/slice';
import currenciesReducer from '@/store/currencies/slice';
import faucetReducer from '@/store/faucet/slice';
import govReducer from '@/store/gov/slice';
import missionReducer from '@/store/mission/slice';
import missionHistoryReducer from '@/store/missionHistory/slice';
import notificationsReducer from '@/store/notifications/slice';
import profileReducer from '@/store/profile/slice';
import statReducer from '@/store/stat/slice';
import txsReducer from '@/store/txs/slice';
import validatorsReducer from '@/store/validators/slice';
import walletReducer from '@/store/wallet/slice';
import walletTokensReducer from '@/store/walletTokens/slice';
import xdsReducer from '@/store/xds/slice';

import tokenInventoryReducer from './tokenInventory/slice';

export const rootReducer = combineReducers({
  app: appReducer,
  wallet: walletReducer,
  notifications: notificationsReducer,
  locale: localeReducer,
  validators: validatorsReducer,
  address: addressReducer,
  txs: txsReducer,
  walletTokens: walletTokensReducer,
  currencies: currenciesReducer,
  profile: profileReducer,
  missionHistory: missionHistoryReducer,
  mission: missionReducer,
  faucet: faucetReducer,
  tokenInventory: tokenInventoryReducer,
  xds: xdsReducer,
  gov: govReducer,
  stat: statReducer,
  chainRewards: chainRewardsReducer,
});

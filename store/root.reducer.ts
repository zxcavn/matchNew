import localeReducer from '@/lib/i18n/i18n';
import appReducer from '@/store/app/slice';
import govReducer from '@/store/gov/slice';
import notificationsReducer from '@/store/notifications/slice';
import walletReducer from '@/store/wallet/slice';
import xdsReducer from '@/store/xds/slice';
import { combineReducers } from '@reduxjs/toolkit';

export const rootReducer = combineReducers({
  app: appReducer,
  wallet: walletReducer,
  notifications: notificationsReducer,
  locale: localeReducer,
  xds: xdsReducer,
  gov: govReducer,
});

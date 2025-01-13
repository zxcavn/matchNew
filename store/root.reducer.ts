import localeReducer from '@/lib/i18n/i18n';
import appReducer from '@/store/app/slice';
import notificationsReducer from '@/store/notifications/slice';
import { combineReducers } from '@reduxjs/toolkit';

export const rootReducer = combineReducers({
  app: appReducer,
  notifications: notificationsReducer,
  locale: localeReducer,
});

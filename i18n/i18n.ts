import { createSlice } from '@reduxjs/toolkit';

import { LocalStorageService } from '@/services';

export const DEFAULT_LOCALE = 'en'; //TODO: change it before release or applying change lang component

export type AppLocale = 'en' | 'vi' | 'id' | 'es';

const initialState = {
  lang: DEFAULT_LOCALE,
};

const localeSlice = createSlice({
  name: 'i18n/locale',
  initialState,
  reducers: {
    setLanguage(state, { payload }: { payload: string | undefined }) {
      if (typeof window !== 'undefined') {
        LocalStorageService.setLocale(payload || DEFAULT_LOCALE);
      }

      state.lang = payload || DEFAULT_LOCALE;
    },
  },
});

export const { setLanguage } = localeSlice.actions;

export default localeSlice.reducer;

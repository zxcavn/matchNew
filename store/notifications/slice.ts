import { createSlice } from '@reduxjs/toolkit';
import uniqueId from 'lodash/uniqueId';

import { AddNotificationPayload, NotificationsInitialState, NotificationsType, SLICE_NAME } from './types';

const initialState: NotificationsInitialState = {
  drawerOpen: false,
  data: [],
};

const notificationsSlice = createSlice({
  name: SLICE_NAME,
  initialState,

  reducers: {
    setNotifications(state, { payload }: { payload: NotificationsType[] }) {
      state.data = payload;
    },
    addNotification(state, { payload }: { payload: AddNotificationPayload }) {
      const idNotice = uniqueId();

      state.data = [
        ...state.data,
        {
          id: idNotice,
          isRead: false,
          date: new Date(Date.now()).getTime(),
          ...payload,
        },
      ];
    },
    deleteNotification(state, { payload }: { payload: string }) {
      state.data = state.data.filter(({ id }) => id !== payload);
    },
    updateNotification(state, { payload }: { payload: { id: string; data: Partial<NotificationsType> } }) {
      const { id, data } = payload;
      const idx = state.data.findIndex(notification => notification.id == id);

      state.data[idx] = {
        ...state.data[idx],
        ...data,
      };
    },
  },
});

export const { setNotifications, addNotification, updateNotification } = notificationsSlice.actions;

export default notificationsSlice.reducer;

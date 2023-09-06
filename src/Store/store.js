import { configureStore } from '@reduxjs/toolkit';
import login from './Slice/getLoginSlice';
import PushMessage from './Slice/setUserMessageSlice';
import listMessage from './Slice/listMessageSlice';

export const store = configureStore({
  reducer: {
    login: login,
    pushMessage: PushMessage,
    listMessage: listMessage,
  },
});

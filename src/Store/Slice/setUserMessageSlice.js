import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  chatId: '',
  message: '',
};

export const PushMessage = createSlice({
  name: 'pushMessage',
  initialState,
  reducers: {
    setChatId: (state, action) => {
      state.chatId = action.payload;
    },
    getMessage: (state, action) => {
      state.apiTokenInstance = action.payload;
    },
  },
});

export const { setChatId, getMessage } = PushMessage.actions;

export default PushMessage.reducer;

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchDeleteMessage = createAsyncThunk(
  'listMessage/fetchDeleteIncomingMessage',

  async (params) => {
    const { userID, userAPI } = params;
    const idMessage = localStorage.getItem('idMessage');
    const response = await axios.request({
      method: 'delete',
      maxBodyLength: Infinity,
      url: `https://api.green-api.com/waInstance${userID}/deleteNotification/${userAPI}/${idMessage}`,
      headers: {},
    });

    return response;
  },
);

const initialState = {
  userDataID: '',
  userDataAPI: '',
  messages: [],
  incomingMessageID: '',
  error: null,
  status: '',
};

export const ListMessage = createSlice({
  name: 'listMessage',
  initialState,
  reducers: {
    getOutGoingMessage: (state, action) => {
      state.messages.push({ message: action.payload, type: 'outMessage' });
    },
    getIncomingMessage: (state, action) => {
      state.messages.push({ message: action.payload, type: 'incomingMessage' });
    },
    getIncomingMessageID: (state, action) => {
      state.incomingMessageID = action.payload;
    },

    setUserDataID: (state, action) => {
      state.userDataID = action.payload;
    },
    setUserDataAPI: (state, action) => {
      state.userDataAPI = action.payload;
    },
  },
  extraReducers: {
    [fetchDeleteMessage.pending]: (state, action) => {},
    [fetchDeleteMessage.fulfilled]: (state, action) => {},
    [fetchDeleteMessage.rejected]: (state, action) => {},
  },
});

export const {
  getOutGoingMessage,
  getIncomingMessage,
  setUserDataID,
  setUserDataAPI,
  getIncomingMessageID,
} = ListMessage.actions;

export default ListMessage.reducer;

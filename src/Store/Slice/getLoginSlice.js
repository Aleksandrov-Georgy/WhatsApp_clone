import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  idInstance: '',
  apiTokenInstance: '',
  userData: '',
  status: 201,
  loader: false,
  error: false,
};

export const fetchRegistrationCheck = createAsyncThunk(
  'login/fetchRegistrationCheck',

  async (params) => {
    const { id, api } = params;
    const response = await axios.request({
      method: 'get',
      maxBodyLength: Infinity,
      url: `https://api.green-api.com/waInstance${id}/getSettings/${api}`,
      headers: {},
    });
    return response;
  },
);

export const Registration = createSlice({
  name: 'login',
  initialState,
  reducers: {
    getId: (state, action) => {
      state.idInstance = action.payload;
    },
    getApi: (state, action) => {
      state.apiTokenInstance = action.payload;
    },
    getUserData: (state, action) => {
      state.status = action.payload.status;
      state.userData = action.payload;
    },
  },
  extraReducers: {
    [fetchRegistrationCheck.pending]: (state) => {
      state.loader = true;
      state.error = false;
    },
    [fetchRegistrationCheck.fulfilled]: (state, action) => {
      state.error = false;
      state.loader = false;
      state.status = action.payload.status;
    },
    [fetchRegistrationCheck.rejected]: (state, action) => {
      state.loader = false;
      state.error = true;
    },
  },
});

export const { getId, getApi, getUserData } = Registration.actions;

export default Registration.reducer;

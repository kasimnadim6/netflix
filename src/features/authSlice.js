import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  isLoading: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
      state.isLoading = false;
    },
    logout: (state) => {
      state.user = null;
    },
    startLoader: (state) => {
      state.isLoading = true;
    },
    stopLoader: (state) => {},
  },
});

export const { startLoader, stopLoader, login, logout } = authSlice.actions;

export const selectUser = (state) => state.auth;

export default authSlice.reducer;

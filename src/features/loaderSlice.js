import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoading: false,
};

const LoaderSlice = createSlice({
  name: 'loader',
  initialState,
  reducers: {
    startLoader: (state) => {
      state.isLoading = true;
    },
    stopLoader: (state) => {
      state.isLoading = false;
    },
  },
});

export const { startLoader, stopLoader } = LoaderSlice.actions;
export const selectLoadingStatus = (state) => state.loader;
export default LoaderSlice.reducer;

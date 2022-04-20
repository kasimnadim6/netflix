import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  name: '',
  current_period_start: '',
  current_period_end: '',
  isSubscribed: false,
};

export const subscriptionSlice = createSlice({
  name: 'subscription',
  initialState,
  reducers: {
    addSubscription: (state, action) => {
      state.name = action.payload.role;
      state.current_period_start = action.payload.current_period_start;
      state.current_period_end = action.payload.current_period_end;
      state.isSubscribed = true;
    },
    clearSubscription: (state) => {
      state.name = '';
      state.current_period_start = '';
      state.current_period_end = '';
      state.isSubscribed = false;
    },
  },
});

export const { addSubscription, clearSubscription } = subscriptionSlice.actions;

export const selectSubscription = (state) => state.subscription;

export default subscriptionSlice.reducer;

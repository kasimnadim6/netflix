import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/authSlice';
import subscriptionReducer from '../features/subscriptionSlice';
import loaderReducer from '../features/loaderSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    subscription: subscriptionReducer,
    loader: loaderReducer,
  },
});

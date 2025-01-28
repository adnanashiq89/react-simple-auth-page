import { configureStore } from '@reduxjs/toolkit';
import authSlice from '../features/auth/authSlice';
import appSlice from '../features/app/app.slice';

export const store = configureStore({
  reducer: {
    [appSlice.name]: appSlice.reducer,
    [authSlice.name]: authSlice.reducer,
  },
});

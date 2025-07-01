import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth.js'
import messageReducer from '../features/message.js'
export const store = configureStore({
  reducer: {
    auth: authReducer,
    message: messageReducer
  },
});

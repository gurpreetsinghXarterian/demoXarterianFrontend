import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slice/userSlice';
import casualReducer from './slice/casualSlice';
import postReducer from './slice/postsSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    casual:casualReducer,
    post:postReducer,
  },
});
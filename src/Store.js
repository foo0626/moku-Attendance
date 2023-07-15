import { configureStore } from '@reduxjs/toolkit';
import UserReducer from './User_rc';

const store = configureStore({
  reducer: {
    user: UserReducer
  }
});

export default store;

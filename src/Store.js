import { configureStore } from '@reduxjs/toolkit';
import UserReducer from './User_rc';

const store = configureStore({
  reducer: {
    member: UserReducer
  }
});

export default store;

import { configureStore } from '@reduxjs/toolkit';
import resourceSlice from './resourceSlice';
import rankSlice from './rankSlice';
import modalSlice from './modalSlice';

export const store = configureStore({
  reducer: {
    resources: resourceSlice,
    modal: modalSlice,
    rank: rankSlice
  },
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
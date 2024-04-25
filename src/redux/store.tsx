import { configureStore } from "@reduxjs/toolkit";

import modalSlice from "./modalSlice";
import rankSlice from "./rankSlice";
import resourceSlice from "./resourceSlice";

export const store = configureStore({
  reducer: {
    resources: resourceSlice,
    modal: modalSlice,
    rank: rankSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

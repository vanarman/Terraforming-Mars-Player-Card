import { StandardProjectType } from "@models/StandardProjectType";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { increaseTemperature, standardProject } from "./resourceSlice";

const initialRank: number = 24;

export const rankSlice = createSlice({
  name: "rank",
  initialState: initialRank,
  reducers: {
    adjustRank: (state, action: PayloadAction<PayloadRank>) => {
      state = state + action.payload.value;
      return state;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(
        standardProject,
        (state, action: PayloadAction<PayloadStandardProject>) => {
          // Bump rank by 1
          if (
            action.payload.type === StandardProjectType.ASTEROID ||
            action.payload.type === StandardProjectType.AQUIFER ||
            action.payload.type === StandardProjectType.GREENERY
          ) {
            state += 1;
          }
          return state;
        },
      )
      .addCase(increaseTemperature, (state) => {
        // Bump rank by 1
        state += 1;
        return state;
      });
  },
});

export const { adjustRank } = rankSlice.actions;
export default rankSlice.reducer;

interface PayloadRank {
  value: number;
}

interface PayloadStandardProject {
  type: StandardProjectType | null;
  amount?: number;
}

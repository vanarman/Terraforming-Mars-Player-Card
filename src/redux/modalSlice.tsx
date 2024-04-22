import { createSlice } from "@reduxjs/toolkit";
import { standardProject } from "./resourceSlice";
import { StandardProjectType } from "@models/StandardProjectType";

const initialRank: Record<string, boolean> = {
  "researchModalStateVisibility": false,
  "playCardModalVisibility": false,
  "actionModalVisibility": false,
  "standardProjectModalVisibility": false,
  "milestoneModalVisibility": false,
  "awardFundingModalVisibility": false,
}

export const modalSlice = createSlice({
  name: 'modal',
  initialState: initialRank,
  reducers: {
    show: (state, action) => {
      state[action.payload.modalType] = true;
    },
    hide: (state, action) => {
      state[action.payload.modalType] = false;
    },
  },
});

export const { show, hide } = modalSlice.actions;
export default modalSlice.reducer;

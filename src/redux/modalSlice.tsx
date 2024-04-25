import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialRank: Record<string, boolean> = {
  researchModalStateVisibility: false,
  playCardModalVisibility: false,
  actionModalVisibility: false,
  standardProjectModalVisibility: false,
  milestoneModalVisibility: false,
  awardFundingModalVisibility: false,
};

export const modalSlice = createSlice({
  name: "modal",
  initialState: initialRank,
  reducers: {
    show: (state, action: PayloadAction<PayloadModal>) => {
      state[action.payload.modalType] = true;
    },
    hide: (state, action: PayloadAction<PayloadModal>) => {
      state[action.payload.modalType] = false;
    },
  },
});

export const { show, hide } = modalSlice.actions;
export default modalSlice.reducer;

interface PayloadModal {
  modalType: string;
}

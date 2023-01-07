import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

export interface OnboardingState {
  onboardingCompleted: boolean;
}

const initialState: OnboardingState = {
  onboardingCompleted: false,
};

export const onboardingSlice = createSlice({
  name: "onboardingSlice",
  initialState,
  reducers: {
    setOnboardingCompleted: (state, action: PayloadAction<boolean>) => {
      state.onboardingCompleted = action.payload;
    },
  },
});

export const { setOnboardingCompleted } = onboardingSlice.actions;

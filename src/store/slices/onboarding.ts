import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface OnboardingState {
  onboardingCompleted: boolean;
}

const initialState: OnboardingState = {
  onboardingCompleted: false,
};

export const onboarding = createSlice({
  name: "onboarding",
  initialState,
  reducers: {
    setOnboardingCompleted: (state, action: PayloadAction<boolean>) => {
      state.onboardingCompleted = action.payload;
    },
  },
});

export const { setOnboardingCompleted } = onboarding.actions;

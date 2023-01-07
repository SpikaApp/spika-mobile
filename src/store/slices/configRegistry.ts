import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

interface ConfigRegistryState {
  currency: Currency;
}

const initialState: ConfigRegistryState = {
  currency: "usd",
};

export const configRegistry = createSlice({
  name: "configSlice",
  initialState,
  reducers: {
    setCurrency: (state, action: PayloadAction<Currency>) => {
      state.currency = action.payload;
    },
  },
});

export const { setCurrency } = configRegistry.actions;

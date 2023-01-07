import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

interface SecretState {
  data: EncryptedObject | null;
}

const initialState: SecretState = {
  data: null,
};

export const secretSlice = createSlice({
  name: "secretSlice",
  initialState,
  reducers: {
    setSecret: (state, action: PayloadAction<EncryptedObject>) => {
      state.data = action.payload;
    },
  },
});

export const { setSecret } = secretSlice.actions;

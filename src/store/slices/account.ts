import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

const initialState: AccountState = {
  public: [],
  master: null,
  current: null,
  latest: null,
};

export const account = createSlice({
  name: "account",
  initialState,
  reducers: {
    initMaster: (state, action: PayloadAction<EncryptedObject>) => {
      state.master = action.payload;
    },
    addAccount: (state, action: PayloadAction<SpikaAccount>) => {
      state.public.push(action.payload);
      state.latest = action.payload.index;
    },
    switchAccount: (state, action: PayloadAction<number>) => {
      state.current = action.payload;
    },
  },
});

export const { initMaster, addAccount, switchAccount } = account.actions;

import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface AccountState {
  master: Array<SpikaAccount>;
  current: number | null;
  latest: number | null;
}

interface SpikaAccount {
  index: number;
  name: string;
  data: PublicAccount;
}

interface PublicAccount {
  address: string;
  pubKey: string;
  authKey?: string;
}

const initialState: AccountState = {
  master: [],
  current: null,
  latest: null,
};

export const account = createSlice({
  name: "account",
  initialState,
  reducers: {
    addAccount: (state, action: PayloadAction<SpikaAccount>) => {
      state.master.push(action.payload);
      state.latest = action.payload.index;
    },
    switchAccount: (state, action: PayloadAction<number>) => {
      state.current = action.payload;
    },
  },
});

export const { addAccount, switchAccount } = account.actions;

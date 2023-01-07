import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

export interface AccountRegistryState {
  current: AccountRecord;
  registry: Array<AccountRecord>;
}

interface AccountRecord {
  hdPath: number;
  name: string;
}

const initialState: AccountRegistryState = {
  current: { hdPath: 0, name: "Account 1" },
  registry: [{ hdPath: 0, name: "Account 1" }],
};

export const accountRegistry = createSlice({
  name: "accountRegistry",
  initialState,
  reducers: {
    changeCurrentHDPath: (state, action: PayloadAction<AccountRecord>) => {
      state.current = action.payload;
    },
    addHDPath: (state, action: PayloadAction<AccountRecord>) => {
      state.registry.push(action.payload);
    },
    assignHDPathName: (state, action: PayloadAction<AccountRecord>) => {
      const data = state.registry.find((account) => account.hdPath === action.payload.hdPath);
      if (data) {
        const result = state.registry.filter((account) => account.hdPath !== action.payload.hdPath);
        result.push(action.payload);
        result.sort((a: AccountRecord, b: AccountRecord) => a.hdPath - b.hdPath);
        state.registry = result;
      }
    },
  },
});

export const { changeCurrentHDPath, addHDPath, assignHDPathName } = accountRegistry.actions;

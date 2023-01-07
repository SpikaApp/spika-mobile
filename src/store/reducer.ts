import AsyncStorage from "@react-native-async-storage/async-storage";
import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";

import {
  accountRegistry,
  assetRegistry,
  configRegistry,
  networkRegistry,
  onboardingSlice,
  secretSlice,
} from "./slices";

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
};

const rootReducer = combineReducers({
  onboarding: onboardingSlice.reducer,
  secret: secretSlice.reducer,
  accountRegistry: accountRegistry.reducer,
  assetRegistry: assetRegistry.reducer,
  networkRegistry: networkRegistry.reducer,
  configRegistry: configRegistry.reducer,
});

export const persistedReducer = persistReducer(persistConfig, rootReducer);

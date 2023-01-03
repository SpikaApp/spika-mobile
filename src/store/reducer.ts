import AsyncStorage from "@react-native-async-storage/async-storage";
import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";

import { onboarding } from "./slices/onboarding";

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
};

const rootReducer = combineReducers({
  onboarding: onboarding.reducer,
});

export const persistedReducer = persistReducer(persistConfig, rootReducer);

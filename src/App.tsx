import { StatusBar } from "react-native";
import "react-native-gesture-handler";
import { Provider as PaperProvider } from "react-native-paper";
import { Provider } from "react-redux";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import { Feather } from "@expo/vector-icons";

import { Routes } from "./Routes";
import { store } from "./store";
import { theme } from "./theme";

const persistor = persistStore(store);

export const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <PaperProvider
          theme={theme}
          settings={{
            icon: (props) => <Feather {...props} />,
          }}
        >
          <StatusBar barStyle={"default"} />
          <Routes />
        </PaperProvider>
      </PersistGate>
    </Provider>
  );
};

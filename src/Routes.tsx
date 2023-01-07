import { NavigationContainer } from "@react-navigation/native";
import type { StackScreenProps } from "@react-navigation/stack";
import { createStackNavigator } from "@react-navigation/stack";
import "react-native-gesture-handler";
import { useSelector } from "react-redux";

import { Toolbar } from "./components";
import { Asset, ConfirmSeed, GenerateSeed, Home, InitAccount, Onboarding, Send, Terms } from "./screens";
import { ImportAccount } from "./screens/Onboarding/ImportAccount";
import type { RootState } from "./store";
import { LightTheme } from "./theme";

export type RootStackScreenProps<T extends keyof RootStackParamList> = StackScreenProps<RootStackParamList, T>;

export type RootStackParamList = {
  Home: BaseScreenProps;
  Onboarding: BaseScreenProps;
  Terms: TermsScreenProps;
  GenerateSeed: BaseScreenProps;
  ConfirmSeed: ConfirmSeedScreenProps;
  ImportAccount: BaseScreenProps;
  InitAccount: InitAccountProps;
  Asset: AssetScreenProps;
  Send: AssetScreenProps;
};

const Stack = createStackNavigator<RootStackParamList>();

export const Routes = () => {
  const onboardingCompleted = useSelector((state: RootState) => state.onboarding.onboardingCompleted);

  return (
    <NavigationContainer theme={LightTheme}>
      <Stack.Navigator
        initialRouteName={onboardingCompleted ? "Home" : "Onboarding"}
        screenOptions={{ header: (props) => Toolbar(props) }}
      >
        {!onboardingCompleted && (
          <>
            <Stack.Screen name="Onboarding" component={Onboarding} />
            <Stack.Screen name="Terms" component={Terms} />
            <Stack.Screen name="GenerateSeed" component={GenerateSeed} />
            <Stack.Screen name="ConfirmSeed" component={ConfirmSeed} />
            <Stack.Screen name="ImportAccount" component={ImportAccount} />
            <Stack.Screen name="InitAccount" component={InitAccount} />
          </>
        )}

        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Asset" component={Asset} />
        <Stack.Screen name="Send" component={Send} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

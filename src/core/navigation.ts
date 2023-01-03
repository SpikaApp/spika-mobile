import type { StackNavigationProp } from "@react-navigation/stack";

import type { RootStackParamList } from "../Routes";

export const getRouteParams = (navigation: StackNavigationProp<RootStackParamList>) => {
  const { index } = navigation.getState();
  return navigation.getState().routes[index]?.params;
};

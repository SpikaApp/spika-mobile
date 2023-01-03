import type { StackHeaderProps } from "@react-navigation/stack";
import { useEffect, useState } from "react";
import { Appbar, Text } from "react-native-paper";

import { styles } from "./styles";

export const Toolbar = ({ navigation, back }: StackHeaderProps) => {
  const [title, setTitle] = useState<string | undefined>(undefined);

  useEffect(() => {
    const { index } = navigation.getState();
    const route = navigation.getState().routes[index];
    const props = route?.params as BaseScreenProps;
    if (!props) {
      setTitle(undefined);
    } else {
      setTitle(props.displayName);
    }
  }, [navigation]);

  return (
    <Appbar.Header mode="center-aligned" elevated={true} style={styles.header}>
      {back ? <Appbar.BackAction onPress={navigation.goBack} /> : null}
      <Appbar.Content title={title && <Text variant="titleMedium">{title}</Text>} />
    </Appbar.Header>
  );
};

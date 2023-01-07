import { View } from "react-native";
import { Card, Text } from "react-native-paper";

import { shortenAddress } from "../../utils/shortenAddress";

import { styles } from "./styles";

type AccountCardProps = {
  name: string;
  address: string;
};

export const AccountCard = ({ name, address }: AccountCardProps) => {
  return (
    <Card mode="contained" style={styles.container}>
      <Card.Content style={styles.contentContainer}>
        <View style={styles.textContainer}>
          <Text numberOfLines={1} variant={"titleMedium"}>
            {name}
          </Text>
          <Text numberOfLines={1} variant={"bodyMedium"} style={styles.addressText}>
            {shortenAddress(address)}
          </Text>
        </View>
      </Card.Content>
    </Card>
  );
};

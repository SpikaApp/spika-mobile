import { ImageBackground, Linking, View } from "react-native";
import { Button, Text } from "react-native-paper";

import background from "../../assets/images/background.png";
import type { RootStackScreenProps } from "../../Routes";
import { baseline } from "../../theme";

import { styles } from "./styles";
const supportDocsUrl = "https://docs.spika.app";
const supportEmailAddress = "mailto:support@spika.app";

export const Onboarding = ({ navigation }: RootStackScreenProps<"Onboarding">) => {
  return (
    <View style={baseline.baseContainerNoMarginY}>
      <View style={styles.contentWrapper}>
        <View style={styles.welcomeTextWrapper}>
          <Text variant="displayLarge" style={styles.textLayout}>
            Welcome!
          </Text>
        </View>
        <View style={styles.textAreaWrapper}>
          <Text variant="titleMedium" style={styles.textLayout}>
            Create or import existing account to start working with wallet.
          </Text>
        </View>
        <View style={styles.buttons}>
          <Button
            mode="contained"
            onPress={() => {
              navigation.navigate("Terms", { displayName: "Terms of Service", nextRoute: "generate" });
            }}
          >
            Create Account
          </Button>
          <Button
            mode="outlined"
            style={{ marginTop: 30 }}
            onPress={() => {
              navigation.navigate("Terms", { displayName: "Terms of Service", nextRoute: "import" });
            }}
          >
            Import Account
          </Button>
        </View>
      </View>
      <View style={styles.helperWrapper}>
        <View style={styles.helpTextWrapper}>
          <Text variant="bodyMedium" style={styles.textLayout}>
            Need help setting up your account?
          </Text>
          <Text variant="bodyMedium" style={styles.textLayout}>
            Check{" "}
            <Text onPress={() => Linking.openURL(supportDocsUrl)} style={styles.link}>
              guidelines
            </Text>{" "}
            or contact{" "}
            <Text onPress={() => Linking.openURL(supportEmailAddress)} style={styles.link}>
              support
            </Text>{" "}
            for assistance.
          </Text>
        </View>
        <ImageBackground source={background} style={styles.background} />
      </View>
    </View>
  );
};

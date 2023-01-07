import { useContext, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { Avatar, Snackbar, Text } from "react-native-paper";

import { UIContext } from "../../context/UIContext";
import { theme } from "../../theme";
import { sleep } from "../../utils/sleep";

export const Alert = () => {
  const { openAlert, setOpenAlert, alertMessage } = useContext(UIContext);
  const onDismissAlert = () => setOpenAlert(false);

  useEffect(() => {
    const handleDismissAlert = async () => {
      await sleep(5000);
      setOpenAlert(false);
    };
    if (openAlert) {
      handleDismissAlert();
    }
  }, [openAlert, setOpenAlert]);

  return (
    <View style={styles.container}>
      <Snackbar visible={openAlert} onDismiss={onDismissAlert} style={styles.alert}>
        <View style={styles.contentContainer}>
          <Avatar.Icon icon="check-circle" size={30} style={styles.icon} color={theme.colors.trend.green} />
          <Text variant="titleMedium" style={styles.text}>
            {alertMessage}
          </Text>
        </View>
      </Snackbar>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
  },
  alert: {
    backgroundColor: "rgba(0, 0, 0, 0.6)",
  },
  contentContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
  icon: {
    alignSelf: "center",
    marginRight: 6,
    backgroundColor: "rgba(0, 0, 0, 0)",
  },
  text: {
    color: theme.colors.onPrimary,
    alignSelf: "center",
  },
});

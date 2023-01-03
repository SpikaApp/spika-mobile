import { Pressable, View } from "react-native";
import AnimatedCheckbox from "react-native-checkbox-reanimated";
import { Text } from "react-native-paper";

import { theme } from "../../theme";

interface CheckboxProps {
  onPress: () => void;
  checked: boolean;
  text: string;
  size: "medium" | "large";
  position: "flex-start" | "center" | "flex-end";
}

export const Checkbox = ({ onPress, checked, text, size, position }: CheckboxProps) => {
  return (
    <Pressable onPress={onPress}>
      <View
        style={{
          flexDirection: "row",
          alignItems: position === "flex-end" ? "center" : position,
          justifyContent: position === "flex-end" ? "space-between" : position,
        }}
      >
        {position === "flex-end" && <Text variant={size === "medium" ? "titleMedium" : "titleLarge"}>{text}</Text>}
        <View
          style={{
            width: size === "medium" ? 26 : 32,
            height: size === "medium" ? 26 : 32,
          }}
        >
          <AnimatedCheckbox
            checked={checked}
            highlightColor={theme.colors.primary}
            checkmarkColor={theme.colors.onPrimary}
            boxOutlineColor={theme.colors.outline}
          />
        </View>
        {(position === "flex-start" || position === "center") && (
          <Text variant={size === "medium" ? "titleMedium" : "titleLarge"} style={{ marginLeft: 12 }}>
            {text}
          </Text>
        )}
      </View>
    </Pressable>
  );
};

import { ComponentProps } from "react";
import { Ionicons } from "@expo/vector-icons";
import {
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
  useColorScheme,
} from "react-native";
import { ThemedText } from "./ThemedText";
import { Colors } from "@/constants/Colors";

interface NotionButtonProps {
  onPress: () => void;
  title?: string;
  iconName?: ComponentProps<typeof Ionicons>["name"];
  containerStyle?: StyleProp<ViewStyle>;
}
export default function NotionButton({
  onPress,
  iconName,
  title,
  containerStyle,
}: NotionButtonProps) {
  const theme = useColorScheme();
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.container,
        {
          backgroundColor: Colors[theme!].backgroundSecondary,
          borderRadius: title ? 6 : 40,
        },
        containerStyle,
      ]}
    >
      {iconName && (
        <Ionicons name={iconName} size={16} color={Colors[theme!].text} />
      )}
      {title && (
        <ThemedText
          darkColor="white"
          lightColor="black"
          style={{ fontSize: 14, lineHeight: 0, fontWeight: "600" }}
        >
          {title}
        </ThemedText>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 7,
    borderRadius: 40,
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
  },
});

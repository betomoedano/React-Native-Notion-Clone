import { StyleSheet, TouchableOpacity, useColorScheme } from "react-native";

import { ThemedText } from "@/components/ThemedText";
import { extendedClient } from "@/myDbModule";
import { Colors } from "@/constants/Colors";
import { LinearGradient } from "expo-linear-gradient";
import { getRandomGradient } from "@/constants/Gradients";
import { useMemo } from "react";
import Animated, {
  LinearTransition,
  SlideInLeft,
  SlideOutLeft,
} from "react-native-reanimated";
import { NotionFile } from "@prisma/client/react-native";

export default function ResentFileCard({
  id,
  title,
  coverPhoto,
  icon,
}: NotionFile) {
  const theme = useColorScheme();
  const color = useMemo(() => getRandomGradient(), []);
  return (
    <Animated.View
      layout={LinearTransition}
      entering={SlideInLeft}
      exiting={SlideOutLeft}
      style={{
        borderRadius: 16,
        backgroundColor: Colors[theme!].background,
        shadowColor: theme === "dark" ? "#ffffff20" : "black",
        shadowRadius: 4,
        shadowOffset: { height: 2, width: 0 },
        shadowOpacity: 0.09,
      }}
    >
      <TouchableOpacity
        onLongPress={() => extendedClient.notionFile.delete({ where: { id } })}
        style={[
          styles.container,
          {
            backgroundColor: Colors[theme!].backgroundSecondary,
            borderColor: Colors[theme!].text + "20",
          },
        ]}
      >
        {coverPhoto ? (
          <></>
        ) : (
          <LinearGradient
            colors={color}
            style={{
              height: 60,
              borderTopLeftRadius: 16,
              borderTopRightRadius: 16,
            }}
          />
        )}
        <ThemedText style={styles.icon}>{icon}</ThemedText>
        <ThemedText
          style={{
            fontWeight: "600",
            padding: 6,
            paddingTop: 16,
            lineHeight: 18,
          }}
          numberOfLines={2}
        >
          {title}
        </ThemedText>
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 120,
    height: 120,
    borderRadius: 16,
    borderWidth: 0.5,
  },
  icon: {
    fontSize: 32,
    lineHeight: 36,
    position: "absolute",
    top: 40,
    left: 6,
  },
});

import { StyleSheet, ScrollView, useColorScheme, View } from "react-native";

import { ThemedText } from "@/components/ThemedText";
import { extendedClient } from "@/myDbModule";
import ResentFileCard from "./ResentFileCard";
import { Colors } from "@/constants/Colors";

export default function ResentFiles() {
  const theme = useColorScheme();
  const files = extendedClient.notionFile.useFindMany({
    orderBy: { createdAt: "desc" },
    take: 6,
    where: { parentFileId: { equals: null } },
  });

  return (
    <View style={styles.container}>
      <ThemedText
        type="defaultSemiBold"
        style={{
          color: Colors[theme!].text + "90",
          padding: 10,
        }}
      >
        Jump back in
      </ThemedText>
      {!files.length && (
        <ThemedText
          style={{ color: "gray", textAlign: "center", paddingTop: 12 }}
          type="default"
        >
          Nothing to show!
        </ThemedText>
      )}
      <ScrollView
        contentContainerStyle={{ gap: 12, paddingHorizontal: 10 }}
        horizontal
        showsHorizontalScrollIndicator={false}
      >
        {files.map((file) => (
          <ResentFileCard key={file.id} {...file} />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
  },
});

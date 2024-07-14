import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  View,
} from "react-native";

import { ThemedView } from "@/components/ThemedView";
import { extendedClient } from "@/myDbModule";
import { ThemedText } from "@/components/ThemedText";
import { Link } from "expo-router";

export default function ExploreScreen() {
  const today = new Date();
  const startOfToday = new Date(today.setHours(0, 0, 0, 0));
  const endOfToday = new Date(today.setHours(23, 59, 59, 999));
  const startOfLastWeek = new Date(startOfToday);
  startOfLastWeek.setDate(startOfToday.getDate() - startOfToday.getDay() - 6); // Start of last week (7 days ago)
  const endOfLastWeek = new Date(startOfToday);
  endOfLastWeek.setDate(startOfToday.getDate() - startOfToday.getDay()); // End of last week (yesterday)

  const todayFiles = extendedClient.notionFile.useFindMany({
    where: {
      updatedAt: {
        gte: startOfToday,
        lte: endOfToday,
      },
    },
    orderBy: {
      updatedAt: "desc",
    },
  });

  const lastWeekFiles = extendedClient.notionFile.useFindMany({
    where: {
      updatedAt: {
        gte: startOfLastWeek,
        lte: endOfLastWeek,
      },
    },
    orderBy: {
      updatedAt: "desc",
    },
  });

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.container}>
        <ScrollView
          style={styles.container}
          contentContainerStyle={{ padding: 15 }}
        >
          <View style={styles.section}>
            <ThemedText type="defaultSemiBold">Today</ThemedText>
            {todayFiles.map((file) => (
              <Link
                key={file.id}
                href={{
                  pathname: "new-notion",
                  params: { viewingFile: JSON.stringify(file) },
                }}
                asChild
              >
                <TouchableOpacity style={styles.item}>
                  <ThemedText style={{ color: "#007AFF" }}>
                    - {file.icon} {file.title}
                  </ThemedText>
                </TouchableOpacity>
              </Link>
            ))}
          </View>
          <View style={styles.section}>
            <ThemedText type="defaultSemiBold">Last week</ThemedText>
            {lastWeekFiles.map((file) => (
              <Link
                key={file.id}
                href={{
                  pathname: "new-notion",
                  params: { viewingFile: JSON.stringify(file) },
                }}
                asChild
              >
                <TouchableOpacity style={styles.item}>
                  <ThemedText style={{ color: "#007AFF" }}>
                    - {file.icon} {file.title}
                  </ThemedText>
                </TouchableOpacity>
              </Link>
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  section: {
    marginBottom: 15,
  },
  item: {
    marginBottom: 8,
  },
});

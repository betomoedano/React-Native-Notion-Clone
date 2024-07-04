import {
  Image,
  StyleSheet,
  Platform,
  Button,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";

import { HelloWave } from "@/components/HelloWave";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { extendedClient } from "@/myDbModule";
import { Link, Stack } from "expo-router";
import ResentFiles from "@/components/ResentFiles";
import DraggableNotionList from "@/components/DraggableNotionList";

export default function HomeScreen() {
  const user = extendedClient.user.useFindFirst({ where: { id: 1 } });

  const createUser = () => {
    const newUser = { name: "Beto", email: "beto@expo.dev" };
    extendedClient.user.create({ data: newUser });
  };
  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.container}>
        {/* <Button title="user" onPress={createUser} /> */}
        <ResentFiles />
        <DraggableNotionList />
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

import { StyleSheet, SafeAreaView } from "react-native";

import { ThemedView } from "@/components/ThemedView";
import { extendedClient } from "@/myDbModule";
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

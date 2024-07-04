import * as React from "react";
import {
  StyleSheet,
  ScrollView,
  useColorScheme,
  TextInput,
  Keyboard,
  View,
  InputAccessoryView,
  KeyboardAvoidingView,
  Alert,
  Button,
  Pressable,
  Text,
  FlatList,
} from "react-native";

import { ThemedView } from "@/components/ThemedView";
import { MarkdownTextInput } from "@expensify/react-native-live-markdown";
import { markdownDarkStyle, markdownStyle } from "@/constants/MarkdownStyle";
import { Colors } from "@/constants/Colors";
import {
  Redirect,
  Stack,
  useLocalSearchParams,
  useNavigation,
  useRouter,
} from "expo-router";
import NotionButton from "@/components/NotionButton";
import { extendedClient } from "@/myDbModule";
import { ThemedText } from "@/components/ThemedText";

const EXAMPLE_CONTENT = [
  "# Insert subtitle here!",
  "Hello, *world*! I'm excited to share this with you.",
  "Visit my website: codewithbeto.dev",
  "> This is a blockquote, a great way to highlight quotes or important notes.",
  "`inline code` is useful for highlighting code within a sentence.",
  "Here's a code block example:",
  "```\n// Codeblock\nconsole.log('🚀 Ready to launch!');\n```",
  "Mentions:",
  "- @here (notify everyone)",
  "- @beto@expo.dev (mention a specific user)",
  "Use #hashtags to organize content, like this: #mention-report",
].join("\n");
const inputAccessoryViewID = "newNotion";
const defaultIcons = [
  "🚀",
  "👻",
  "🎨",
  "🎤",
  "🥁",
  "🎲",
  "📱",
  "🌟",
  "🔥",
  "💡",
  "🚗",
  "🌈",
  "📚",
  "💻",
  "🎧",
  "🏆",
  "⚽",
  "🍔",
  "🎂",
  "🎵",
  "✈️",
  "🎮",
  "🌍",
  "🍕",
  "📷",
  "📅",
  "🔍",
  "🔧",
  "📝",
  "🛠️",
  "💼",
  "📞",
  "📈",
  "🏠",
  "🎉",
];

const randomIcon = () =>
  defaultIcons[Math.floor(Math.random() * defaultIcons.length)];

export default function NewNotionScreen() {
  const theme = useColorScheme();
  const navigation = useNavigation();
  const routeParams = useLocalSearchParams<{ parentId?: string }>();
  const router = useRouter();
  const titleRef = React.useRef<TextInput>(null);
  const [title, setTitle] = React.useState("");
  const [text, setText] = React.useState("");
  const [icon, setIcon] = React.useState("");

  const backgroundColor = Colors[theme!].background as any;
  const textColor = Colors[theme!].text as any;

  React.useEffect(() => {
    if (titleRef.current) {
      titleRef.current?.focus();
    }
  }, [theme]);

  function handleSaveNotionFile() {
    if (!title) return;
    try {
      extendedClient.notionFile.create({
        data: {
          title: title,
          description: "",
          coverPhoto: "",
          icon: icon ?? randomIcon(),
          content: text,
          authorId: 1,
          type: "default",
          parentFileId: routeParams.parentId
            ? Number(routeParams.parentId)
            : null,
        },
      });

      setTitle("");
      setText("");
      router.setParams({ parentId: "" });
      router.replace("/(tabs)/");
    } catch (e) {
      Alert.alert("Something went wrong :(");
    }
  }
  return (
    <ThemedView style={{ flex: 1 }}>
      <Stack.Screen
        options={{
          headerRight: () =>
            title ? (
              <NotionButton
                title="Done"
                onPress={handleSaveNotionFile}
                containerStyle={{ marginRight: 10 }}
              />
            ) : (
              <NotionButton
                iconName="close"
                onPress={() => {
                  router.setParams({ parentId: "" });
                  navigation.goBack();
                }}
                containerStyle={{ marginRight: 10 }}
              />
            ),
        }}
      />

      <ScrollView keyboardShouldPersistTaps="always">
        <ThemedView style={styles.container}>
          {icon && (
            <Text style={{ fontSize: 60, marginBottom: 6 }}>{icon}</Text>
          )}
          <TextInput
            ref={titleRef}
            placeholder="Untitled"
            value={title}
            onChangeText={setTitle}
            style={{ fontSize: 32, fontWeight: "bold", color: textColor }}
            blurOnSubmit={false}
            inputAccessoryViewID={inputAccessoryViewID}
          />
          <MarkdownTextInput
            key={theme}
            value={text}
            placeholder="Tap here to continue..."
            onChangeText={setText}
            style={{ color: textColor, lineHeight: 28 }}
            markdownStyle={theme === "dark" ? markdownDarkStyle : markdownStyle}
            inputAccessoryViewID={inputAccessoryViewID}
            multiline
          />
        </ThemedView>
      </ScrollView>

      <InputAccessoryView
        nativeID={inputAccessoryViewID}
        backgroundColor={backgroundColor}
      >
        <View style={[styles.accesoryView, { borderColor: textColor + "20" }]}>
          <View style={{ flexDirection: "row", gap: 7 }}>
            <NotionButton
              iconName="sparkles"
              title="AI"
              onPress={() => setText(EXAMPLE_CONTENT)}
            />
            <NotionButton iconName="images" onPress={() => {}} />
          </View>
          <ScrollView
            horizontal
            contentContainerStyle={{ gap: 6 }}
            style={{ paddingHorizontal: 7 }}
            showsHorizontalScrollIndicator={false}
          >
            {defaultIcons.map((icon) => (
              <Pressable key={icon} onPress={() => setIcon(icon)}>
                <ThemedText type="subtitle">{icon}</ThemedText>
              </Pressable>
            ))}
          </ScrollView>
          <NotionButton
            iconName="arrow-down"
            onPress={() => Keyboard.dismiss()}
          />
        </View>
      </InputAccessoryView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 10 },
  accesoryView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 7,
    height: 50,
    borderTopWidth: 0.5,
  },
});

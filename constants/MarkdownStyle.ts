import { Platform } from "react-native";
import type { MarkdownStyle } from "@expensify/react-native-live-markdown";
import { Colors } from "./Colors";

const FONT_FAMILY_MONOSPACE = Platform.select({
  ios: "Courier",
  default: "monospace",
});

export const markdownStyle: MarkdownStyle = {
  syntax: {
    color: Colors.light.text,
  },
  link: {
    color: Colors.light.tint,
  },
  h1: {
    fontSize: 22,
  },
  emoji: {
    fontSize: 32,
  },
  blockquote: {
    borderColor: Colors.light.tint,
    borderWidth: 2,
    marginLeft: 6,
    paddingLeft: 6,
  },
  code: {
    fontFamily: FONT_FAMILY_MONOSPACE,
    fontSize: 16,
    color: Colors.light.text,
    backgroundColor: "#00000010",
  },
  pre: {
    fontFamily: FONT_FAMILY_MONOSPACE,
    fontSize: 16,
    color: Colors.light.text,
    backgroundColor: "#00000010",
  },
  mentionHere: {
    color: Colors.light.text,
    backgroundColor: "yellow",
  },
  mentionUser: {
    color: Colors.light.text,
    backgroundColor: "cyan",
  },
};

export const markdownDarkStyle: MarkdownStyle = {
  syntax: {
    color: Colors.dark.text,
  },
  link: {
    color: Colors.dark.tint,
  },
  h1: {
    fontSize: 22,
  },
  emoji: {
    fontSize: 32,
  },
  blockquote: {
    borderColor: Colors.dark.tint,
    borderWidth: 2,
    marginLeft: 6,
    paddingLeft: 6,
  },
  code: {
    fontFamily: FONT_FAMILY_MONOSPACE,
    fontSize: 16,
    color: Colors.dark.tint,
    backgroundColor: "#ffffff10",
  },
  pre: {
    fontFamily: FONT_FAMILY_MONOSPACE,
    fontSize: 16,
    color: Colors.dark.text,
    backgroundColor: "#00000010",
  },
  mentionHere: {
    color: Colors.light.text,
    backgroundColor: "yellow",
  },
  mentionUser: {
    color: "white",
    backgroundColor: "#0891b2",
  },
};

import { LinearGradientProps } from "expo-linear-gradient";

const gradients = [
  { name: "Oceanic", colors: ["#0093E9", "#80D0C7"] },
  { name: "Cotton Candy", colors: ["#D9AFD9", "#97D9E1"] },
  { name: "Sunset", colors: ["#FAD961", "#F76B1C"] },
  { name: "Beachside", colors: ["#00CDAC", "#02AAB0"] },
  { name: "Peachy", colors: ["#FFA751", "#FFE259"] },
  { name: "Pumpkin", colors: ["#D4145A", "#FBB03B"] },
  { name: "Arendelle", colors: ["#9796f0", "#fbc7d4"] },
  { name: "High Tide", colors: ["#0082C8", "#667DB6"] },
];

export function getRandomGradient(): LinearGradientProps["colors"] {
  const randomIndex = Math.floor(Math.random() * gradients.length);
  return gradients[randomIndex].colors;
}

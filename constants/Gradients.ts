import { LinearGradientProps } from "expo-linear-gradient";

const gradients = [
  { name: "Oceanic", colors: ["#0093E9", "#80D0C7"] },
  { name: "Cotton Candy", colors: ["#D9AFD9", "#97D9E1"] },
  { name: "Gotham", colors: ["#2C3E50", "#4CA1AF"] },
  { name: "Sunset", colors: ["#FAD961", "#F76B1C"] },
  { name: "Mojave", colors: ["#FF9966", "#FF5E62"] },
  { name: "Beachside", colors: ["#00CDAC", "#02AAB0"] },
  { name: "Gunmetal", colors: ["#7F8C8D", "#000000"] },
  { name: "Peachy", colors: ["#FFA751", "#FFE259"] },
  { name: "Seafoam", colors: ["#16A085", "#F4D03F"] },
  { name: "Pumpkin", colors: ["#D4145A", "#FBB03B"] },
  { name: "Pandora", colors: ["#20002c", "#cbb4d4"] },
  { name: "Valentine", colors: ["#3F5EFB", "#FC466B"] },
  { name: "Hawaii", colors: ["#11998e", "#38ef7d"] },
  { name: "Lavender", colors: ["#C471F5", "#FA71CD"] },
  { name: "Wintergreen", colors: ["#52c234", "#061700"] },
  { name: "Huckleberry", colors: ["#614385", "#516395"] },
  { name: "Blue Steel", colors: ["#4B79A1", "#283E51"] },
  { name: "Arendelle", colors: ["#9796f0", "#fbc7d4"] },
  { name: "Beam of Light", colors: ["#FFA17F", "#00223E"] },
  { name: "Safari Sunset", colors: ["#151515", "#FFA17F"] },
  { name: "High Tide", colors: ["#0082C8", "#667DB6"] },
];

export function getRandomGradient(): LinearGradientProps["colors"] {
  const randomIndex = Math.floor(Math.random() * gradients.length);
  return gradients[randomIndex].colors;
}

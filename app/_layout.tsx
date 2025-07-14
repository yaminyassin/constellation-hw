import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { StrictMode } from "react";
import "react-native-reanimated";
import "../global.css";

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  if (!loaded) {
    return null;
  }

  return (
    <StrictMode>
      <Stack screenOptions={{ headerShown: true }}>
        <Stack.Screen name="index" options={{ headerTintColor: "black" }} />
        <Stack.Screen name="car/[id]" />
        <Stack.Screen
          name="filters"
          options={{ headerShown: true, presentation: "formSheet" }}
        />
      </Stack>
      <StatusBar style="auto" />
    </StrictMode>
  );
}

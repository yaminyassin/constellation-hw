import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { StrictMode } from "react";
import { I18nextProvider } from "react-i18next";
import "react-native-reanimated";
import "../global.css";
import i18n from "../locales/i18n";

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  if (!loaded) {
    return null;
  }

  return (
    <StrictMode>
      <I18nextProvider i18n={i18n}>
        <Stack screenOptions={{ headerShown: true }}>
          <Stack.Screen name="index" options={{ headerTintColor: "black" }} />
          <Stack.Screen
            name="vehicle/[id]"
            options={{
              headerShown: false,
              title: "Vehicle Details",
            }}
          />
          <Stack.Screen
            name="filters"
            options={{ headerShown: true, presentation: "formSheet" }}
          />
        </Stack>
        <StatusBar style="auto" />
      </I18nextProvider>
    </StrictMode>
  );
}

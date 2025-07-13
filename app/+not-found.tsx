import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function NotFoundScreen() {
  return (
    <SafeAreaProvider>
      <Stack.Screen options={{ title: "Oops!" }} />
    </SafeAreaProvider>
  );
}

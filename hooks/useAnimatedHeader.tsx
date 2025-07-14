import { Ionicons } from "@expo/vector-icons";
import { HeaderTitle, HeaderTitleProps } from "@react-navigation/elements";
import { useNavigation } from "@react-navigation/native";
import { router } from "expo-router";
import { useEffect } from "react";
import { Pressable, View } from "react-native";
import Animated, {
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";

export function useAnimatedHeader(title: string) {
  const scroll = useSharedValue<number>(0);
  const navigation = useNavigation();

  const headerStyle = useAnimatedStyle(
    () => ({
      transform: [
        { translateY: interpolate(scroll.value, [0, 50], [50, 0], "clamp") },
      ],
    }),
    []
  );

  useEffect(() => {
    navigation.setOptions({
      headerTitle(props: HeaderTitleProps) {
        return (
          <View className="overflow-hidden pb-2 -mb-2">
            <Animated.View style={headerStyle}>
              <View className="flex-row items-center justify-between ">
                <HeaderTitle {...props}>{title}</HeaderTitle>
              </View>
            </Animated.View>
          </View>
        );
      },
      headerRight: () => (
        <View className="overflow-hidden pb-2 -mb-2">
          <Animated.View style={headerStyle}>
            <Pressable
              onPress={() => {
                router.push("/filters");
              }}
            >
              {({ pressed }) => (
                <Ionicons
                  name={pressed ? "filter-circle" : "filter-circle-outline"}
                  size={32}
                  color="#000"
                />
              )}
            </Pressable>
          </Animated.View>
        </View>
      ),
    });
  }, [headerStyle, navigation, title]);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scroll.set(event.contentOffset.y);
    },
  });

  return { scrollHandler };
}

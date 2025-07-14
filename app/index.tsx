import { ListItem } from "@/components/ListItem";
import { useAnimatedHeader } from "@/hooks/useAnimatedHeader";
import { useVehicles } from "@/hooks/useVehicle";
import { VehicleWithId } from "@/models";
import { Ionicons } from "@expo/vector-icons";
import { HeaderTitle } from "@react-navigation/elements";
import { router } from "expo-router";
import { ActivityIndicator, Pressable, View } from "react-native";
import Animated from "react-native-reanimated";

export default function HomePage() {
  const vehicles = useVehicles();
  const { scrollHandler } = useAnimatedHeader("Car Auction");

  const renderItem = ({ item }: { item: VehicleWithId }) => {
    return <ListItem car={item} />;
  };

  if (vehicles.length === 0) {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View className="flex-1">
      <Animated.FlatList
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={() => (
          <View className="flex-row items-center justify-between ">
            <HeaderTitle className="font-semibold" style={{ fontSize: 32 }}>
              Car Auction
            </HeaderTitle>
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
          </View>
        )}
        contentContainerClassName="gap-2 px-4"
        className="flex-1 bg-slate-400"
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        data={vehicles}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}

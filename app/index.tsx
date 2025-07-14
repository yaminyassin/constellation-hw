import { ListItem } from "@/components/ListItem";
import { StickySearchHeader } from "@/components/StickySearchHeader";
import { useAnimatedHeader } from "@/hooks/useAnimatedHeader";
import { useVehicles } from "@/hooks/useVehicle";
import { VehicleWithId } from "@/models";
import { useFiltersStore } from "@/store/filters";
import { HeaderTitle } from "@react-navigation/elements";
import { router } from "expo-router";
import { ActivityIndicator, View } from "react-native";
import Animated from "react-native-reanimated";

export default function HomePage() {
  const vehicles = useVehicles();
  const { scrollHandler } = useAnimatedHeader("Car Auction");
  const { filters, setSearchQuery } = useFiltersStore();

  const handleFilterPress = () => {
    router.push("/filters");
  };

  const renderItem = ({ item }: { item: VehicleWithId | string }) => {
    if (typeof item === "string") {
      return (
        <StickySearchHeader
          searchQuery={filters.searchQuery}
          onSearchChange={setSearchQuery}
          onFilterPress={handleFilterPress}
          placeholder="Search vehicles..."
        />
      );
    }
    return <ListItem car={item as VehicleWithId} />;
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
        stickyHeaderIndices={[1]}
        ListHeaderComponent={() => (
          <View className="px-4 py-2">
            <HeaderTitle className="font-semibold" style={{ fontSize: 32 }}>
              Car Auction
            </HeaderTitle>
          </View>
        )}
        data={["sticky-header", ...vehicles] as (VehicleWithId | string)[]}
        renderItem={renderItem}
        contentContainerClassName="gap-2"
        className="flex-1 bg-slate-400"
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        keyExtractor={(item, index) =>
          index === 0 ? "sticky-header" : (item as VehicleWithId).id
        }
      />
    </View>
  );
}

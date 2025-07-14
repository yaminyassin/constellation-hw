import { VehicleWithId } from "@/models";
import { useFavouritesStore } from "@/store/favourites";
import { Ionicons } from "@expo/vector-icons";
import { Image, Pressable, Text, View } from "react-native";

export interface ListItemProps {
  car: VehicleWithId;
}

export const ListItem = ({ car }: ListItemProps) => {
  const { toggleFavourite } = useFavouritesStore();
  const auctionCountdown = () => {
    const dateStr = car.auctionDateTime.replace(/\//g, "-");
    const auctionDate = new Date(dateStr);
    const now = new Date();

    // Check if the date is valid
    if (isNaN(auctionDate.getTime())) {
      return "Invalid date";
    }

    const timeDiff = auctionDate.getTime() - now.getTime();

    const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    return `${days}d ${hours}h`;
  };

  const onFavouritePress = () => {
    toggleFavourite(car);
  };

  return (
    <View className="bg-slate-200 rounded-lg shadow-sm border border-gray-200  overflow-hidden">
      {/* Main content */}
      <View className="flex-row p-3">
        {/* Image placeholder */}
        <View className="w-24 h-[100] bg-gray-100 rounded-md mr-3 self-center">
          <Image
            className="w-full h-full rounded-md"
            source={{ uri: "https://picsum.photos/200" }}
          />
        </View>

        {/* Vehicle details */}
        <View className="flex-1 flex-row justify-between">
          <View className="flex-1 justify-between">
            <View>
              <Text className="text-lg font-bold text-gray-900 mb-1">
                {car.make} {car.model}
              </Text>
              <Text className="text-sm text-gray-600 mb-1">
                {car.year} • {car.engineSize} • {car.fuel}
              </Text>
              <Text className="text-sm text-gray-600 mb-2">
                {car.mileage.toLocaleString()} miles
              </Text>
            </View>

            <View>
              <Text className="text-xs text-gray-500 mb-1">Starting bid</Text>
              <Text className="text-lg font-semibold text-green-600">
                £{car.startingBid.toLocaleString()}
              </Text>
            </View>
          </View>

          {/* Right side content */}
          <View className="items-center justify-between ">
            {/* Favourite star */}
            <FavouriteButton id={car.id} onPress={onFavouritePress} />

            {/* Auction countdown */}
            <View className="items-end">
              <Text className="text-xs text-gray-500 mb-1">Auction in</Text>
              <Text className="text-sm font-medium text-blue-600">
                {auctionCountdown()}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

const FavouriteButton = ({
  id,
  onPress,
}: {
  id: string;
  onPress?: () => void;
}) => {
  const { isFavourite } = useFavouritesStore();
  const isFav = isFavourite(id);

  return (
    <Pressable
      onPress={onPress}
      className="p-2 rounded-full"
      style={({ pressed }) => ({
        opacity: pressed ? 0.7 : 1,
      })}
    >
      <Ionicons
        name={isFav ? "star" : "star-outline"}
        size={28}
        color={isFav ? "#F59E0B" : "#9CA3AF"}
      />
    </Pressable>
  );
};

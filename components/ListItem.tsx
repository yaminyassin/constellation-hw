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
    <View
      className="bg-white rounded-xl mx-4 overflow-hidden"
      style={{
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        borderWidth: 1,
        borderColor: "rgba(0,0,0,0.05)",
      }}
    >
      {/* Main content */}
      <View className="flex-row p-4">
        {/* Image */}
        <View className="w-28 h-24 bg-gray-100 rounded-lg mr-4 overflow-hidden">
          <Image
            className="w-full h-full"
            source={{ uri: "https://picsum.photos/200" }}
          />
        </View>

        {/* Vehicle details */}
        <View className="flex-1 flex-row justify-between">
          <View className="flex-1 justify-between">
            <View>
              <Text className="text-xl font-bold text-gray-900 mb-1">
                {car.make} {car.model}
              </Text>
              <Text className="text-sm text-gray-600 mb-1">
                {car.year} • {car.engineSize} • {car.fuel}
              </Text>
              <Text className="text-sm text-gray-500">
                {car.mileage.toLocaleString()} miles
              </Text>
            </View>

            <View className="mt-3">
              <Text className="text-xs text-gray-500 mb-1 font-medium uppercase tracking-wide">
                Starting bid
              </Text>
              <Text className="text-2xl font-bold text-emerald-600">
                £{car.startingBid.toLocaleString()}
              </Text>
            </View>
          </View>

          {/* Right side content */}
          <View className="items-center justify-between ml-3">
            {/* Favourite star */}
            <FavouriteButton id={car.id} onPress={onFavouritePress} />

            {/* Auction countdown */}
            <View className="items-end">
              <Text className="text-xs text-gray-500 mb-1 font-medium uppercase tracking-wide">
                Auction in
              </Text>
              <View className="bg-blue-50 px-3 py-1 rounded-full">
                <Text className="text-sm font-bold text-blue-700">
                  {auctionCountdown()}
                </Text>
              </View>
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
      className={`p-3 rounded-full ${isFav ? "bg-amber-50" : "bg-gray-50"}`}
      style={({ pressed }) => ({
        opacity: pressed ? 0.7 : 1,
      })}
    >
      <Ionicons
        name={isFav ? "star" : "star-outline"}
        size={24}
        color={isFav ? "#F59E0B" : "#9CA3AF"}
      />
    </Pressable>
  );
};

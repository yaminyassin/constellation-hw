import { FavouriteButton } from "@/components/FavoriteButton";
import { useFavouritesStore } from "@/store/favourites";
import { useVehiclesStore } from "@/store/vehicles";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useTranslation } from "react-i18next";
import { Image, Pressable, ScrollView, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function VehicleDetailsPage() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { getVehicleById } = useVehiclesStore();
  const { toggleFavourite } = useFavouritesStore();
  const { t } = useTranslation();

  const decodedId = decodeURIComponent(id!);
  const vehicle = getVehicleById(decodedId);

  if (!vehicle) {
    return null;
  }

  const handleFavoritePress = () => {
    toggleFavourite(vehicle);
  };

  return (
    <View className="flex-1 bg-white">
      {/* Header */}
      <View
        className="absolute top-0 left-0 right-0 z-10 flex-row justify-between items-center px-4"
        style={{ paddingTop: insets.top + 16 }}
      >
        <Pressable
          onPress={() => router.back()}
          className="w-10 h-10 bg-white/90 rounded-full items-center justify-center"
          style={({ pressed }) => ({ opacity: pressed ? 0.7 : 1 })}
        >
          <Ionicons name="arrow-back" size={20} color="#374151" />
        </Pressable>

        <View className="flex-row gap-3">
          <FavouriteButton id={vehicle.id} onPress={handleFavoritePress} />
        </View>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Vehicle Image */}
        <View className="h-80  overflow-hidden">
          <Image
            source={{
              uri: "https://images.unsplash.com/photo-1494905998402-395d579af36f?w=400&h=300&fit=crop&crop=center",
            }}
            style={{
              width: "100%",
              height: "100%",
              backgroundColor: "#f3f4f6",
            }}
            resizeMode="cover"
            onError={(error) => {
              console.log("Image load error:", error);
            }}
            onLoad={() => console.log("Image loaded successfully")}
            onLoadStart={() => console.log("Image loading started")}
          />
        </View>

        {/* Vehicle Details */}
        <View className="p-6">
          {/* Title */}
          <Text className="text-2xl font-bold text-gray-900 mb-1">
            {vehicle.make} {vehicle.model}
          </Text>

          {/* Subtitle */}
          <Text className="text-lg text-gray-600 mb-6">
            {vehicle.year} • {vehicle.engineSize} • {vehicle.fuel}
          </Text>

          {/* Price */}
          <View className="flex-row items-baseline gap-2">
            <Text className="text-3xl font-bold text-gray-900">
              £{vehicle.startingBid.toLocaleString()}
            </Text>
            <Text className="text-base text-gray-500">
              {t("details.startingBid")}
            </Text>
          </View>

          {/* Mileage */}
          <View className="mt-6 pt-6 border-t border-gray-200">
            <Text className="text-lg font-semibold text-gray-900 mb-2">
              {t("details.vehicleDetails")}
            </Text>
            <View className="flex-row justify-between py-3">
              <Text className="text-gray-600">{t("details.mileage")}</Text>
              <Text className="font-medium text-gray-900">
                {vehicle.mileage.toLocaleString()} {t("details.miles")}
              </Text>
            </View>
            <View className="flex-row justify-between py-3">
              <Text className="text-gray-600">{t("details.engineSize")}</Text>
              <Text className="font-medium text-gray-900">
                {vehicle.engineSize}
              </Text>
            </View>
            <View className="flex-row justify-between py-3">
              <Text className="text-gray-600">{t("details.fuelType")}</Text>
              <Text className="font-medium text-gray-900">{vehicle.fuel}</Text>
            </View>
            <View className="flex-row justify-between py-3">
              <Text className="text-gray-600">{t("details.year")}</Text>
              <Text className="font-medium text-gray-900">{vehicle.year}</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

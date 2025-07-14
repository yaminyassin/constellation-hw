import { useFavouritesStore } from "@/store/favourites";
import { Ionicons } from "@expo/vector-icons";
import { Pressable } from "react-native";

export const FavouriteButton = ({
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
      onPress={(e) => {
        e.stopPropagation();
        onPress?.();
      }}
      className={`p-3 rounded-full ${isFav ? "bg-amber-50" : "bg-gray-50"}`}
      style={({ pressed }) => ({
        opacity: pressed ? 0.7 : 1,
      })}
    >
      <Ionicons
        name={isFav ? "star" : "star-outline"}
        size={24}
        color={isFav ? "#F59E0B" : "black"}
      />
    </Pressable>
  );
};

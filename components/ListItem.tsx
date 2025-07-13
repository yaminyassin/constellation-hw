import { VehicleWithId } from "@/models/Vehicles";
import { useVehiclesStore } from "@/store";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export interface ListItemProps {
  car: VehicleWithId;
}

export const ListItem = ({ car }: ListItemProps) => {
  const { addToFavourites, removeFromFavourites, favouriteCars } =
    useVehiclesStore();

  const isCarFavourite = favouriteCars.some((c) => c.id === car.id);

  // no need for callback since we are using react compiler
  const handleToggleFavourite = () => {
    if (isCarFavourite) {
      removeFromFavourites(car);
    } else {
      addToFavourites(car);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.carInfo}>
        <Text style={styles.carTitle}>
          {car.make} {car.model}
        </Text>
        <Text style={styles.carDetails}>
          {car.year} • {car.engineSize} • {car.fuel}
        </Text>
        <Text style={styles.carPrice}>£{car.startingBid.toLocaleString()}</Text>
        <Text style={styles.carMileage}>
          {car.mileage.toLocaleString()} miles
        </Text>
      </View>

      <TouchableOpacity
        onPress={handleToggleFavourite}
        style={styles.favoriteButton}
      >
        <Ionicons
          name={isCarFavourite ? "heart" : "heart-outline"}
          size={32}
          color={isCarFavourite ? "#FF6B6B" : "#666"}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    height: 110,
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 12,
    paddingHorizontal: 8,
    backgroundColor: "white",

    boxShadow: "0 1px 2px rgba(0, 0, 0, 0.1)",
  },
  carInfo: {
    flex: 1,
    justifyContent: "center",
  },
  carTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 4,
  },
  carDetails: {
    fontSize: 14,
    color: "#666",
    marginBottom: 4,
  },
  carPrice: {
    fontSize: 16,
    fontWeight: "600",
    color: "#2E8B57",
    marginBottom: 2,
  },
  carMileage: {
    fontSize: 12,
    color: "#999",
  },
  favoriteButton: {
    padding: 8,
  },
});

import { ListItem } from "@/components/ListItem";
import { loadVehiclesWithIds } from "@/helpers/helpers";
import { VehicleWithId } from "@/models/Vehicles";
import { useVehiclesStore } from "@/store";
import { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function HomePage() {
  const insets = useSafeAreaInsets();
  const { cars, setCars } = useVehiclesStore();

  useEffect(() => {
    const loadVehicles = async () => {
      const vehiclesWithIds = await loadVehiclesWithIds();
      setCars(vehiclesWithIds);
    };

    if (cars.length === 0) {
      loadVehicles();
    }
  }, [cars.length, setCars]);

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {cars.map((car: VehicleWithId) => (
        <ListItem key={car.id} car={car} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E6E6FA",
    paddingHorizontal: 20,
  },
});

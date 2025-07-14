import { useVehiclesStore } from "@/store/vehicles";
import { useEffect } from "react";

export const useVehicles = () => {
  const vehicles = useVehiclesStore((state) => state.vehicles);
  const loadVehicles = useVehiclesStore((state) => state.loadVehicles);

  useEffect(() => {
    loadVehicles();
  }, [loadVehicles]);

  return vehicles;
};

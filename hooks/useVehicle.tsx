import { filterVehicles } from "@/helpers/helpers";
import { useFavouritesStore } from "@/store/favourites";
import { useFiltersStore } from "@/store/filters";
import { useVehiclesStore } from "@/store/vehicles";
import { useEffect } from "react";

export const useVehicles = () => {
  const vehicles = useVehiclesStore((state) => state.vehicles);
  const loadVehicles = useVehiclesStore((state) => state.loadVehicles);
  const filters = useFiltersStore((state) => state.filters);
  const favouriteIds = useFavouritesStore((state) => state.favouriteIds);

  useEffect(() => {
    loadVehicles();
  }, [loadVehicles]);

  return filterVehicles(vehicles, filters, favouriteIds);
};

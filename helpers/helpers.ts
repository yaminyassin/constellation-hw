import { Vehicle, VehicleFilters, VehicleWithId } from "@/models";

const generateCarId = (car: Vehicle): string => {
  return `${car.make}-${car.model}-${car.year}-${car.mileage}-${car.auctionDateTime}-${car.startingBid}-${car.engineSize}-${car.fuel}`;
};

export const addIdsToCars = (cars: Vehicle[]): VehicleWithId[] => {
  return cars.map((car) => ({
    ...car,
    id: generateCarId(car),
  }));
};

export const loadVehiclesWithIds = async (): Promise<VehicleWithId[]> => {
  try {
    const vehiclesData = require("@/mocks/vehicles.json") as Vehicle[];
    return addIdsToCars(vehiclesData);
  } catch (error) {
    console.error("Error loading vehicles:", error);
    return [];
  }
};

export const isCarInFavourites = (
  car: VehicleWithId,
  favourites: VehicleWithId[]
): boolean => {
  return favourites.some((fav) => fav.id === car.id);
};

// Helper function to toggle favourite status
export const toggleFavouriteStatus = (
  car: VehicleWithId,
  favourites: VehicleWithId[],
  addToFavourites: (car: VehicleWithId) => void,
  removeFromFavourites: (car: VehicleWithId) => void
): void => {
  if (isCarInFavourites(car, favourites)) {
    removeFromFavourites(car);
  } else {
    addToFavourites(car);
  }
};

// Vehicle filtering function
export const filterVehicles = (
  vehicles: VehicleWithId[],
  filters: VehicleFilters,
  favouriteIds: Set<string>
): VehicleWithId[] => {
  // Early return if no filters are active
  const hasActiveFilters =
    filters.searchQuery ||
    filters.makes.length > 0 ||
    filters.models.length > 0 ||
    filters.priceRange.min > 0 ||
    filters.priceRange.max < 50000 ||
    filters.showFavouritesOnly;

  if (!hasActiveFilters) {
    return vehicles;
  }

  // Pre-compute search terms for better performance
  const searchLower = filters.searchQuery?.toLowerCase();
  const hasSearchQuery = Boolean(searchLower);
  const hasMakesFilter = filters.makes.length > 0;
  const hasModelsFilter = filters.models.length > 0;
  const hasPriceFilter =
    filters.priceRange.min > 0 || filters.priceRange.max < 50000;

  return vehicles.filter((vehicle) => {
    // Favourites only filter (check first as it's fastest)
    if (filters.showFavouritesOnly && !favouriteIds.has(vehicle.id)) {
      return false;
    }

    // Makes filter (fast string comparison)
    if (hasMakesFilter && !filters.makes.includes(vehicle.make)) {
      return false;
    }

    // Models filter (fast string comparison)
    if (hasModelsFilter && !filters.models.includes(vehicle.model)) {
      return false;
    }

    // Price range filter (fast numeric comparison)
    if (hasPriceFilter) {
      if (
        vehicle.startingBid < filters.priceRange.min ||
        vehicle.startingBid > filters.priceRange.max
      ) {
        return false;
      }
    }

    // Search query filter (most expensive, check last)
    if (hasSearchQuery) {
      const searchableText =
        `${vehicle.make} ${vehicle.model} ${vehicle.fuel} ${vehicle.year}`.toLowerCase();
      if (!searchableText.includes(searchLower)) {
        return false;
      }
    }

    return true;
  });
};

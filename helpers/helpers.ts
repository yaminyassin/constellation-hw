import { Vehicle, VehicleWithId } from "@/models/Vehicles";

const generateCarId = (car: Vehicle): string => {
  return `${car.make}-${car.model}-${car.year}-${car.mileage}-${car.auctionDateTime}`;
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

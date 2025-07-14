import { VehicleWithId } from "@/models";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface FavouritesState {
  favouriteIds: Set<string>;
  favouriteVehicles: VehicleWithId[];
}

interface FavouritesActions {
  addToFavourites: (vehicle: VehicleWithId) => void;
  removeFromFavourites: (vehicleId: string) => void;
  toggleFavourite: (vehicle: VehicleWithId) => void;
  isFavourite: (vehicleId: string) => boolean;
  clearFavourites: () => void;
  getFavouriteVehicles: () => VehicleWithId[];
}

export type FavouritesStore = FavouritesState & FavouritesActions;

const favouritesStorage = {
  getItem: async (name: string) => {
    const value = await AsyncStorage.getItem(name);
    if (!value) return null;

    const parsed = JSON.parse(value);
    return {
      ...parsed,
      state: {
        ...parsed.state,
        favouriteIds: new Set(parsed.state.favouriteIds || []),
      },
    };
  },
  setItem: async (name: string, value: any) => {
    const serialized = {
      ...value,
      state: {
        ...value.state,
        favouriteIds: Array.from(value.state.favouriteIds),
      },
    };
    await AsyncStorage.setItem(name, JSON.stringify(serialized));
  },
  removeItem: async (name: string) => {
    await AsyncStorage.removeItem(name);
  },
};

export const useFavouritesStore = create<FavouritesStore>()(
  persist(
    (set, get) => ({
      // State
      favouriteIds: new Set<string>(),
      favouriteVehicles: [],

      // Actions
      addToFavourites: (vehicle: VehicleWithId) => {
        set((state) => {
          if (state.favouriteIds.has(vehicle.id)) {
            return state;
          }

          const newFavouriteIds = new Set(state.favouriteIds);
          newFavouriteIds.add(vehicle.id);

          return {
            favouriteIds: newFavouriteIds,
            favouriteVehicles: [...state.favouriteVehicles, vehicle],
          };
        });
      },

      removeFromFavourites: (vehicleId: string) => {
        set((state) => {
          if (!state.favouriteIds.has(vehicleId)) {
            return state; // Not favourite
          }

          const newFavouriteIds = new Set(state.favouriteIds);
          newFavouriteIds.delete(vehicleId);

          return {
            favouriteIds: newFavouriteIds,
            favouriteVehicles: state.favouriteVehicles.filter(
              (vehicle) => vehicle.id !== vehicleId
            ),
          };
        });
      },

      toggleFavourite: (vehicle: VehicleWithId) => {
        const { favouriteIds, addToFavourites, removeFromFavourites } = get();

        if (favouriteIds.has(vehicle.id)) {
          removeFromFavourites(vehicle.id);
        } else {
          addToFavourites(vehicle);
        }
      },

      isFavourite: (vehicleId: string) => {
        const { favouriteIds } = get();
        return favouriteIds.has(vehicleId);
      },

      clearFavourites: () => {
        set({
          favouriteIds: new Set<string>(),
          favouriteVehicles: [],
        });
      },

      getFavouriteVehicles: () => {
        const { favouriteVehicles } = get();
        return favouriteVehicles;
      },
    }),
    {
      name: "favourites-store",
      storage: favouritesStorage,
    }
  )
);

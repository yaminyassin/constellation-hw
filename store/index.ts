import { VehicleWithId } from "@/models/Vehicles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface VehiclesStore {
  cars: VehicleWithId[];
  setCars: (cars: VehicleWithId[]) => void;
  favouriteCars: VehicleWithId[];
  addToFavourites: (car: VehicleWithId) => void;
  removeFromFavourites: (car: VehicleWithId) => void;
  isFavourite: (car: VehicleWithId) => boolean;
  clearFavourites: () => void;
}

export const useVehiclesStore = create(
  persist<VehiclesStore>(
    (set, get) => ({
      cars: [],
      setCars: (cars: VehicleWithId[]) => set({ cars }),

      favouriteCars: [],

      addToFavourites: (car: VehicleWithId) =>
        set((state) => {
          // Check if car is already in favourites to avoid duplicates
          const isAlreadyFavourite = state.favouriteCars.some(
            (c) => c.id === car.id
          );
          if (isAlreadyFavourite) return state;

          return {
            favouriteCars: [...state.favouriteCars, car],
          };
        }),

      removeFromFavourites: (car: VehicleWithId) =>
        set((state) => ({
          favouriteCars: state.favouriteCars.filter((c) => c.id !== car.id),
        })),

      isFavourite: (car: VehicleWithId) => {
        const state = get();
        return state.favouriteCars.some((c) => c.id === car.id);
      },

      clearFavourites: () => set({ favouriteCars: [] }),
    }),
    {
      name: "vehicles-store",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

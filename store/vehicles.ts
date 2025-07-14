import { loadVehiclesWithIds } from "@/helpers/helpers";
import { VehicleWithId } from "@/models";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface VehiclesState {
  vehicles: VehicleWithId[];
  isLoading: boolean;
  error: string | null;
}

interface VehiclesActions {
  loadVehicles: () => Promise<void>;
  setVehicles: (vehicles: VehicleWithId[]) => void;
  clearError: () => void;
  isFavourite: (id: string) => boolean;
  getVehicleById: (id: string) => VehicleWithId | undefined;
}

export type VehiclesStore = VehiclesState & VehiclesActions;

export const useVehiclesStore = create<VehiclesStore>()(
  persist(
    (set, get) => ({
      // State
      vehicles: [],
      isLoading: false,
      error: null,

      // Actions
      loadVehicles: async () => {
        const { vehicles } = get();

        // Don't reload if already loaded
        if (vehicles.length > 0) return;

        set({ isLoading: true, error: null });

        try {
          const vehiclesWithIds = await loadVehiclesWithIds();
          set({ vehicles: vehiclesWithIds, isLoading: false });
        } catch (error) {
          set({
            error:
              error instanceof Error
                ? error.message
                : "Failed to load vehicles",
            isLoading: false,
          });
        }
      },

      setVehicles: (vehicles: VehicleWithId[]) => {
        set({ vehicles, error: null });
      },

      getVehicleById: (id: string) => {
        return get().vehicles.find((vehicle) => vehicle.id === id);
      },

      isFavourite: (id: string) => {
        return !!get().vehicles.find((vehicle) => vehicle.id === id)?.favourite;
      },

      clearError: () => {
        set({ error: null });
      },
    }),
    {
      name: "vehicles-store",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

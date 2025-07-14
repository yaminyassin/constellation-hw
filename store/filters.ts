import { PriceRange, VehicleFilters } from "@/models";
import { create } from "zustand";

interface FiltersState {
  filters: VehicleFilters;
  isFiltersActive: boolean;
}

interface FiltersActions {
  setMakesFilter: (makes: string[]) => void;
  setModelsFilter: (models: string[]) => void;
  setPriceRangeFilter: (priceRange: PriceRange) => void;
  setShowFavouritesOnly: (showFavouritesOnly: boolean) => void;
  setSearchQuery: (query: string) => void;
  setFilters: (filters: Partial<VehicleFilters>) => void;
  clearFilters: () => void;
  clearMakes: () => void;
  clearModels: () => void;
}

export type FiltersStore = FiltersState & FiltersActions;

const defaultFilters: VehicleFilters = {
  makes: [],
  models: [],
  priceRange: { min: 0, max: 50000 },
  showFavouritesOnly: false,
  searchQuery: "",
};

const isFiltersActive = (filters: VehicleFilters): boolean => {
  return (
    filters.makes.length > 0 ||
    filters.models.length > 0 ||
    filters.priceRange.min > 0 ||
    filters.priceRange.max < 50000 ||
    filters.showFavouritesOnly ||
    filters.searchQuery !== ""
  );
};

export const useFiltersStore = create<FiltersStore>()((set) => ({
  // State
  filters: defaultFilters,
  isFiltersActive: false,

  // Actions
  setMakesFilter: (makes: string[]) => {
    set((state) => {
      const newFilters = { ...state.filters, makes };
      return {
        filters: newFilters,
        isFiltersActive: isFiltersActive(newFilters),
      };
    });
  },

  setModelsFilter: (models: string[]) => {
    set((state) => {
      const newFilters = { ...state.filters, models };
      return {
        filters: newFilters,
        isFiltersActive: isFiltersActive(newFilters),
      };
    });
  },

  setPriceRangeFilter: (priceRange: PriceRange) => {
    set((state) => {
      const newFilters = { ...state.filters, priceRange };
      return {
        filters: newFilters,
        isFiltersActive: isFiltersActive(newFilters),
      };
    });
  },

  setShowFavouritesOnly: (showFavouritesOnly: boolean) => {
    set((state) => {
      const newFilters = { ...state.filters, showFavouritesOnly };
      return {
        filters: newFilters,
        isFiltersActive: isFiltersActive(newFilters),
      };
    });
  },

  setSearchQuery: (searchQuery: string) => {
    set((state) => {
      const newFilters = { ...state.filters, searchQuery };
      return {
        filters: newFilters,
        isFiltersActive: isFiltersActive(newFilters),
      };
    });
  },

  setFilters: (partialFilters: Partial<VehicleFilters>) => {
    set((state) => {
      const newFilters = { ...state.filters, ...partialFilters };
      return {
        filters: newFilters,
        isFiltersActive: isFiltersActive(newFilters),
      };
    });
  },

  clearFilters: () => {
    set({
      filters: defaultFilters,
      isFiltersActive: false,
    });
  },

  clearMakes: () => {
    set((state) => {
      const newFilters = { ...state.filters, makes: [] };
      return {
        filters: newFilters,
        isFiltersActive: isFiltersActive(newFilters),
      };
    });
  },

  clearModels: () => {
    set((state) => {
      const newFilters = { ...state.filters, models: [] };
      return {
        filters: newFilters,
        isFiltersActive: isFiltersActive(newFilters),
      };
    });
  },
}));

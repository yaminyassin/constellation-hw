import { useFiltersStore } from "@/store/filters";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { Pressable, ScrollView, Text, TextInput, View } from "react-native";

interface StickySearchHeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onFilterPress?: () => void;
  placeholder?: string;
}

interface FilterChipData {
  type: string;
  label: string;
}

export function StickySearchHeader({
  searchQuery,
  onSearchChange,
  onFilterPress,
  placeholder,
}: StickySearchHeaderProps) {
  return (
    <View className="bg-white border-b border-gray-200">
      <View className="px-4 py-3">
        <View className="flex-row items-center gap-3">
          <View className="flex-1 flex-row items-center bg-gray-100 rounded-lg px-3 py-2">
            <Ionicons name="search" size={20} color="#666" />
            <TextInput
              className="flex-1 ml-2 text-base"
              placeholder={placeholder}
              value={searchQuery}
              onChangeText={onSearchChange}
              clearButtonMode="always"
              placeholderTextColor="#666"
            />
          </View>
          <Pressable onPress={onFilterPress} className="p-2">
            {({ pressed }) => (
              <Ionicons
                name={pressed ? "filter-circle" : "filter-circle-outline"}
                size={28}
                color="#000"
              />
            )}
          </Pressable>
        </View>
      </View>
      <ActiveFiltersChips />
    </View>
  );
}

const ActiveFiltersChips = () => {
  const { filters } = useFiltersStore();
  const [activeFilters, setActiveFilters] = useState<FilterChipData[]>([]);

  useEffect(() => {
    const newActiveFilters: FilterChipData[] = [];

    // Add makes chips
    if (filters.makes.length > 0) {
      const makes = filters.makes.map((make) => ({
        type: "makes",
        label: make,
      }));
      newActiveFilters.push(...makes);
    }

    // Add models chips
    if (filters.models.length > 0) {
      const models = filters.models.map((model) => ({
        type: "models",
        label: model,
      }));
      newActiveFilters.push(...models);
    }

    // Add price range chip
    if (filters.priceRange.min > 0 || filters.priceRange.max < 50000) {
      newActiveFilters.push({
        type: "price",
        label: `£${filters.priceRange.min.toLocaleString()} - £${filters.priceRange.max.toLocaleString()}`,
      });
    }

    // Add favourites chip
    if (filters.showFavouritesOnly) {
      newActiveFilters.push({
        type: "favourites",
        label: "Favourites Only",
      });
    }

    setActiveFilters(newActiveFilters);
  }, [filters]);

  if (activeFilters.length === 0) {
    return null;
  }

  return (
    <View className="px-4 pb-3">
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="flex-row"
        contentContainerClassName="gap-2"
      >
        {activeFilters.map((filter, index) => (
          <FilterChip key={`${filter.type}-${index}`} label={filter.label} />
        ))}
      </ScrollView>
    </View>
  );
};

const FilterChip = ({ label }: { label: string }) => {
  return (
    <View className="bg-blue-100 rounded-full px-3 py-1 border border-blue-200">
      <Text className="text-blue-800 text-sm font-medium">{label}</Text>
    </View>
  );
};

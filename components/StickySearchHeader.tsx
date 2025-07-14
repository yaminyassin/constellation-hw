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
    <View className="bg-white">
      <View className="px-6 py-4">
        <View className="flex-row items-center gap-3">
          <View className="flex-1 flex-row items-center bg-gray-100 rounded-xl px-4 py-3">
            <Ionicons name="search" size={20} color="#6B7280" />
            <TextInput
              className="flex-1 ml-3 text-base text-gray-900"
              placeholder={placeholder}
              value={searchQuery}
              onChangeText={onSearchChange}
              clearButtonMode="always"
              placeholderTextColor="#9CA3AF"
            />
          </View>
          <Pressable
            onPress={onFilterPress}
            className="p-3 bg-blue-600 rounded-xl"
            style={({ pressed }) => ({
              opacity: pressed ? 0.8 : 1,
            })}
          >
            <Ionicons name="options-outline" size={20} color="#FFFFFF" />
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
    <View className="px-6 pb-4 bg-white border-b border-gray-100">
      <Text className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">
        Active Filters
      </Text>
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
    <View className="bg-blue-50 rounded-full px-4 py-2 border border-blue-200">
      <Text className="text-blue-700 text-sm font-medium">{label}</Text>
    </View>
  );
};

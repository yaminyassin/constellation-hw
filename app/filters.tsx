import { HorizontalChips } from "@/components/HorizontalChips";
import { useFiltersStore } from "@/store/filters";
import { useVehiclesStore } from "@/store/vehicles";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Alert,
  Platform,
  ScrollView,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function FiltersModal() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const vehicles = useVehiclesStore((state) => state.vehicles);
  const {
    filters,
    setMakesFilter,
    setModelsFilter,
    setPriceRangeFilter,
    setShowFavouritesOnly,
    clearFilters,
    clearMakes,
    clearModels,
  } = useFiltersStore();

  const [localMinPrice, setLocalMinPrice] = useState(
    filters.priceRange.min.toString()
  );
  const [localMaxPrice, setLocalMaxPrice] = useState(
    filters.priceRange.max.toString()
  );

  // Get unique makes and models from vehicles data
  const availableMakes = [
    ...new Set(vehicles.map((vehicle) => vehicle.make)),
  ].sort();
  const availableModels = [
    ...new Set(vehicles.map((vehicle) => vehicle.model)),
  ].sort();

  const handlePriceRangeUpdate = () => {
    const min = parseInt(localMinPrice) || 0;
    const max = parseInt(localMaxPrice) || 50000;

    if (min > max) {
      Alert.alert(
        "Invalid Range",
        "Minimum price cannot be greater than maximum price"
      );
      return;
    }

    setPriceRangeFilter({ min, max });
  };

  const handleClearFilters = () => {
    clearFilters();
    setLocalMinPrice("0");
    setLocalMaxPrice("50000");
  };

  const handleMakePress = (make: string) => {
    const isSelected = filters.makes.includes(make);
    let newMakes: string[];

    if (isSelected) {
      newMakes = filters.makes.filter((item) => item !== make);
    } else {
      newMakes = [...filters.makes, make];
    }

    setMakesFilter(newMakes);
  };

  const handleModelPress = (model: string) => {
    const isSelected = filters.models.includes(model);
    let newModels: string[];

    if (isSelected) {
      newModels = filters.models.filter((item) => item !== model);
    } else {
      newModels = [...filters.models, model];
    }

    setModelsFilter(newModels);
  };

  return (
    <View
      className="flex-1 h-full"
      style={{ paddingTop: Platform.OS === "android" ? insets.top : 0 }}
    >
      <ScrollView
        className="flex-1 h-full"
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingTop: insets.top,
          paddingBottom: insets.bottom,
        }}
        showsVerticalScrollIndicator={false}
      >
        <View className="flex-row items-center justify-between">
          <Text className="text-2xl font-bold text-gray-900 mb-6">Filters</Text>
          {Platform.OS === "android" && (
            <TouchableOpacity onPress={() => router.back()}>
              <Ionicons name="close" size={24} color="black" />
            </TouchableOpacity>
          )}
        </View>

        {/* Make Filter */}
        <HorizontalChips
          title="Make"
          options={availableMakes}
          selectedValues={filters.makes}
          onChipPress={handleMakePress}
          onClear={clearMakes}
        />

        {/* Model Filter */}
        <HorizontalChips
          title="Model"
          options={availableModels}
          selectedValues={filters.models}
          onChipPress={handleModelPress}
          onClear={clearModels}
        />

        {/* Price Range */}
        <View className="mb-6">
          <Text className="text-lg font-semibold text-gray-700 mb-3">
            Price Range
          </Text>
          <View className="flex-row gap-4">
            <View className="flex-1">
              <Text className="text-sm text-gray-600 mb-2">Min Price</Text>
              <TextInput
                className="bg-white border border-gray-300 rounded-lg px-4 py-3 text-gray-900 min-h-12"
                placeholder="0"
                value={localMinPrice}
                onChangeText={setLocalMinPrice}
                keyboardType="numeric"
                onEndEditing={handlePriceRangeUpdate}
              />
            </View>
            <View className="flex-1">
              <Text className="text-sm text-gray-600 mb-2">Max Price</Text>
              <TextInput
                className="bg-white border border-gray-300 rounded-lg px-4 py-3 text-gray-900 min-h-12"
                placeholder="50000"
                value={localMaxPrice}
                onChangeText={setLocalMaxPrice}
                keyboardType="numeric"
                onEndEditing={handlePriceRangeUpdate}
              />
            </View>
          </View>
        </View>

        {/* Show Favourites Only */}
        <View className="mb-8">
          <View className="flex-row items-center justify-between">
            <Text className="text-lg font-semibold text-gray-700">
              Favourites Only
            </Text>
            <Switch
              value={filters.showFavouritesOnly}
              onValueChange={setShowFavouritesOnly}
              trackColor={{ false: "#e5e7eb", true: "#3b82f6" }}
              thumbColor={filters.showFavouritesOnly ? "#ffffff" : "#f3f4f6"}
            />
          </View>
        </View>
      </ScrollView>

      {/* Clear Filters Button - Fixed to bottom */}
      <View className="p-4 " style={{ paddingBottom: insets.bottom }}>
        <TouchableOpacity
          className="bg-red-500 rounded-lg py-4 items-center"
          style={{ boxShadow: "0 2px 4px rgba(0,0,0,0.1)" }}
          onPress={handleClearFilters}
        >
          <Text className="text-white font-semibold text-lg">
            Clear All Filters
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

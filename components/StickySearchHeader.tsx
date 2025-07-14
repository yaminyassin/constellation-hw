import { Ionicons } from "@expo/vector-icons";
import { Pressable, TextInput, View } from "react-native";

interface StickySearchHeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onFilterPress?: () => void;
  placeholder?: string;
}

export function StickySearchHeader({
  searchQuery,
  onSearchChange,
  onFilterPress,
  placeholder,
}: StickySearchHeaderProps) {
  return (
    <View className="bg-white px-4 py-3 border-b border-gray-200">
      <View className="flex-row items-center gap-3">
        <View className="flex-1 flex-row items-center bg-gray-100 rounded-lg px-3 py-2">
          <Ionicons name="search" size={20} color="#666" />
          <TextInput
            className="flex-1 ml-2 text-base"
            placeholder={placeholder}
            value={searchQuery}
            onChangeText={onSearchChange}
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
  );
}

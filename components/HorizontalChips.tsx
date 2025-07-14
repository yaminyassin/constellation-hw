import { ScrollView, Text, TouchableOpacity, View } from "react-native";

interface HorizontalChipsProps {
  title: string;
  options: string[];
  selectedValues: string[];
  onChipPress: (value: string) => void;
  onClear: () => void;
}

export function HorizontalChips({
  title,
  options,
  selectedValues,
  onChipPress,
  onClear,
}: HorizontalChipsProps) {
  const hasSelection = selectedValues.length > 0;

  return (
    <View className="flex-1 mb-6">
      <View className="flex-row items-center justify-between mb-3">
        <Text className="text-lg font-semibold text-gray-700">{title}</Text>
        {hasSelection && (
          <TouchableOpacity
            className="px-3 py-1 bg-gray-200 rounded-md"
            onPress={onClear}
          >
            <Text className="text-sm text-gray-600 font-medium">Clear</Text>
          </TouchableOpacity>
        )}
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="flex-1"
        contentContainerStyle={{ paddingRight: 16 }}
      >
        <View className="flex-row gap-2">
          {options.map((option) => {
            const isSelected = selectedValues.includes(option);
            return (
              <TouchableOpacity
                key={option}
                className={`px-4 py-2 rounded-full border min-h-10 justify-center ${
                  isSelected
                    ? "bg-blue-500 border-blue-500"
                    : "bg-white border-gray-300"
                }`}
                onPress={() => onChipPress(option)}
              >
                <Text
                  className={`font-medium text-center ${
                    isSelected ? "text-white" : "text-gray-700"
                  }`}
                >
                  {option}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
}

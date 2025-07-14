import { Pressable, ScrollView, Text, View } from "react-native";

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
    <View className="flex-1 mb-8">
      <View className="flex-row items-center justify-between mb-4">
        <Text className="text-xl font-bold text-gray-900">{title}</Text>
        {hasSelection && (
          <Pressable
            className="px-4 py-2 bg-gray-100 rounded-xl border border-gray-200"
            onPress={onClear}
          >
            <Text className="text-sm text-gray-700 font-semibold">Clear</Text>
          </Pressable>
        )}
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="flex-1"
        contentContainerClassName="pr-6"
      >
        <View className="flex-row gap-3">
          {options.map((option) => {
            const isSelected = selectedValues.includes(option);
            return (
              <Pressable
                key={option}
                className={`px-6 py-3 rounded-xl border-2 min-h-12 justify-center ${
                  isSelected
                    ? "bg-blue-600 border-blue-600"
                    : "bg-white border-gray-200 hover:border-gray-300"
                }`}
                onPress={() => onChipPress(option)}
              >
                <Text
                  className={`font-semibold text-center ${
                    isSelected ? "text-white" : "text-gray-700"
                  }`}
                >
                  {option}
                </Text>
              </Pressable>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
}

import { View, Text, FlatList } from "react-native";
import GridItem from "@/components/GridItem";
import { useRecipes } from "@/contexts/RecipeContext";

export default function Saved() {
    const { recipes, savedIds } = useRecipes();
    const savedRecipes = recipes.filter(r => savedIds.includes(r.id));

    return (
        <View className="flex-1 bg-primary-bg">
            <FlatList
                data={savedRecipes}
                keyExtractor={(item) => item.id}
                numColumns={3}
                ListHeaderComponent={
                    <View className="ml-4 mt-4">
                        <Text className="text-2xl font-extrabold text-gray-900 mb-4">Saved</Text>
                    </View>
                }
                contentContainerStyle={{ paddingBottom: 24, flexGrow: 1 }}
                renderItem={({ item }) => <GridItem item={item} />}
                ListEmptyComponent={
                    <View className="flex-1 items-center justify-center px-6">
                        <Text className="text-gray-600 text-center">
                            No saved recipes yet. Tap “Save” on a recipe to see it here.
                        </Text>
                    </View>
                }
                showsVerticalScrollIndicator={false}
            />
        </View>
    );
}
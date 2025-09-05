import {View, Text, FlatList} from "react-native";
import GridItem from "@/components/GridItem";
import { useRecipes } from "@/contexts/RecipeContext";

export default function saved() {
    const { recipes } = useRecipes();
    return (
        <View className="flex-1 bg-primary-bg">
            <FlatList
                data={recipes}
                keyExtractor={(item) => item.id}
                numColumns={3}
                ListHeaderComponent={
                    <View className="mt-4">
                        <Text className="text-2xl font-extrabold text-gray-900 mb-4">Saved</Text>
                    </View>
                }
                contentContainerStyle={{ paddingBottom: 24 }}
                renderItem={({ item }) => <GridItem item={item} />}
                showsVerticalScrollIndicator={false}
            />
        </View>
    );
}
import { FlatList, View, Text } from "react-native";
import RecipeCard from "../../components/RecipeCard";
import { useRecipes } from "@/contexts/RecipeContext";



export default function Feed() {
    const { recipes } = useRecipes();
    return (
        <View className="flex-1 bg-primary-bg ">
            <FlatList
                data={recipes}
                keyExtractor={(item) => item.id}
                contentContainerStyle={{ padding: 16 }}
                ListHeaderComponent={
                    <View className="mb-4">
                        <Text className="text-2xl font-extrabold text-gray-900">Your Feed</Text>
                    </View>
                }
                ListEmptyComponent={
                    <View className="flex-1 justify-center items-center py-80">
                        <Text className="text-xl text-gray-700">
                            No recipes available
                        </Text>
                    </View>
                }
                ItemSeparatorComponent={() => <View className="h-4" />}
                renderItem={({ item }) => (
                    <RecipeCard id={item.id} title={item.title} image={item.image} author={item.author} description={item.description}
                                time={item.time} difficulty={item.difficulty} servings={item.servings} />
                )}
                showsVerticalScrollIndicator={false}
            />
        </View>
    );
}
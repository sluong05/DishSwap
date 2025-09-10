// app/recipe/[id].tsx
import {View, Text, Image, ScrollView, TouchableOpacity, FlatList} from "react-native";
import { useLocalSearchParams, Stack, useRouter } from "expo-router";
import { useRecipes } from "@/contexts/RecipeContext";

export default function RecipeDetails() {
    const router = useRouter();

    const { id } = useLocalSearchParams<{ id: string }>();
    const { recipes, isSaved, toggleSave } = useRecipes();   // <-- use save helpers


    const recipe = recipes.find(r => r.id === id);

    if (!recipe) {
        return (
            <View className="flex-1 items-center justify-center bg-primary-bg">
                <Text className="text-lg text-gray-800">Recipe not found.</Text>
            </View>
        );
    }

    const saved = isSaved(id!);

    return (
        <>
            {/* Optional native header title */}
            <Stack.Screen options={{ title: recipe.title }} />

            <ScrollView
                className="flex-1 bg-primary-bg p-4"
                contentContainerStyle={{ padding: 16 }}
            >
                {/* Hero / image */}
                {recipe.image ? (
                    <Image source={{ uri: recipe.image }} className="w-full h-80 rounded-xl mb-4" /> //do not make h-full! scrollview problems!
                ) : (
                    <View className="w-full h-56 rounded-xl mb-4 bg-gray-200" />
                )}

                {/* Meta */}
                <Text className="text-2xl font-extrabold text-gray-900 mb-1">{recipe.title}</Text>
                <Text className="text-gray-600 mb-2">By @{recipe.author ?? "Unknown"}</Text>
                <View className="flex-row gap-2 mb-4">
                    {recipe.difficulty ? <Text className={`px-2 py-1 rounded-full ${recipe.difficulty === "Easy"
                        ? "bg-emerald-100 text-emerald-700 "
                        : recipe.difficulty === "Medium"
                            ? "bg-yellow-100 text-yellow-700"
                            : recipe.difficulty === "Hard"
                                ? "bg-red-100 text-red-700"
                                : "text-gray-700"}`}> {recipe.difficulty} </Text> : null}
                    {recipe.time ? <Text className="px-2 py-1 rounded-full bg-blue-100 text-blue-700"> {recipe.time} minutes </Text> : null}
                    {recipe.servings ? <Text className="px-2 py-1 rounded-full bg-purple-100 text-purple-700"> {recipe.servings} servings </Text> : null}
                </View>

                {/* Description */}
                {recipe.description ? (
                    <Text className="text-gray-800 mb-6">{recipe.description}</Text>
                ) : null}

                {/* Ingredients */}
                <Text className="text-xl font-bold text-gray-900 mb-2">Ingredients</Text>
                {Array.isArray(recipe.ingredients) && recipe.ingredients.length > 0 ? (
                    recipe.ingredients.map((ingredient: string, i: number) => (
                        <Text key={i} className="text-gray-800">• {ingredient}</Text>
                    ))
                ) : (
                    <Text className="text-gray-600">No ingredients provided.</Text>
                )}

                {/* Steps */}
                <Text className="text-xl font-bold text-gray-900 mt-6 mb-2">Steps</Text>
                {Array.isArray(recipe.steps) && recipe.steps.length > 0 ? (
                    recipe.steps.map((curr_Step: string, i: number) => (
                        <Text key={i} className="text-gray-800 mb-1">{i + 1}. {curr_Step}</Text>
                    ))
                ) : (
                    <Text className="text-gray-600">No steps provided.</Text>
                )}

                <View className="px-4 pb-8 pt-4 bg-primary-bg">
                    <View className="flex-row gap-3">
                        {/* SAVE / UNSAVE */}
                        <TouchableOpacity
                            onPress={() => toggleSave(id!)}
                            accessibilityRole="button"
                            accessibilityLabel={saved ? "Unsave recipe" : "Save recipe"}
                            className={`flex-1 py-3 rounded-lg items-center ${
                                saved ? "bg-gray-200" : "bg-[#1B57BF]"
                            }`}
                        >
                            <Text className={`text-lg font-bold ${saved ? "text-gray-900" : "text-white"}`}>
                                {saved ? "Saved ✓" : "Save"}
                            </Text>
                        </TouchableOpacity>

                        {/* BACK */}
                        <TouchableOpacity
                            onPress={() => router.back()}
                            accessibilityRole="button"
                            accessibilityLabel="Go back"
                            className="flex-1 bg-gray-900 py-3 rounded-lg items-center"
                        >
                            <Text className="text-white text-lg font-bold">Back</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </>
    );
}
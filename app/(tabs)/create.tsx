import { View, Text, TextInput, ScrollView, TouchableOpacity, Image } from "react-native";
import { useState } from "react";
import { useRecipes } from "@/contexts/RecipeContext";


//replace the value of certain index of array
const updateAt = <T,>(arr: T[], index: number, value: T): T[] =>
    arr.map((item, i) => (i === index ? value : item));

//remove certain index of array
const removeAt = <T,>(arr: T[], index: number): T[] =>
    arr.filter((_, i) => i !== index);



export default function Create() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");


    const [ingredientList, setIngredientList] = useState<string[]>([""]);
    const [stepList, setStepList] = useState<string[]>([""]);

    const [portion, setPortion] = useState("");
    const [time, setTime] = useState("");

    const [difficulty, setDifficulty] = useState("");

    const { addRecipe } = useRecipes();

    function handlePublish() {
        addRecipe({
            title,
            description,
            author: "You",
            image: "https://picsum.photos/400/300", // placeholder
            time: Number(time),
            difficulty,
            servings: portion,
        });
        setTitle("");
        setDescription("");
        setIngredientList([""]);
        setStepList([""]);
        setPortion("");
        setTime("");
        setDifficulty("");
    }


    return (
        <ScrollView className="flex-1 bg-primary-bg p-4" showsVerticalScrollIndicator={false}>
            <Text className="text-2xl font-extrabold text-gray-900 mb-4">Create a Recipe</Text>

            {/* Title */}
            <Text className="font-semibold mb-1">Title</Text>
            <TextInput
                value={title}
                onChangeText={setTitle}
                placeholder="e.g., Garlic Butter Salmon"
                className="bg-white rounded-xl px-4 py-3 mb-4"
            />

            {/* Description */}
            <Text className="font-semibold mb-1">Description</Text>
            <TextInput
                value={description}
                onChangeText={setDescription}
                placeholder="Short description..."
                multiline
                className="bg-white rounded-xl px-4 py-3 mb-4 h-20"
            />

            {/* Ingredients */}
            <View className="mb-4">
                <View className="flex-row items-center justify-between mb-1">
                    <Text className="font-semibold mb-1">Ingredients</Text>
                    <TouchableOpacity onPress={() => setIngredientList((prev) =>  [...prev, ""])}
                    className="bg-[#1B57BF] rounded-lg px-3 py-1"
                    >
                        <Text className="text-white font-semibold">+ ADD</Text>
                    </TouchableOpacity>
                </View>

                {ingredientList.map((val, i) => (
                    <View key={`ing-${i}`} className="flex-row items-center mb-2">
                        <TextInput
                            value={val}
                            onChangeText={(t) => setIngredientList((prev) => updateAt(prev, i, t))}
                            placeholder={`Ingredient ${i + 1}`}
                            className="flex-1 bg-white rounded-xl px-4 py-3"
                        />
                        <TouchableOpacity
                            onPress={() => setIngredientList((prev) => (prev.length > 1 ? removeAt(prev, i) : prev))}
                            className="ml-2 px-3 py-2 rounded-lg bg-red-100"
                        >
                            <Text className="text-red-600 font-semibold">Remove</Text>
                        </TouchableOpacity>
                    </View>
                ))}
            </View>

            {/* Steps */}
            <View className="mb-4">
                <View className="flex-row items-center justify-between mb-1">
                    <Text className="font-semibold">Steps</Text>
                    <TouchableOpacity
                        onPress={() => setStepList((prev) => [...prev, ""])}
                        className="bg-[#1B57BF] rounded-lg px-3 py-1"
                    >
                        <Text className="text-white font-semibold">+ Add</Text>
                    </TouchableOpacity>
                </View>

                {stepList.map((val, i) => (
                    <View key={`step-${i}`} className="mb-2">
                        <View className="flex-row items-center mb-1">
                            <Text className="w-8 text-center font-semibold">{i + 1}.</Text>
                            <TouchableOpacity
                                onPress={() => setStepList((prev) => (prev.length > 1 ? removeAt(prev, i) : prev))}
                                className="ml-auto px-3 py-1 rounded-lg bg-red-100"
                            >
                                <Text className="text-red-600 font-semibold">Remove</Text>
                            </TouchableOpacity>
                        </View>
                        <TextInput
                            value={val}
                            onChangeText={(t) => setStepList((prev) => updateAt(prev, i, t))}
                            placeholder={`Describe step ${i + 1}...`}
                            multiline
                            className="bg-white rounded-xl px-4 py-3"
                        />


                    </View>
                ))}
            </View>

            {/* Portion & Time */}
            <View className="flex-row justify-between mb-4">
                <View className="flex-1 mr-2">
                    <Text className="font-semibold mb-1">Servings</Text>
                    <TextInput
                        value={portion}
                        onChangeText={setPortion}
                        placeholder="e.g., 4"
                        keyboardType="numeric"
                        className="bg-white rounded-xl px-4 py-3"
                    />
                </View>
                <View className="flex-1 ml-2">
                    <Text className="font-semibold mb-1">Time (min)</Text>
                    <TextInput
                        value={time}
                        onChangeText={setTime}
                        placeholder="e.g., 35"
                        keyboardType="numeric"
                        className="bg-white rounded-xl px-4 py-3"
                    />
                </View>
            </View>

            {/* Difficulty */}
            <Text className="font-semibold mb-4">Difficulty</Text>
            <View className="flex-row items-center justify-between mb-4">
                <TouchableOpacity
                    onPress={() => setDifficulty("Easy")}
                    className="bg-emerald-100 w-32 px-2.5 py-1 rounded-full mr-2 items-center"
                >
                    <Text className="text-emerald-500 text-xl font-semibold">Easy</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => setDifficulty("Medium")}
                    className="bg-yellow-100 w-32 px-2.5 py-1 rounded-full mr-2 items-center"
                >
                    <Text className="text-yellow-500 text-xl font-semibold">Medium</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => setDifficulty("Hard")}
                    className="bg-red-100 w-32 px-2.5 py-1 rounded-full mr-2 items-center"
                >
                    <Text className="text-red-500 text-xl font-semibold ">Hard</Text>
                </TouchableOpacity>
            </View>



            {/* Photo Upload (mock placeholder) */}
            <Text className="font-semibold mb-1">Photo</Text>
            <TouchableOpacity className="bg-white rounded-xl h-40 items-center justify-center mb-6">
                <Text className="text-gray-500">+ Add Photo</Text>
            </TouchableOpacity>

            {/* Submit Button */}
            <TouchableOpacity
                className="bg-[#1B57BF] rounded-xl py-4"
                onPress={handlePublish}
            >
                <Text className="text-center text-white font-bold text-lg">Publish Recipe</Text>
            </TouchableOpacity>
        </ScrollView>
    );
}

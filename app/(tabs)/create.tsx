import {
    View,
    Text,
    TextInput,
    ScrollView,
    TouchableOpacity,
    Image,
    Platform,
    ActionSheetIOS,
    Alert
} from "react-native";
import { useState } from "react";
import { useRecipes } from "@/contexts/RecipeContext";
import * as ImagePicker from "expo-image-picker";
import {updateAt, removeAt} from "@/utils/array";
import { validateRecipe } from "@/utils/validation";


export default function Create() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");


    const [ingredientList, setIngredientList] = useState<string[]>([""]);
    const [stepList, setStepList] = useState<string[]>([""]);

    const [portion, setPortion] = useState("");
    const [time, setTime] = useState("");

    const [difficulty, setDifficulty] = useState("")

    const [photo, setPhoto] = useState<string | null>(null);

    const { addRecipe } = useRecipes();

    //To pick an image
    async function pickImageFromLibrary(setPhoto: (uri: string) => void) {
        const perm = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (!perm.granted) { alert("We need access to your photo library to add a photo."); return; }

        const res = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: "images",
            allowsEditing: true,
            aspect: [2, 1],
            quality: 1,
        });

        if (!res.canceled && res.assets?.[0]?.uri) setPhoto(res.assets[0].uri);
    }
    //To take an image
    async function takePhotoWithCamera(setPhoto: (uri: string) => void) {
        const perm = await ImagePicker.requestCameraPermissionsAsync();
        if (!perm.granted) { alert("We need access to your camera to take a photo."); return; }

        const res = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!res.canceled && res.assets?.[0]?.uri) setPhoto(res.assets[0].uri);
    }
    {/*To give option to pick or take image*/}
    function openPhotoSourceSheet(setPhoto: (uri: string) => void) {
        const ask = () => {
            if (Platform.OS === "ios") {
                ActionSheetIOS.showActionSheetWithOptions(
                    {
                        title: "Add Photo",
                        options: ["Take Photo", "Choose from Library", "Cancel"],
                        cancelButtonIndex: 2,
                    },
                    async (i) => {
                        if (i === 0) await takePhotoWithCamera(setPhoto);
                        if (i === 1) await pickImageFromLibrary(setPhoto);
                    }
                );
            } else {
                Alert.alert(
                    "Add Photo",
                    "",
                    [
                        { text: "Take Photo", onPress: () => takePhotoWithCamera(setPhoto) },
                        { text: "Choose from Library", onPress: () => pickImageFromLibrary(setPhoto) },
                        { text: "Cancel", style: "cancel" },
                    ],
                    { cancelable: true }
                );
            }
        };
        ask();
    }

    // If all of these properties are true then you can publish the app
    const canPublish =
        (title.trim() && description.trim() && portion.trim() && time.toString().trim() && difficulty && photo
            && ingredientList.some(i => i.trim()) && stepList.some(s => s.trim()));

    function handlePublish() {
        const valid = validateRecipe({
            title, description, ingredients: ingredientList, steps: stepList, portion, time, difficulty, photo,
        });
        if (!valid.ok) return Alert.alert(valid.title, valid.message);

        addRecipe({
            title,
            description,
            author: "You",
            image: photo!,
            time: Number(time),
            difficulty: difficulty,
            servings: portion,
            steps: stepList,
            ingredients: ingredientList,
        });
        setTitle(""); setDescription(""); setIngredientList([""]); setStepList([""]);
        setPortion(""); setTime(""); setDifficulty(""); setPhoto(null);
        Alert.alert("Success!", "Your recipe has been published.");
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
                placeholderTextColor="#9CA3AF"
                className="bg-white rounded-xl px-4 py-3 mb-4"
            />

            {/* Description */}
            <Text className="font-semibold mb-1">Description</Text>
            <TextInput
                value={description}
                onChangeText={setDescription}
                placeholder="Short description..."
                placeholderTextColor="#9CA3AF"
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
                            placeholderTextColor="#9CA3AF"
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
                            placeholderTextColor="#9CA3AF"
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
                        placeholderTextColor="#9CA3AF"
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
                        placeholderTextColor="#9CA3AF"
                        keyboardType="numeric"
                        className="bg-white rounded-xl px-4 py-3"
                    />
                </View>
            </View>

            {/* Difficulty */}
            <Text className="font-semibold mb-4">Difficulty</Text>
            <View className="flex-row items-center justify-between mb-4">
                {["Easy", "Medium", "Hard"].map((level) => {
                    const isSelected = difficulty === level;

                    // pick colors depending on level
                    const colors: Record<string, { bg: string; text: string; selectedBg: string; selectedText: string }> = {
                        Easy:   { bg: "bg-emerald-100", text: "text-emerald-500", selectedBg: "bg-emerald-500", selectedText: "text-white" },
                        Medium: { bg: "bg-yellow-100", text: "text-yellow-500", selectedBg: "bg-yellow-500", selectedText: "text-white" },
                        Hard:   { bg: "bg-red-100",    text: "text-red-500",    selectedBg: "bg-red-500",    selectedText: "text-white" },
                    };

                    return (
                        <TouchableOpacity
                            key={level}
                            onPress={() => setDifficulty(level)}
                            className={`w-32 px-2.5 py-1 rounded-full mr-2 items-center 
                            ${isSelected ? colors[level].selectedBg : colors[level].bg}`}
                        >
                            <Text className={`text-xl font-semibold 
                            ${isSelected ? colors[level].selectedText : colors[level].text}`}>
                                {level}
                            </Text>
                        </TouchableOpacity>
                    );
                })}
            </View>



            {/* Photo Upload */}
            <Text className="font-semibold mb-1">Photo</Text>
            <TouchableOpacity
                className="bg-white rounded-xl h-80 items-center justify-center mb-2 overflow-hidden"
                onPress={() => openPhotoSourceSheet((uri) => setPhoto(uri))}
                activeOpacity={0.8}
            >
                {photo ? (
                    <Image
                        source={{ uri: photo }} style={{ width: "100%", height: 320 }}
                        resizeMode="cover"
                    />
                ) : (
                    <Text className="text-gray-500">+ Add Photo</Text>
                )}
            </TouchableOpacity>



            {/* Submit Button */}

            <TouchableOpacity
                className={`rounded-xl py-4 ${canPublish ? "bg-[#1B57BF]" : "bg-gray-300"}`}
                onPress={handlePublish}
                disabled={!canPublish}
            >
                <Text className="text-center text-white font-bold text-lg">Publish Recipe</Text>
            </TouchableOpacity>
        </ScrollView>
    );
}

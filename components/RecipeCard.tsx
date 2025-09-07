import { View, Text, Image, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";

type Props = {
    id: string;
    title: string;
    author?: string;
    image?: string;
    description?: string;
    ingredients?: string[];
    steps?: string[];
    servings?: string | number;
    time?: number;            // minutes
    difficulty?: "Easy" | "Medium" | "Hard" | "Unknown" | string;
    calories?: number;
    onPress?: () => void;     // optional tap handler
};

export default function RecipeCard({
    id,
    title, //these are the properties of the passed in object, these are expected to be unpacked from that object
    author = "Unknown", //optional property that passes in unknown if no author
    image,
    ingredients,
    servings,
    time = 0,
    difficulty = "Unknown",
    steps,
    calories,
    description,
}: Props)
{
    const router = useRouter();

    return (
        <TouchableOpacity
            onPress={() => router.push({ pathname: "/recipe/[id]", params: { id } })}
            className="active:opacity-50"
        >
            <View className="bg-white rounded-2xl overflow-hidden ">
                <View className="flex-row items-center justify-between px-4 pt-3 pb-4 border-b border-gray-100">
                    <View className="flex-row items-center">
                        {/*This is a pfp placeholder for now*/}
                        <View className="w-8 h-8 rounded-full bg-gray-300 mr-2" />
                        <Text className="text-gray-500">By @{author}</Text>
                    </View>
                </View>
                {/* Recipe image */}
                {image ? (
                    <Image source={{ uri: image }} className="w-full h-60" />
                ) : (
                    <View className="w-full h-full bg-gray-200" />
                )}

                {/* Title */}
                <View className="p-4 gap-1">
                    <Text className="text-lg font-extrabold text-gray-900">{title}</Text>
                    {/*This will input a prop of "Description"*/}
                    <Text>{description}</Text>

                    {/*This will show difficulty with respective colors*/}
                    <View className="flex-row mt-2">
                        <View className={`px-2.5 py-1 rounded-full mr-2 ${difficulty === "Easy"
                            ? "bg-emerald-100"
                            : difficulty === "Medium"
                            ? "bg-yellow-100"
                            : difficulty === "Hard"
                            ? "bg-red-100"
                            : difficulty === "Unknown"
                            ? "text-gray-200"
                            : "text-gray-200"}`}>

                            <Text className={`text-xs font-semibold ${difficulty === "Easy"
                                ? "text-emerald-500"
                                : difficulty === "Medium"
                                ? "text-yellow-500"
                                : difficulty === "Hard"
                                ? "text-red-500" 
                                : difficulty === "Unknown"
                                ? "text-gray-700" 
                                : "text-gray-700"
                                }`}>{difficulty}
                            </Text>
                        </View>
                        <View className="bg-blue-100 px-2.5 py-1 rounded-full">
                            <Text className="text-blue-700 text-xs font-semibold">{time} mins</Text>
                        </View>
                        <View className="bg-purple-100 px-2.5 py-1 rounded-full">
                            <Text className="text-purple-700 text-xs font-semibold">{servings} servings</Text>
                        </View>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
}

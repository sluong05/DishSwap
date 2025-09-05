import { View, Text, FlatList, Image, TouchableOpacity } from "react-native";
import { useRecipes } from "@/contexts/RecipeContext";
import GridItem from "@/components/GridItem";

const PROFILE = {
    name: "Steven Luong",
    bio: "Home cook • Seattle 🍳\n I post easy weeknight recipes.",
    followers: 1280,
    following: 96,
    likes: 4312,
    avatar: undefined, // add a URL to show a real photo
};

// This is a function that formats the followers and following display count
function Stat({ label, value }: { label: string; value: number | string }) {
    return (
        <View className="items-center mx-4">
            <Text className="text-lg font-extrabold text-gray-900">{value}</Text>
            <Text className="text-xs text-gray-500">{label}</Text>
        </View>
    );
}

function Header() {
    return (
        <View className="bg-primary-bg pb-4">
            {/* avatar + name + stats */}
            <View className="items-center pt-5">
                {PROFILE.avatar ? (
                    <Image source={{ uri: PROFILE.avatar }} className="w-20 h-20 rounded-full" />
                ) : (
                    <View className="w-20 h-20 rounded-full bg-gray-200 items-center justify-center">
                        <Text className="text-3xl text-gray-500">👤</Text>
                    </View>
                )}

                <Text className="mt-3 text-lg font-bold text-gray-900">{PROFILE.name}</Text>

                <View className="flex-row mt-3">
                    <Stat label="Followers" value={PROFILE.followers} />
                    <Stat label="Following" value={PROFILE.following} />
                    <Stat label="Likes" value={PROFILE.likes} />
                </View>

                {/* bio */}
                <Text className="mt-3 text-center text-gray-600 px-10">{PROFILE.bio}</Text>
            </View>

            {/* divider */}
            <View className="h-[1px] bg-gray-200 mt-4" />
        </View>
    );
}

export default function Profile() {
    const { recipes } = useRecipes();

    return (
        <View className="flex-1 bg-primary-bg">
            <FlatList
                data={recipes}
                keyExtractor={(item) => item.id}
                numColumns={3}
                contentContainerStyle={{ paddingBottom: 24 }}
                ListHeaderComponent={<Header />}
                renderItem={({ item }) => <GridItem item={item} />}
                showsVerticalScrollIndicator={false}
            />
        </View>
    );
}

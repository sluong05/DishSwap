import {Image, Text, TouchableOpacity, View} from "react-native";

export default function GridItem({ item }: { item: { id: string; title: string; image?: string; } }) {
    return (
        <View className="w-1/3 p-[2px]">
            <TouchableOpacity activeOpacity={0.8}>
                <View className="bg-white rounded">
                    <Image source={{ uri: item.image }} className="w-full rounded" style={{ aspectRatio: 1 }} />
                    {/* tiny title strip like your mock */}
                    <View className="absolute bottom-0 left-0 right-0 bg-white/75 px-1 py-0.5 rounded-b">
                        <Text className="text-[11px] font-semibold text-gray-900" numberOfLines={1}>
                            {item.title}
                        </Text>
                    </View>
                </View>
            </TouchableOpacity>
        </View>
    );
}
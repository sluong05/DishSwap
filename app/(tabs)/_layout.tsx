import { Tabs } from "expo-router";
import {Image, ImageSourcePropType} from "react-native";

function TabIcon({ src, color, size }: { src: ImageSourcePropType; color: string; size: number }) {
    return <Image source={src} style={{ width: size, height: size, tintColor: color }} />;
}

const tabs = [
    { name: "index", title: "Feed", icon: require("../../assets/icons/home.png") },
    { name: "discover", title: "Discover", icon: require("../../assets/icons/search.png") },
    { name: "create", title: "Create", icon: require("../../assets/icons/add.png") },
    { name: "saved", title: "Saved", icon: require("../../assets/icons/saved.png") },
    { name: "profile", title: "Profile", icon: require("../../assets/icons/profile.png") },
];

export default function TabsLayout() {
    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: "#1B57BF",
                tabBarInactiveTintColor: "#616263",
                tabBarStyle: { backgroundColor: "#ffffff" },
            }}
        >
            {tabs.map(({ name, title, icon }) => (
                <Tabs.Screen
                    key={name}
                    name={name}
                    options={{
                        title,
                        tabBarIcon: ({ color, size }) => <TabIcon src={icon} color={color} size={size} />,
                    }}
                />
            ))}
        </Tabs>
    );
}

import { Stack } from "expo-router";
import { Image, View } from "react-native";
import './globals.css';
import {RecipeProvider} from "@/contexts/RecipeContext";

function HeaderTitle() {
  return (
      <View className="flex-row items-center">
        <Image
            source={require("../assets/logos/DishSwap.png")}
            style={{ width: 120, height: 28, resizeMode: "contain" }}
        />
      </View>
  );
}

function HeaderRight() {
  return (
      <View className="mr-2">
        <Image
            source={require("../assets/icons/gear.png")}
            style={{ width: 24, height: 24 }}
        />
      </View>
  );
}

export default function RootLayout() {
  return (
      <RecipeProvider>
          <Stack
              screenOptions={{
                headerShown: true,
                headerTitle: () => <HeaderTitle />,
                headerRight: () => <HeaderRight />,
                headerStyle: { backgroundColor: "#ffffff" },
                headerShadowVisible: false,
              }}
          >
            {/* Tabs live under this stack */}
            <Stack.Screen name="(tabs)" options={{ headerTitle: () => <HeaderTitle /> }} />
            {/* Keep other screens (recipe/[id], user/[username]) defaulting to same header */}

              <Stack.Screen
                  name="recipe/[id]"
                  options={{ headerBackVisible: false }}
              />
          </Stack>
      </RecipeProvider>
  );
}
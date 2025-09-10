import { Stack } from "expo-router";
import { Image, View } from "react-native";
import './globals.css';
import {RecipeProvider} from "@/contexts/RecipeContext";
import { Ionicons } from "@expo/vector-icons";


function HeaderTitle() {
  return (
      <View className="flex-row items-center">
        <Image
            source={require("../assets/logos/DishSwap.png")}
            style={{ width: 240, height: 56, resizeMode: "contain" }}
        />
      </View>
  );
}

function HeaderRight() {
  return (
      <View className="mr-2">
          <Ionicons name="settings" size={24} color="grey" /> {/*very far down the road this will be a touchable opacity */}
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
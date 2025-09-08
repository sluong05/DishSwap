import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage"; // optional persistence

// -------------------- Types --------------------
type Recipe = {
    id: string;
    title: string;
    author?: string;
    image?: string;
    description?: string;
    ingredients?: string[];
    steps?: string[];
    servings?: string | number;
    time?: number; // minutes
    difficulty?: "Easy" | "Medium" | "Hard" | "Unknown" | string;
    calories?: number;
};

type RecipeContextType = {
    recipes: Recipe[];
    addRecipe: (recipe: Omit<Recipe, "id">) => void;

    savedIds: string[];
    isSaved: (id: string) => boolean;
    toggleSave: (id: string) => void;
    save: (id: string) => void;
    unsave: (id: string) => void;
};

// -------------------- Context --------------------
const RecipeContext = createContext<RecipeContextType | undefined>(undefined);

const STORAGE_KEY = "saved_recipe_ids_v1";

// your mock data
const INITIAL_RECIPES: Recipe[] = [
    // { id: "1", title: "Garlic Butter Salmon", image: "https://picsum.photos/400/205", author: "Steven" },
    // { id: "2", title: "Spicy Ramen Eggs", image: "https://picsum.photos/400/206", author: "Tracy" },
    // { id: "3", title: "Pizza", image: "https://picsum.photos/400/207" },
];

// -------------------- Provider --------------------
export function RecipeProvider({ children }: { children: ReactNode }) {
    const [recipes, setRecipes] = useState<Recipe[]>(INITIAL_RECIPES);
    const [savedIds, setSavedIds] = useState<string[]>([]);

    // load savedIds from AsyncStorage (optional, can remove if you don’t want persistence yet)
    useEffect(() => {
        (async () => {
            try {
                const raw = await AsyncStorage.getItem(STORAGE_KEY);
                if (raw) setSavedIds(JSON.parse(raw));
            } catch (e) {
                console.warn("Failed to load saved recipes", e);
            }
        })();
    }, []);

    // persist changes
    useEffect(() => {
        AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(savedIds)).catch(() => {});
    }, [savedIds]);

    function addRecipe(recipe: Omit<Recipe, "id">) {
        setRecipes((prev) => [ //this makes a copy of current array and then adds new item to it then sets that new copy as the new array
            ...prev,
            { id: Date.now().toString(), ...recipe }, //generates id based on the date
        ]);
    }

    const isSaved = (id: string) => savedIds.includes(id);

    const save = (id: string) =>
        setSavedIds((prev) => (prev.includes(id) ? prev : [...prev, id]));

    const unsave = (id: string) =>
        setSavedIds((prev) => prev.filter((x) => x !== id));

    const toggleSave = (id: string) =>
        setSavedIds((prev) =>
            prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
        );

    return (
        <RecipeContext.Provider
            value={{ recipes, addRecipe, savedIds, isSaved, save, unsave, toggleSave }}
        >
            {children}
        </RecipeContext.Provider>
    );
}

// -------------------- Hook --------------------
export function useRecipes() {
    const ctx = useContext(RecipeContext);
    if (!ctx) throw new Error("useRecipes must be used inside a RecipeProvider");
    return ctx;
}
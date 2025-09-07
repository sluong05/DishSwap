import React, { createContext, useContext, useState, ReactNode } from "react";

type Recipe = {
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
};

type RecipeContextType = {
    recipes: Recipe[];
    addRecipe: (recipe: Omit<Recipe, "id">) => void;
};

// create context
const RecipeContext = createContext<RecipeContextType | undefined>(undefined);

// your mock data
const INITIAL_RECIPES: Recipe[] = [
    // { id: "1", title: "Garlic Butter Salmon", image: "https://picsum.photos/400/205", author: "Steven" },
    // { id: "2", title: "Spicy Ramen Eggs", image: "https://picsum.photos/400/206", author: "Tracy" },
    // { id: "3", title: "Pizza", image: "https://picsum.photos/400/207" },
    // { id: "4", title: "Garlic Chicken", image: "https://picsum.photos/400/208", author: "Phillip" },
    // { id: "5", title: "Mac n Cheese", image: "https://picsum.photos/400/209" },
];

export function RecipeProvider({ children }: { children: ReactNode }) {
    const [recipes, setRecipes] = useState<Recipe[]>(INITIAL_RECIPES);

    function addRecipe(recipe: Omit<Recipe, "id">) {
        setRecipes(prev => [
            ...prev,
            { id: Date.now().toString(), ...recipe },
        ]);
    }

    return (
        <RecipeContext.Provider value={{ recipes, addRecipe }}>
            {children}
        </RecipeContext.Provider>
    );
}

export function useRecipes() {
    const ctx = useContext(RecipeContext);
    if (!ctx) throw new Error("useRecipes must be used inside a RecipeProvider");
    return ctx;
}
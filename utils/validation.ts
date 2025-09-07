export function validateRecipe({ title, description, ingredients, steps, portion, time, difficulty, photo }:
{
    title: string; description: string; ingredients: string[]; steps: string[];
    portion: string; time: string; difficulty: string; photo: string|null;
}) : { ok: true } | { ok: false; title: string; message: string } {
    if (!title.trim())        return { ok:false, title:"Missing title",        message:"Please enter a recipe title." };
    if (!description.trim())  return { ok:false, title:"Missing description",  message:"Please enter a recipe description." };
    if (!ingredients.length || ingredients.every(i => !i.trim()))
        return { ok:false, title:"Missing ingredients", message:"Please add at least one ingredient." };
    if (!steps.length || steps.every(s => !s.trim()))
        return { ok:false, title:"Missing steps",       message:"Please add at least one step." };
    if (!portion.trim())      return { ok:false, title:"Missing servings",     message:"Please specify how many servings." };
    if (!time.trim())         return { ok:false, title:"Missing time",         message:"Please enter the cooking time." };
    if (!difficulty)          return { ok:false, title:"Missing difficulty",   message:"Please select a difficulty." };
    if (!photo)               return { ok:false, title:"Missing photo",        message:"Please select a photo." };
    return { ok: true };
}
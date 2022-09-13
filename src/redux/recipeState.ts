import recipe_details from "../models/recipe_details";

export class RecipeState{
    recipe: recipe_details[] = [];
}

export enum RecipeActionType{
    newRecipe= "newRecipe",
    deleteRecipe= "deleteRecipe",
    downloadSingleRecipe= "downloadSingleRecipe",
    downloadAllRecipes= "downloadAllRecipes",
    updateRecipeDetails= "updateRecipeDetails",
}

export interface recipeAction{
    type: RecipeActionType,
    payload?: any;
}

export function newRecipe(recipe:recipe_details):recipeAction{
    return{type: RecipeActionType.newRecipe, payload:recipe}
}

export function deleteRecipe(recipeName:string):recipeAction{
    return{type: RecipeActionType.deleteRecipe, payload:recipeName}
}

export function downloadSingleRecipe(recipe: recipe_details):recipeAction{
    return{type: RecipeActionType.downloadSingleRecipe, payload:recipe}
}

export function downloadAllRecipes(recipes:recipe_details[]):recipeAction{
    return{type: RecipeActionType.downloadAllRecipes, payload:recipes}
}

export function updateRecipeDetails(recipe: recipe_details):recipeAction{
    return{type: RecipeActionType.updateRecipeDetails, payload:recipe}
}

export function RecipeReducer(currentState: RecipeState = new RecipeState, action: recipeAction): RecipeState{
    const newState= {...currentState};

    switch(action.type){
        case RecipeActionType.newRecipe:
            newState.recipe.push(action.payload);
            break;
        case RecipeActionType.deleteRecipe:
            newState.recipe = newState.recipe.filter(item=>item.name!==action.payload);
            break;
        case RecipeActionType.downloadSingleRecipe:
            newState.recipe=[];
            newState.recipe.push(action.payload);
            break;
        case RecipeActionType.downloadAllRecipes:
            newState.recipe = action.payload;
            break;
        case RecipeActionType.updateRecipeDetails:
            var updateRecipe = [...newState.recipe].filter(item=>item.name!==action.payload.name);
            updateRecipe.push(action.payload);
            newState.recipe = updateRecipe;
            break;
    }
    return newState;
}
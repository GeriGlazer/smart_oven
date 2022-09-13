import { useEffect, useState } from "react";
import recipe_details from "../../../models/recipe_details";
import "./getAllRecipes.css";
import { store } from "../../../redux/store";
import { Typography } from "@mui/material";
import SingleRecipe from "../singleRecipe/singleRecipe";

function GetAllRecipes(): JSX.Element {
    const [recipes, setRecipes] = useState<recipe_details[]>([]);

    useEffect(()=>{
        setRecipes(store.getState().RecipeState.recipe);
    }, [])

    return (
        <div className="getAllRecipes" style={{color:"black", textAlign:"center"}}>
            <Typography color={'red'} variant="h2" className="HeadLine">On the menu</Typography>
			{recipes.map(item=><SingleRecipe key= {item.name} recipe={item}/> )}
        </div>
    );
}

export default GetAllRecipes;

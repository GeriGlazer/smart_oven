import { Button, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import recipe_details from "../../../models/recipe_details";
import { store } from "../../../redux/store";
import axios from "../../../util/axios";
import globals from "../../../util/globals";
import SingleRecipe from "../../recipeActions/singleRecipe/singleRecipe";
import "./userRecipes.css";

function UserRecipes(): JSX.Element {
    const navigate = useNavigate();
    const [recipes, setRecipes] = useState<recipe_details[]>([]);
    const myRecipesList = store.getState().RecipeState.recipe.filter(item=>item.name.includes("-myRecipe"));
    
    useEffect(()=>{
        setRecipes(myRecipesList);
    }, []);
    
    const goBack = ()=>{
        navigate("/user/menu");
    }
    
    

    return (
        <div className="userRecipes">
			<Typography color={'red'} variant="h2" className="HeadLine">My Recipes</Typography>
			{recipes.map(item=><SingleRecipe key= {item.name} recipe={item}/> )}
            <br /><br />
            <Button variant="contained" color="warning" onClick={goBack}>Back</Button>
        </div>
    );
}

export default UserRecipes;

import { useEffect, useState } from "react";
import recipe_details from "../../../models/recipe_details";
import "./getAllRecipes.css";
import { store } from "../../../redux/store";
import { Button, Typography } from "@mui/material";
import SingleRecipe from "../singleRecipe/singleRecipe";
import { useNavigate } from "react-router-dom";

function GetAllRecipes(): JSX.Element {
    const navigate = useNavigate();
    const [recipes, setRecipes] = useState<recipe_details[]>([]);

    const recipeList = store.getState().RecipeState.recipe.filter(item=>!item.name.includes("-myRecipe"));
    //("-myRecipe")
    useEffect(()=>{
        setRecipes(recipeList);
        console.log(recipeList) ; 
    }, []);
    
    const goBack = ()=>{
        navigate("/user/menu");
    }

    return (
        <div className="getAllRecipes" style={{color:"black", textAlign:"center"}}>
            <Typography color={'red'} variant="h2" className="HeadLine">On the menu</Typography>
			{recipes.map(item=><SingleRecipe key= {item.name} recipe={item}/> )}
            <br /><br />
            <Button variant="contained" color="warning" onClick={goBack}>Back</Button>
        </div>
    );
}

export default GetAllRecipes;

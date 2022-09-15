import { Button } from "@mui/material";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import recipe_details from "../../../models/recipe_details";
import { deleteRecipe } from "../../../redux/recipeState";
import { store } from "../../../redux/store";
import globals from "../../../util/globals";
import SingleRecipe from "../singleRecipe/singleRecipe";
import "./getRecipe.css";

function GetRecipe(): JSX.Element {
    const navigate = useNavigate();
    const location = useLocation();
    const {recipeName} = location.state as any;
    const [recipe, setRecipe] = useState(new recipe_details());

    useEffect(()=>{
        setRecipe(store.getState().RecipeState.recipe.find(item=>item.name==recipeName));
    },[]);

    const removeRecipe= ()=>{
        console.log(recipe);
        axios.delete(globals.url.deleteRecipe+recipeName)
        .then(()=>{
            store.dispatch(deleteRecipe(recipeName));
        })
        .catch((err)=>{console.error(err.response.data)});
        navigate("/recipe/userRecipes");
    };

    const goBack = ()=>{
        navigate("/recipe/userRecipes");
    }

    return (
        <div className="getRecipe" style={{color:"black", padding:100,textAlign:"center"}}>
        <SingleRecipe key={recipe.name} recipe={recipe}/>
        <br /> <br />
        <Button variant="contained" color="error" sx={{margin:1}} onClick={removeRecipe}>Delete</Button>
        <br />
        <Button variant="contained" color="warning" onClick={goBack}>Back</Button>
			
        </div>
    );
}

export default GetRecipe;

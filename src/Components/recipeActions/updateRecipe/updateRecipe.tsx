import "./updateRecipe.css";
import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import recipe_details from "../../../models/recipe_details";
import { useEffect } from 'react';
import { RecipeState } from './../../../redux/recipeState';
import { store } from "../../../redux/store";
import axios from "../../../util/axios";
import globals from "../../../util/globals";
import { useNavigate } from 'react-router-dom';

function UpdateRecipe(): JSX.Element {
    const navigate = useNavigate();
    // const location = useLocation();
    // const {recipeName} = location.state as any;
    const [recipe, setRecipe] = useState(new recipe_details());

    useEffect(()=>{
        setRecipe(store.getState().RecipeState.recipe[0]);
    },[]);

    const deleteRecipe= ()=>{
        console.log(recipe);
        axios.delete(globals.url.deleteRecipe+recipe.name)
        .then(()=>{
            store.dispatch(deleteRecipe(recipe.name));
        })
        .catch((err)=>{console.error(err.response.data)});

    };
    return (
        <div className="updateRecipe">
			
        </div>
    );
}

export default UpdateRecipe;

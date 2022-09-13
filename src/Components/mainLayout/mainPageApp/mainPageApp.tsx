
import { Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import recipe_details from "../../../models/recipe_details";
import { downloadAllRecipes } from "../../../redux/recipeState";
import { store } from "../../../redux/store";
import globals from "../../../util/globals";
import SingleRecipe from "../../recipeActions/singleRecipe/singleRecipe";
import "./mainPageApp.css";

function MainPageApp(): JSX.Element {
    const dispatch = useDispatch();
    const userEmail = store.getState().AuthState.userEmail;
    const [recipes, setRecipes] = useState<recipe_details[]>([]);

    useEffect(()=>{
        axios.get<recipe_details[]>(globals.url.getAllRecipes)
        .then((response)=>{
            setRecipes(response.data)
           dispatch(downloadAllRecipes(response.data));
        }) 
        .catch((err)=>{console.error(err.response.data.details)});
    }, []);


    return (
        <div className="mainPageApp" style={{textAlign:"center"}}>
            <Typography color={'red'} variant="h2" className="HeadLine">On the menu</Typography>
			
           {recipes.map(item=><SingleRecipe key= {item.name} recipe={item} />)}
            
        </div>
    );
}

export default MainPageApp;

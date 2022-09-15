
import { Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import recipe_details from "../../../models/recipe_details";
import { downloadAllRecipes } from "../../../redux/recipeState";
import { store } from "../../../redux/store";
import globals from "../../../util/globals";
import SingleRecipe from "../../recipeActions/singleRecipe/singleRecipe";
import "./mainPageApp.css";

function MainPageApp(): JSX.Element {
    const dispatch = useDispatch();
    const userEmail = store.getState().AuthState.userEmail;
    const navigate = useNavigate();

    useEffect(()=>{
        if(userEmail!==""){
            navigate("/user/menu");
        }
        else{
            navigate("/user/login");
        }
    }, []);

    return (
        <div className="mainPageApp" >
        </div>
    );
}

export default MainPageApp;

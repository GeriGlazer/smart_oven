import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "./menu.css";

function Menu(): JSX.Element {
    const navigate = useNavigate();
    const navNewRecipe = ()=> navigate("/recipeActions/newRecipe");
    const navUserRecipes = ()=> navigate("/recipe/userRecipes");
    const navAllRecipes = ()=> navigate("/recipeActions/getAllRecipes");

    return (
        <div className="menu" style={{padding:100,textAlign:"center"}}>
			<Button style={{color:"red"}} variant="outlined" color="error" onClick={navNewRecipe}>New Recipe</Button><br/><br/>
            <Button style={{color:"red"}} variant="outlined" color="error" onClick={navUserRecipes}>My Recipes</Button><br/><br/>
            <Button size="large" style={{color:"red"}} variant="outlined" color="error" onClick={navAllRecipes}>Recomentadions</Button>
        </div>
    );
}

export default Menu;

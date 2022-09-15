import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import recipe_details from "../../../models/recipe_details";
import { store } from "../../../redux/store";
import "./singleRecipe.css";

interface SingleRecipeProps{
    recipe: recipe_details;
}

function SingleRecipe(props: SingleRecipeProps): JSX.Element {
    const navigate = useNavigate();
    const userEmail = store.getState().AuthState.userEmail;
    const recipesList = store.getState().RecipeState.recipe;
    const recipeName = props.recipe.name;
    const updateRecipe = ()=>{
        navigate("/recipeActions/updateRecipe", {state:{recipeName:props.recipe.name}});
    }

    // const recipeName = ()=>{
    //     const newName = props.recipe.name;
    //     if (newName.includes("-")) {
    //         newName.replace("-myRecipe", ".");
    //     }
    //     return newName;
    // };

    const cookTimeHours = props.recipe.cookTime/3600;
    const sprayInterval = sprayIntervalFormula(props.recipe.sprayNozzleInterval/60000);

    const showOpt=()=>{
        if(userEmail !== ""){
           return(
            <>
                <Button variant="contained" color="primary" type="submit" style={{padding:20, margin:20}}>start</Button>
            </>
           )
        }
    };

    return (
        <div className="singleRecipe solidBox" style={{width:200, textAlign:"center", alignItems:"center"}}>
			<h5>{props.recipe.name}</h5><br/>
            Cook for {cookTimeHours} Hs.<hr/>
            ambient {props.recipe.ambientTemperature} °C<hr/>
            internal {props.recipe.internalMeatTemperature} °C<hr/>
            Spray marinade every: {sprayInterval} Hs.
            {showOpt()}
            <Button variant="contained" color="success" onClick={updateRecipe}>Update</Button>
        </div>
    );
}


export default SingleRecipe;

function sprayIntervalFormula(totalMinutes: number) {
    const minutes = totalMinutes % 60;
    const hours = Math.floor(totalMinutes / 60);
  
    return `${showFormat(hours)}:${showFormat(minutes)}`;
  }
  
  function showFormat(number: number) {
    return number.toString().padStart(2, '0');
  }
  

  

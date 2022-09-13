import { Box, Button, SelectChangeEvent, Slider, TextField, Typography } from "@mui/material";
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import Stack from '@mui/material/Stack';
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import recipe_details from "../../../models/recipe_details";
import { newRecipe } from "../../../redux/recipeState";
import axios from "../../../util/axios";
import globals from "../../../util/globals";
import "./newRecipe.css";
import { SyntheticEvent, useState } from "react";

function NewRecipe(): JSX.Element {
    const {register} = useForm<recipe_details>();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const goBack = ()=>{
        navigate("/user/menu");
    }
    const[recipe, setRecipe] = useState(new recipe_details());

    const[name, setName] = useState<string>("");
    
    const nameChange = (args:SyntheticEvent)=>{
        recipe.name = (args.target as HTMLInputElement).value as string;
        return recipe.name;
    }

    const nameChange1 = (event: SelectChangeEvent)=>{
        setName(event.target.value as string);
    }
    
    const [cookTime, setCookTime] = useState<number>();

    const changeValueCookingTime = (event: Event, newValue: number | number[]) => {
        setCookTime(newValue as number);
    };

    const [envTemp, setEnvTemp] = useState<number>();

    const changeEnvTemp = (event: Event, newValue: number | number[]) => {
        setCookTime(newValue as number);
    };

    const [meatTemp, setMeatTemp] = useState<number>();

    const changeMeatTemp = (event: Event, newValue: number | number[]) => {
        setCookTime(newValue as number);
    };

    const [sprayMarin, setSprayMarin] = useState<number>();

    const changeSprayMarin = (event: Event, newValue: number | number[]) => {
        setCookTime(newValue as number);
    };

    const myRecipe = ()=>{
        recipe.cookTime= cookTime;
        recipe.ambientTemperature = envTemp;
        recipe.internalMeatTemperature = meatTemp;
        recipe.sprayNozzleInterval = sprayMarin;
    }

    

    const save = (details: recipe_details)=>{
        axios.post(globals.url.newRecipe, details)
        .then((response)=>{
            dispatch(newRecipe(response.data));
            console.log(response.data);
        })
        .catch((err)=>{console.error(err.response.data.details)});
        navigate("/recipe/userRecipes");
    }
    const saveAndStart = (details: recipe_details)=>{
        axios.post(globals.url.newRecipe, details)
        .then((response)=>{
            dispatch(newRecipe(response.data));
            console.log(response.data);
        })
        .catch((err)=>{console.error(err.response.data.details)});
        navigate("/recipeActions/startCooking", {state:{recipe:recipe_details}}); 
    }
    const start = (details: recipe_details)=>{
        navigate("/recipeActions/startCooking", {state:{recipe:recipe_details}});
    }

    return (
        <div className="newRecipe" style={{textAlign:"center"}}>
            <br /><br />
			<h1 style={{color:"red"}}>New Recipe</h1><br />
            <form  style={{textAlign:"center", alignItems:"center"}} >
                <TextField 
                    name="name" 
                    label="Recipe name" 
                    margin="dense" 
                    variant="outlined" 
                    className="TextBox" 
                    focused 
                    sx={{input:{color:'gray'}}} 
                    style={{ width: 400 }}
                    // onChange={nameChange1}
                />
                <br /> <br /> 
                <Box >
                    <Typography color={'white'}>
                        Cooking time
                    </Typography>
                    <Stack direction="row" sx={{ mb: 5 ,color:'white'}} alignItems="center">
                        <RemoveIcon sx={{ml:70}}/>
                        <span >30 min.</span>
                        <Slider
                        aria-label="Cooking time"
                        defaultValue={6}
                        min={0.5}
                        max={72}
                        valueLabelDisplay="on"
                        onChange={changeValueCookingTime}
                        />
                        <span>72 Hs</span>
                        <AddIcon sx={{mr:70}}/>
                    </Stack>
                </Box>
               
                <Box>
                    <Typography color={'white'}>
                    Enviromental temperature  
                    </Typography>
                        <Stack direction="row" sx={{ mb: 5  , mt: 3 , color:'white'}} alignItems="center">
                            <RemoveIcon sx={{ml:70}}/>
                            <span>25°C</span>
                            <Slider
                            aria-label="Enviromental temperature"
                            defaultValue={120}
                            valueLabelDisplay="on"
                            min={25}
                            max={180}
                            onChange={changeEnvTemp}
                            />
                            <span>180°C</span>
                            <AddIcon sx={{mr:70}}/>
                        </Stack>
                </Box>

                <Box>
                    <Typography color={'white'}>
                    Internal meat temperature
                    </Typography>
                    <Stack direction="row" sx={{ mb: 5 ,  mt: 3 ,color:'white' }} alignItems="center">
                        <RemoveIcon sx={{ml:70}}/>
                        <span>25°C</span>
                        <Slider
                        aria-label= "Internal Meat Temperature"
                        defaultValue={65}
                        valueLabelDisplay="on"
                        min={25}
                        max={180}
                        onChange={changeMeatTemp}
                        />
                        <span>180°C</span>
                        <AddIcon sx={{mr:70}}/>
                    </Stack>
                </Box>
                
                <Box>
                    <Typography color={'white'}>
                    Spray marinade every:
                    </Typography>
                        <Stack  direction="row" sx={{ mb: 5 , mt: 3 , color:'white' }} alignItems="center">
                            <RemoveIcon sx={{ml:70}}/>
                            <span>0 Hs</span>
                            <Slider
                            aria-label= "Spray Marinade"
                            defaultValue={1}
                            valueLabelDisplay="on"
                            min={0}
                            max={24}
                            onChange={changeSprayMarin}
                            />
                            <span>24 Hs</span>
                            <AddIcon sx={{mr:70}}/>
                        </Stack>
                </Box>
                    <Button variant="contained" color="primary" type="submit" style={{padding:20, margin:20}}>Save</Button>
                    <Button variant="contained" color="primary" type="submit" style={{padding:20, margin:20}}>Save and Start</Button>
                    <Button variant="contained" color="primary" type="submit" style={{padding:20, margin:20}}>start</Button>
                
            </form>
        </div>
    );
}

export default NewRecipe;

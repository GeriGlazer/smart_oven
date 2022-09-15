import "./updateRecipe.css";
import { useLocation } from 'react-router-dom';
import { SyntheticEvent, useState } from 'react';
import recipe_details from "../../../models/recipe_details";
import { useEffect } from 'react';
import { deleteRecipe, downloadAllRecipes, updateRecipeDetails } from './../../../redux/recipeState';
import { store } from "../../../redux/store";
import axios from "../../../util/axios";
import globals from "../../../util/globals";
import { useNavigate } from 'react-router-dom';
import SingleRecipe from "../singleRecipe/singleRecipe";
import { Box, Button, Slider, Stack, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';

function UpdateRecipe(): JSX.Element {
    const {handleSubmit} = useForm<recipe_details>();
    const navigate = useNavigate();
    const location = useLocation();
    const {recipeName} = location.state as any;
    const [recipe, setRecipe] = useState(new recipe_details());
    const dispatch = useDispatch();

    useEffect(()=>{
        setRecipe(store.getState().RecipeState.recipe.find(item=>item.name==recipeName));
    },[]);

    const change = (event: Event, newValue: number | number[]) => {
        const {name} = (event.target as HTMLInputElement);
        setRecipe({
            ...recipe,
            [name]: newValue as number,
        });
        //console.log(`Name: ${name}, Value: ${newValue}`);
    };

    const nameChange = (args:SyntheticEvent)=>{
        const {name, value } = (args.target as HTMLInputElement);
        //console.log(`Name: ${name}, Value: ${value}`);
        setRecipe({
            ...recipe,
            [name]:value,
        })
    };

    const submit=(details: recipe_details)=>{
        axios.post(globals.url.newRecipe, details)
        .then((response)=>{
            dispatch(updateRecipeDetails(response.data));
            // console.log(response.data);
        })
        .catch((err)=>{console.error(err.response.data.details)});
        axios.get<recipe_details[]>(globals.url.getAllRecipes)
        .then((response)=>{
            dispatch(downloadAllRecipes(response.data));
        }) 
        .catch((err)=>{console.error(err.response.data.details)});
        navigate("/recipe/userRecipes");
    }
    

    const goBack = ()=>{
        navigate("/recipe/userRecipes");
    }

    return (
        <div className="updateRecipe" style={{textAlign:"center"}}>
			<br />
			<h1 style={{color:"red"}}>Update Recipe Properties</h1>
            <span style={{color:"white"}}>A new recipe will be saved after parameters are updated</span><br />
            <span style={{color:"white"}}>To delete the original recipe please go to my recipes</span><br />
            <form  style={{textAlign:"center", alignItems:"center"}} onSubmit={handleSubmit(submit)}>

            </form>
                <TextField 
                    name="name" 
                    label="New name"
                    placeholder={recipe.name}
                    margin="dense" 
                    variant="outlined" 
                    className="TextBox" 
                    focused 
                    sx={{input:{color:'gray'}}} 
                    style={{ width: 400 }}
                    onChange={nameChange}
                    />
                <br /> <br />
                <Box >
                    <Typography color={'white'}> Cooking time </Typography>
                    <Stack direction="row" sx={{ mb: 5 ,color:'white'}} alignItems="center">
                        <RemoveIcon sx={{ml:70}}/>
                        <span >30 min.</span>
                        <Slider
                        name="cookTime"
                        aria-label="Cooking time"
                        key= {`slider-${recipe.cookTime}`}
                        value={recipe.cookTime}
                        min={0.5}
                        max={72}
                        valueLabelDisplay="on"
                        onChange={change}
                        />
                        <span>72 Hs</span>
                        <AddIcon sx={{mr:70}}/>
                    </Stack>
                </Box> 

                <Box>
                    <Typography color={'white'}> Enviromental temperature </Typography>
                        <Stack direction="row" sx={{ mb: 5  , mt: 3 , color:'white'}} alignItems="center">
                            <RemoveIcon sx={{ml:70}}/>
                            <span>25°C</span>
                            <Slider
                            name="ambientTemperature"
                            aria-label="Enviromental temperature"
                            key= {`slider-${recipe.ambientTemperature}`}
                            value={recipe.ambientTemperature}
                            valueLabelDisplay="on"
                            min={25}
                            max={180}
                            onChange={change}
                            />
                            <span>180°C</span>
                            <AddIcon sx={{mr:70}}/>
                        </Stack>
                </Box>

                <Box>
                    <Typography color={'white'}> Internal meat temperature  </Typography>
                    <Stack direction="row" sx={{ mb: 5 ,  mt: 3 ,color:'white' }} alignItems="center">
                        <RemoveIcon sx={{ml:70}}/>
                        <span>25°C</span>
                        <Slider
                        name="internalMeatTemperature"
                        aria-label= "Internal Meat Temperature"
                        key= {`slider-${recipe.internalMeatTemperature}`}
                        value={recipe.internalMeatTemperature}
                        valueLabelDisplay="on"
                        min={25}
                        max={180}
                        onChange={change}
                        />
                        <span>180°C</span>
                        <AddIcon sx={{mr:70}}/>
                    </Stack>
                </Box>
                
                <Box>
                    <Typography color={'white'}> Spray marinade every: </Typography>
                        <Stack  direction="row" sx={{ mb: 5 , mt: 3 , color:'white' }} alignItems="center">
                            <RemoveIcon sx={{ml:70}}/>
                            <span>0 Hs</span>
                            <Slider
                            name="sprayNozzleInterval"
                            aria-label= "Spray Marinade"
                            key= {`slider-${recipe.sprayNozzleInterval}`}
                            value={recipe.sprayNozzleInterval}
                            valueLabelDisplay="on"
                            min={0}
                            max={24}
                            onChange={change}
                            />
                            <span>24 Hs</span>
                            <AddIcon sx={{mr:70}}/>
                        </Stack>
                </Box>
                    <Button variant="contained" color="primary" type="submit" style={{margin:20}}>Save</Button>
            <br />
            <Button variant="contained" color="warning" onClick={goBack}>Back</Button>
        </div>
    );
}

export default UpdateRecipe;

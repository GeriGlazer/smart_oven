import { Box, Button, Slider, TextField, Typography } from "@mui/material";
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import Stack from '@mui/material/Stack';
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import recipe_details from "../../../models/recipe_details";
import { downloadAllRecipes, newRecipe } from "../../../redux/recipeState";
import axios from "../../../util/axios";
import globals from "../../../util/globals";
import "./newRecipe.css";
import { SyntheticEvent, useState } from "react";
import { error } from "console";

function NewRecipe(): JSX.Element {
    const {handleSubmit} = useForm<recipe_details>();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const goBack = ()=>{
        navigate("/user/menu");
    }
    const[recipe, setRecipe] = useState<recipe_details>(new recipe_details());

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

    const choise = {
        button: 1,
    };

    const submit=(details: recipe_details)=>{
        details=recipe;
        console.log(details)
        //save button
        if (choise.button==1){
            axios.post(globals.url.newRecipe, details)
            .then((response)=>{
                dispatch(newRecipe(response.data));
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
        //save and start button
        if(choise.button==2){
            axios.post(globals.url.newRecipe, details)
            .then((response)=>{
                dispatch(newRecipe(response.data));
                // console.log(response.data);
            })
            .catch((err)=>{console.error(err.response.data.details)});
            axios.get<recipe_details[]>(globals.url.getAllRecipes)
            .then((response)=>{
                dispatch(downloadAllRecipes(response.data));
            }) 
            .catch((err)=>{console.error(err.response.data.details)});
            navigate("/recipeActions/startCooking", {state:{recipe:recipe_details}}); 
        }
        //start button
        if(choise.button==3){
            navigate("/recipeActions/startCooking", {state:{recipe:recipe_details}});
        }
    };

    return (
        <div className="newRecipe" style={{textAlign:"center"}}>
            <br /><br />
			<h1 style={{color:"red"}}>New Recipe</h1><br />
            <form  style={{textAlign:"center", alignItems:"center"}} onSubmit={handleSubmit(submit)}>
                <TextField 
                    name="name" 
                    label="Recipe name" 
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
                    <Typography color={'white'}>
                        Cooking time
                    </Typography>
                    <Stack direction="row" sx={{ mb: 5 ,color:'white'}} alignItems="center">
                        <RemoveIcon sx={{ml:70}}/>
                        <span >30 min.</span>
                        <Slider
                        name="cookTime"
                        aria-label="Cooking time"
                        defaultValue={6}
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
                    <Typography color={'white'}>
                    Enviromental temperature  
                    </Typography>
                        <Stack direction="row" sx={{ mb: 5  , mt: 3 , color:'white'}} alignItems="center">
                            <RemoveIcon sx={{ml:70}}/>
                            <span>25°C</span>
                            <Slider
                            name="ambientTemperature"
                            aria-label="Enviromental temperature"
                            defaultValue={120}
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
                    <Typography color={'white'}>
                    Internal meat temperature
                    </Typography>
                    <Stack direction="row" sx={{ mb: 5 ,  mt: 3 ,color:'white' }} alignItems="center">
                        <RemoveIcon sx={{ml:70}}/>
                        <span>25°C</span>
                        <Slider
                        name="internalMeatTemperature"
                        aria-label= "Internal Meat Temperature"
                        defaultValue={65}
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
                    <Typography color={'white'}>
                    Spray marinade every:
                    </Typography>
                        <Stack  direction="row" sx={{ mb: 5 , mt: 3 , color:'white' }} alignItems="center">
                            <RemoveIcon sx={{ml:70}}/>
                            <span>0 Hs</span>
                            <Slider
                            name="sprayNozzleInterval"
                            aria-label= "Spray Marinade"
                            defaultValue={1}
                            valueLabelDisplay="on"
                            min={0}
                            max={24}
                            onChange={change}
                            />
                            <span>24 Hs</span>
                            <AddIcon sx={{mr:70}}/>
                        </Stack>
                </Box>
                    <Button variant="contained" color="primary" onClick={()=> (choise.button = 1)} type="submit" style={{padding:20, margin:20}}>Save</Button>
                    <Button variant="contained" color="primary"  onClick={()=> (choise.button = 2)} type="submit" style={{padding:20, margin:20}}>Save and Start</Button>
                    <Button variant="contained" color="primary"  onClick={()=> (choise.button = 3)} type="submit"style={{padding:20, margin:20}}>start</Button>
            </form>
            <br /> <br />
            <Button variant="contained" color="warning" onClick={goBack}>Back</Button>
        </div>
    );
}

export default NewRecipe;

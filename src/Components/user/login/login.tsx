import { Button, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import user_details from "../../../models/user_details";
import "./login.css";
import axios from './../../../util/axios';
import globals from "../../../util/globals";
import { useDispatch } from "react-redux";
import { loginUser } from "../../../redux/authState";
import { NavLink, useNavigate } from "react-router-dom";
import { store } from './../../../redux/store';
import { downloadDetails } from './../../../redux/userState';
import recipe_details from './../../../models/recipe_details';
import { downloadAllRecipes } from './../../../redux/recipeState';

function Login(): JSX.Element {
    const {register, handleSubmit,} = useForm<user_details>();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const send = (details: user_details)=>{
        axios.post(globals.url.login, details)
        .then((response)=>{
            dispatch(loginUser(response.headers.email));;
            console.log(response.headers.email);
        })
        axios.get<user_details>(globals.url.getUserDetails)
        .then((response)=>{
            let singleUser = response.data;
            store.dispatch(downloadDetails(singleUser));
        })
        axios.get<recipe_details[]>(globals.url.getAllRecipes)
        .then((response)=>{
           dispatch(downloadAllRecipes(response.data));
        }) 
        .catch((err)=>{console.error(err.response.data.details)});
        navigate("/user/menu");
    }

    const goBack = ()=>{
        navigate("/");
    }
    
    return (
        <div className="login" style={{margin:100,textAlign:"center"}}>
			<Typography color={'red'} variant="h2" className="HeadLine">Welcome</Typography>
            <br /><br />
            <form className="solidBox" style={{textAlign:"center"}} onSubmit={handleSubmit(send)} >
                <TextField name="name" label="name" variant="outlined" className="TextBox" fullWidth {...register("name", {
                    required:{
                        value: true,
                        message: "Missing Name", 
                    }
                })}
                sx={{backgroundColor:'lightGray', borderRadius:3}}
                />
                <br /> <br /> <br />
                <TextField name="email" label="email" variant="outlined"  className="TextBox" fullWidth {...register("email", {
                    required: {
                        value: true,
                        message: "Missing Email",
                        },
                    })}
                    sx={{backgroundColor:'lightGray', borderRadius:3}}
                    />
                    <br /><br />
                    <NavLink to="../../userActions/addUser">New user? create account</NavLink>
                <br /><br /><br />
                <Button variant="contained" color="error" type="submit">Login</Button>
            </form>
            <br /><br />
            <Button variant="contained" color="warning" onClick={goBack}>Back</Button>
        </div>
    );
}

export default Login;


import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import user_details from "../../../models/user_details";
import { addUser } from "../../../redux/userState";
import axios from "../../../util/axios";
import globals from "../../../util/globals";
import "./addUser.css";

function AddUser(): JSX.Element {
    const {register,handleSubmit, formState:{ errors },} = useForm<user_details>();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const goBack = ()=>{
        navigate("/");
    }

    const send = (details: user_details)=>{
        axios.post(globals.url.addUser, details)
        .then((response)=>{
            dispatch(addUser(response.data));
            console.log(response.headers.data);
        })
        .catch((err)=>{console.error(err.response.data.details)});
        navigate("/user/menu");
    }

    return (
        <div className="addUser" style={{textAlign:"center"}}>
            <br /> <br />
			<h1 style={{color:"red"}}>Create account</h1>
            <br /> <br />
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
                <br /> <br /> 
                
                <Button variant="contained" color="primary" type="submit">Register</Button>
            </form>
            <br /><br />
            <Button variant="contained" color="warning" onClick={goBack}>Back</Button>
        </div>
    );
}

export default AddUser;

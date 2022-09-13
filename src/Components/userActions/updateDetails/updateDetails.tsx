import { useEffect, useState, SyntheticEvent } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import user_details from "../../../models/user_details";
import "./updateDetails.css";
import { useForm } from 'react-hook-form';
import { useDispatch } from "react-redux";
import { store } from "../../../redux/store";
import axios from "../../../util/axios";
import globals from "../../../util/globals";
import { updateDetails } from "../../../redux/userState";
import { Button, TextField } from "@mui/material";

function UpdateDetails(): JSX.Element {

    const location = useLocation();
    const{userEmail} = location.state as any;
    const [user, setUser] = useState(new user_details());
    const {register, handleSubmit} = useForm<user_details>();
    const navigate = useNavigate();
    
    useEffect(()=>{
        setUser(store.getState().UserState.user.find(item=>userEmail==item.email));
    },[]);

    const goBack= ()=>{
        navigate("/user/menu");
    }

    const send = ()=>{
        console.log(user);
        axios.put(globals.url.updateUserDetails, user)
        .then((response)=>{
            store.dispatch(updateDetails(user));
        })
        .catch((err)=>{console.error(err.response.data)});
        navigate("/user/menu");
    };

    const nameChange = (args:SyntheticEvent)=>{
        user.name = (args.target as HTMLInputElement).value;
    }
    const emailChange = (args:SyntheticEvent)=>{
        user.email = (args.target as HTMLInputElement).value;
    }

    return (
        <div className="updateDetails" style={{padding:100,textAlign:"center"}}>
          <h3 style={{textAlign:"center"}}>Update User Details</h3><hr/>  
          <form className="solidBox" onSubmit={handleSubmit(send)}>
                <TextField name="name" label={user.name} variant="outlined" className="TextBox" fullWidth {...register("name",{
                        required:{
                            value:true,
                            message: 'Missing name'
                        }
                        })}  onChange={nameChange} helperText="User Name"/>
                <br/><br/>
                <TextField name="email" label={user.email} variant="outlined" className="TextBox" fullWidth {...register("email",{
                    required:{
                        value:true,
                        message: 'Missing Email'
                    }
                    })}  onChange={emailChange} helperText="Company Email"/>
                <br/><br/>
                <Button variant="contained" type="submit" color="primary" >Update</Button>
            </form>
            <br /><br />
             <Button variant="contained" color="warning" onClick={goBack}> Back</Button>
        </div>
    );
}

export default UpdateDetails;

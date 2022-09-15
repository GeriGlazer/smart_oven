import Button from "@mui/material/Button";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import user_details from "../../../models/user_details";
import { store } from "../../../redux/store";
import { deleteUser } from "../../../redux/userState";
import globals from "../../../util/globals";
import SingleUser from "../singleUser/singleUser";
import "./userMenu.css";

function UserMenu(): JSX.Element {
    const navigate = useNavigate();
    const [user, setUser] = useState(new user_details());
    const goBack = ()=>{
        navigate("/");
    }

    useEffect(()=>{
        setUser(store.getState().UserState.user[0]);
    },[]);

    const deleteAccount = ()=>{
        axios.delete(globals.url.deleteUser+user.email)
        .then(()=>{
            store.dispatch(deleteUser(user.email))
        })
        .catch((err)=>{console.error(err.response.data)});
        navigate("/");
    }

    const showDetails = ()=>{
        return(
            <>
                <div style={{color:"black"}} >
                        <SingleUser key={user.email} user={user}/>
                </div>
            </>
        )
    };

    
    return (
        <div className="userMenu" style={{padding:100,textAlign:"center"}}>
            {showDetails()}
            <br/><br/>
            <Button variant="outlined" color="error" onClick={deleteAccount} >Remove My Account</Button><br/><br/>
            <Button variant="contained" color="warning" onClick={goBack}>Back</Button>
        </div>
    );
}

export default UserMenu;

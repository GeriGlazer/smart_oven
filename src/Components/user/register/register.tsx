import { useNavigate } from "react-router-dom";
import "./register.css";
import { Button, Typography } from "@mui/material";


function Register(): JSX.Element {
    const navigate = useNavigate();

    const newUser = ()=> {
        navigate("/userActions/addUser");
    }
    const login = ()=>{
        navigate("/user/login");
    }
    return (
        <div className="register solidBox" style={{margin:100,textAlign:"center"}}>
            <Typography variant="h3">Welcome</Typography>
            <Button variant="outlined" type="submit" color="primary" onClick={newUser}>Register</Button>
            <Button variant="outlined" type="submit" color="secondary" onClick={login}>Login</Button>
        </div>
    );
}

export default Register;

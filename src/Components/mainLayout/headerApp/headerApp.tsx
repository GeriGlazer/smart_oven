import "./headerApp.css";
import carnivore from "../../../assets/Name.png";
import logo from "../../../assets/logo2.png";
import { Button, ButtonGroup } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { store } from "../../../redux/store";

function HeaderApp(): JSX.Element {
    const navigate = useNavigate();
    const userEmail = store.getState().AuthState.userEmail;
    
    const showOpt=()=>{
        if(userEmail == ""){
           return(
            <>
                <ButtonGroup className="Button-sideBySideRigt">
                    <Button style={{marginLeft:"5px"}} variant="contained" color="primary" onClick={login}>Login</Button>
                    <Button style={{marginLeft:"10px"}} variant="contained" color="secondary" onClick={register}>Register</Button>
                </ButtonGroup>
            </>
           )
        }
        
    };

    const login = ()=>{
        navigate("/user/login")
    }
    const register = ()=>{
        navigate("/userActions/addUser");
    }

    return (
        <div className="headerApp">
            <div className="img-sideBySide">
                <img height={35} src={logo} alt="CarnivoreIMG"/>
                <img height={40} src={carnivore} alt="Carnivore Logo"/>
            </div>
            {showOpt()}
        </div>
    );
}

export default HeaderApp;

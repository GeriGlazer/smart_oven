import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import "./footerApp.css";

function FooterApp(): JSX.Element {
const navigate = useNavigate();
const userMenu = ()=>{
    navigate("/userActions/userMenu");
}


    return (
        <div className="footerApp">
            <Button variant="contained" color="secondary" onClick={userMenu}>User Menu</Button>
			<Button variant="contained" color="success" >In-process</Button>
        </div>
    );
}

export default FooterApp;

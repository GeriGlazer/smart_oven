import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import { useNavigate } from "react-router-dom";
import user_details from "../../../models/user_details";
import "./singleUser.css";

interface SingleUserProps{
    user : user_details;
}

function SingleUser(props: SingleUserProps): JSX.Element {
    const navigate = useNavigate();
    const updateUserDetails = ()=>{
        navigate("/userActions/updateDetails", {state:{userEmail:props.user.email}});
    }

    return (
        <div className="singleUser solidBox">
		{props.user.name}<br/><br/>
        {props.user.email}<br/><br/>
        <ButtonGroup vocab="contained" fullWidth>
            <Button color="primary" onClick={updateUserDetails}>Update Details</Button>
        </ButtonGroup>
        </div>
    );
}


export default SingleUser;

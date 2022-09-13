import { Route, Routes } from "react-router-dom";
import Menu from "../user/menu/menu";
import "./routing.css";
import Login from '../user/login/login';
import MainPageApp from "../mainLayout/mainPageApp/mainPageApp";
import Page404 from './../user/page404/page404';

import Register from "../user/register/register";
import AddUser from "../userActions/addUser/addUser";
import UpdateDetails from "../userActions/updateDetails/updateDetails";
import GetAllRecipes from "../recipeActions/getAllRecipes/getAllRecipes";
import GetRecipe from "../recipeActions/getRecipe/getRecipe";
import NewRecipe from "../recipeActions/newRecipe/newRecipe";
import StartCooking from "../recipeActions/startCooking/startCooking";
import StopCooking from "../recipeActions/stopCooking/stopCooking";
import UpdateRecipe from "../recipeActions/updateRecipe/updateRecipe";
import DeleteRecipe from "../recipeActions/deleteRecipe/deleteRecipe";
import UserMenu from "../userActions/userMenu/userMenu";


function Routing(): JSX.Element {
    return (
        <div className="routing">
			<Routes>
                <Route path="/" element={<MainPageApp/>}/>
                <Route path="user/login" element={<Login/>}/>
                <Route path="user/register" element={<Register/>}/>
                <Route path="user/menu" element={<Menu/>}/>
                
                <Route path="userActions/addUser" element={<AddUser/>}/>
                <Route path="userActions/updateDetails" element={<UpdateDetails/>}/>
                <Route path="userActions/userMenu" element={<UserMenu/>}/>

                <Route path="recipeActions/deleteRecipe" element={<DeleteRecipe/>}/>
                <Route path="recipeActions/getAllRecipes" element={<GetAllRecipes/>}/>
                <Route path="recipeActions/getRecipe" element={<GetRecipe/>}/>
                <Route path="recipeActions/newRecipe" element={<NewRecipe/>}/>
                <Route path="recipeActions/startCooking" element={<StartCooking/>}/>
                <Route path="recipeActions/stopCooking" element={<StopCooking/>}/>
                <Route path="recipeActions/updateRecipe" element={<UpdateRecipe/>}/>

                <Route path="*" element={<Page404/>}/>

            </Routes>
        </div>
    );
}

export default Routing;

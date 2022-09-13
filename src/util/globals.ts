class Globals{

}
class DevelopmentGlobals extends Globals{
    public url = {
        login: "http://localhost:8080/smartOven/login",
        addUser: "http://localhost:8080/smartOven/addUser",
        updateUserDetails: "http://localhost:8080/smartOven/updateDetails",
        deleteUser: "http://localhost:8080/smartOven/deleteUser/",
        getUserDetails: "http://localhost:8080/smartOven/userDetails",

        newRecipe: "http://localhost:8080/smartOven/newRecipe",
        getRecipe: "http://localhost:8080/smartOven/getRecipe/",
        getAllRecipes: "http://localhost:8080/smartOven/getAllRecipes",
        updateRecipe: "http://localhost:8080/smartOven/update",
        deleteRecipe: "http://localhost:8080/smartOven/delete/",
        startCooking: "http://localhost:8080/smartOven/inProcess",
        stopCooking:   "http://localhost:8080/smartOven/stopped",
    }
}

class ProductionGlobals extends Globals{
    public url = {
        login: "/smartOven/login",
        addUser: "/smartOven/addUser",
        updateUserDetails: "/smartOven/updateUserDetails",
        deleteUser: "/smartOven/deleteUser/",
        getUserDetails: "/smartOven/userDetails",

        newRecipe: "/smartOven/newRecipe",
        getRecipe: "/smartOven/getRecipe/",
        getAllRecipes: "/smartOven/getAllRecipes",
        updateRecipe: "/smartOven/update",
        deleteRecipe: "/smartOven/delete/",
        startCooking: "/smartOven/inProcess",
        stopCooking:   "/smartOven/stopped",
    }
}

const globals = process.env.NODE_ENV === 'production' ? new ProductionGlobals : new DevelopmentGlobals;
export default globals;
import { AuthReducer } from "./authState";
import { combineReducers } from 'redux';
import { configureStore } from "@reduxjs/toolkit";
import { UserReducer, UserState } from './userState';
import { RecipeState, RecipeReducer } from './recipeState';

const combine = combineReducers({AuthState:AuthReducer, UserState:UserReducer, RecipeState:RecipeReducer})
export const store = configureStore({
    reducer: combine,
    // middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    // immutableCheck: false,
    // serializableCheck: false,
        //})
});

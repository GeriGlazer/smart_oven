export class AuthState{
    userEmail : string="";
}

export enum AuthActionType{
    loginUser = "loginUser",
    logOutUser = "logOutUser",
}

export interface AuthAction{
    type: AuthActionType,
    payload?: any,
}

export function loginUser(userEmail: string):AuthAction{
    return{type:AuthActionType.loginUser, payload: userEmail}
}

export function logOutUser(): AuthAction{
    return {type:AuthActionType.logOutUser}
}

export function AuthReducer (currentState: AuthState = new AuthState, action:AuthAction):AuthState{
    const newState = {...currentState};

    switch(action.type){
        case AuthActionType.loginUser:
            newState.userEmail = action.payload;
            break;
        case AuthActionType.logOutUser:
            newState.userEmail="";
            break;
    }
    return newState;
}
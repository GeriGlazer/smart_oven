
import user_details from './../models/user_details';

export class UserState{
    user : user_details[] = [];
}

export enum UserActionType{
    addUser = "addUser",
    deleteUser = "deleteUser",
    updateDetails = "updateDetails",
    downloadDetails = "downloadDetails",
}

export interface userAction{
    type: UserActionType,
    payload?: any,
}

export function addUser(user:user_details):userAction{
    return {type: UserActionType.addUser, payload:user}
}

export function deleteUser(userEmail:string):userAction{
    return {type: UserActionType.deleteUser, payload:userEmail}
}

export function updateDetails(user:user_details):userAction{
    return {type: UserActionType.updateDetails, payload:user}
}

export function downloadDetails(user: user_details):userAction{
    return{type: UserActionType.downloadDetails, payload:user}
}

export function UserReducer (currentState: UserState = new UserState,  action: userAction): UserState{
    const newState = {...currentState};

    switch(action.type){
        case UserActionType.addUser:
            newState.user.push(action.payload);
            break;
        case UserActionType.deleteUser:
            newState.user = newState.user.filter(item=>item.email!==action.payload);
            break;
        case UserActionType.updateDetails:
            var updateUser = [...newState.user].filter(item=>item.email!==action.payload.email);
            updateUser.push(action.payload);
            newState.user = updateUser;
            break;
        case UserActionType.downloadDetails:
            newState.user=[];
            newState.user.push(action.payload);
            break;
    }
    return newState;
}

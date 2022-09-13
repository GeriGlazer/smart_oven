import myaxios from 'axios';
import { store } from '../redux/store';
import { loginUser } from '../redux/authState';

const axios = myaxios.create();

axios.interceptors.request.use(
    request=>{
    if(request.url?.includes('smartOven')){
        request.baseURL = store.getState().AuthState.userEmail
    };
    return request;
    });

axios.interceptors.response.use(
    response=>{
        store.dispatch(loginUser(response.headers.email));
        return response;
    });

export default axios;
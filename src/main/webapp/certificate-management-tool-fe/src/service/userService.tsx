import axios from "axios";
import Cookies from 'universal-cookie'
import UserModel from "../model/UserModel";

const cookies = new Cookies();

export const registerUser = (user:UserModel) => {
    return axios.post('http://localhost:8080/registration', user);
};

export const loginUser = (userName: string) => {
    saveUserToCookie(new UserModel(userName, ['lab.softquantum.com']))
};

export const saveUserToCookie = (user: UserModel) => {
    cookies.set('loggedind-user', user)
};

export const getUserFromCookie = () =>{
    return cookies.get('loggedind-user') as UserModel;
};

export const logoutUser = () => {
    cookies.remove('loggedind-user');
};

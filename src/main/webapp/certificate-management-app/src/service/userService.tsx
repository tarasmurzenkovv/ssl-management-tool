import axios from "axios";
import UserModel from "../model/UserModel";
import Cookies from "universal-cookie/lib";

export const host = 'http://localhost:8080/';

export const cookies = new Cookies();

export class UserService {
    static registerUser = (user: UserModel) => {
        return axios.post(host + 'registration', user);
    };

    static loginUser = (userModel: UserModel) => {
        return axios.post(host + 'login', userModel);
    };

    static saveUserToCookie = (user: UserModel) => {
        cookies.set('loggedind-user', user)
    };

    static getUserFromCookie = () => {
        return cookies.get('loggedind-user') as UserModel;
    };

    static logoutUser = () => {
        cookies.remove('loggedind-user');
    };
}

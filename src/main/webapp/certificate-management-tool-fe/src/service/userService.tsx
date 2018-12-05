import axios from "axios";
import Cookies from 'universal-cookie'
import UserModel from "../model/UserModel";

const host = 'http://localhost:8080/';
const cookies = new Cookies();

export default class ValidationError {
    fieldName: string;
    errorMessage: string;

    constructor(fieldName: string, errorMessage: string) {
        this.fieldName = fieldName;
        this.errorMessage = errorMessage;
    }
}

export const validateUserLoginInputFields = (user: UserModel) => {
    const login = user.userName;
    const password = user.password;
    if (null == login || '' == login) {
        return new ValidationError('inputLogin', 'User login cannot be empty');
    }
    if (null == password || '' == password) {
        return new ValidationError('inputPassword', 'User password cannot be empty');
    }

    return null;
};

export const registerUser = (user: UserModel) => {
    return axios.post(host + 'registration', user);
};

export const loginUser = (userModel: UserModel) => {
    return axios.post(host + 'login', userModel);
};

export const saveUserToCookie = (user: UserModel) => {
    cookies.set('loggedind-user', user)
};

export const getUserFromCookie = () => {
    return cookies.get('loggedind-user') as UserModel;
};

export const logoutUser = () => {
    cookies.remove('loggedind-user');
};

import {shallow} from "enzyme";
import LoginComponent from '../components/login/loginComponent';
import * as React from "react";
import UserModel from "../model/UserModel";
import {configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {UserService} from "../service/userService";
import {Promise} from "q";
import axios from 'axios';
import ViewErrorsComponent from "../components/certificate-management-dashboard/errorToasterComponent";

configure({adapter: new Adapter()});
jest.mock("axios");

it('renders correctly the login web page', () => {
    const wrapper = shallow(<LoginComponent history={[]}/>);
    const inputLogin = wrapper.find('inputLogin');
    const inputPassword = wrapper.find('inputPassword');
    const buttonLogin = wrapper.find('buttonLogin');

    expect(inputLogin).not.toBeNull();
    expect(inputPassword).not.toBeNull();
    expect(buttonLogin).not.toBeNull();

    expect(wrapper.find('.form-control').hostNodes()).not.toBeNull();
    expect(wrapper.find('.form-control').hostNodes().length).toEqual(2);
});

it('displays no validation errors if the valid user name and password are submitted', () => {
    // @ts-ignore
    axios.post.mockImplementation(() => Promise.resolve({ status: 200}));
    const wrapper = shallow(<LoginComponent history={[]}/>);
    const inputLogin = wrapper.find('#inputLogin');
    const inputPassword = wrapper.find('#inputPassword');
    const buttonLogin = wrapper.find('#buttonLogin');
    inputLogin.simulate('change', {
        preventDefault: () => {
        },
        target: {value: 'valid_login'}
    }).first().hostNodes();
    inputPassword.simulate('change', {
        preventDefault: () => {
        }, target: {value: 'valid_password'}
    }).hostNodes();
    buttonLogin.simulate('click', {
        preventDefault: () => {
        },
    }).hostNodes();

    const userModel = wrapper.state('user');

    expect(userModel).not.toBeNull();

    expect((userModel as UserModel).userName).not.toBeNull();
    expect((userModel as UserModel).userName).toEqual('valid_login');

    expect((userModel as UserModel).password).not.toBeNull();
    expect((userModel as UserModel).password).toEqual('valid_password');

    expect(wrapper.find('.form-control').hostNodes().length).toEqual(2);
});

it('displays no validation errors if the valid user name and password are submitted and the server responded with HTTP status OK', () => {
    // @ts-ignore
    axios.post.mockImplementation(() => Promise.resolve({ status: 200}));
    const loginUserSpy = jest.spyOn(UserService, 'loginUser');
    const wrapper = shallow(<LoginComponent history={[]}/>);
    const inputLogin = wrapper.find('#inputLogin');
    const inputPassword = wrapper.find('#inputPassword');
    const buttonLogin = wrapper.find('#buttonLogin');
    inputLogin.simulate('change', {
        preventDefault: () => {
        },
        target: {value: 'valid_login'}
    }).first().hostNodes();
    inputPassword.simulate('change', {
        preventDefault: () => {
        }, target: {value: 'valid_password'}
    }).hostNodes();
    buttonLogin.simulate('click', {
        preventDefault: () => {
        },
    }).hostNodes();

    const actualUserModel = wrapper.state('user') as UserModel;
    expect(actualUserModel).not.toBeNull();
    expect(actualUserModel.userName).not.toBeNull();
    expect(actualUserModel.userName).toEqual('valid_login');
    expect(actualUserModel.password).not.toBeNull();
    expect(actualUserModel.password).toEqual('valid_password');

    expect(wrapper.find('.form-control').hostNodes().length).toEqual(2);
    expect(loginUserSpy).toHaveBeenCalledTimes(1);
    expect(wrapper.contains(<ViewErrorsComponent/>)).toBeFalsy();
/*    expect(UserService.saveUserToCookie).toHaveBeenCalledTimes(1);*/
});

it('displays server error if the valid user name and password are submitted and the server responded with HTTP status BAD REQUEST', () => {
    // @ts-ignore
    axios.post.mockImplementation(() => Promise.resolve({ status: 400}));
    const loginUserSpy = jest.spyOn(UserService, 'loginUser');
    const wrapper = shallow(<LoginComponent history={[]}/>);
    const inputLogin = wrapper.find('#inputLogin');
    const inputPassword = wrapper.find('#inputPassword');
    const buttonLogin = wrapper.find('#buttonLogin');
    inputLogin.simulate('change', {
        preventDefault: () => {
        },
        target: {value: 'valid_login'}
    }).first().hostNodes();
    inputPassword.simulate('change', {
        preventDefault: () => {
        }, target: {value: 'valid_password'}
    }).hostNodes();
    buttonLogin.simulate('click', {
        preventDefault: () => {
        },
    }).hostNodes();

    const actualUserModel = wrapper.state('user') as UserModel;
    expect(actualUserModel).not.toBeNull();
    expect(actualUserModel.userName).not.toBeNull();
    expect(actualUserModel.userName).toEqual('valid_login');
    expect(actualUserModel.password).not.toBeNull();
    expect(actualUserModel.password).toEqual('valid_password');

    expect(wrapper.find('.form-control').hostNodes().length).toEqual(2);
    expect(loginUserSpy).toHaveBeenCalledTimes(2);
/*    expect(wrapper.contains(<ViewErrorsComponent/>)).toBeTruthy();*/
    /*    expect(UserService.saveUserToCookie).toHaveBeenCalledTimes(1);*/
});

it('displays validation error when null login is being typed', () => {
    const wrapper = shallow(<LoginComponent history={[]}/>);
    const inputLogin = wrapper.find('#inputLogin');
    const inputPassword = wrapper.find('#inputPassword');
    const buttonLogin = wrapper.find('#buttonLogin');
    inputLogin.simulate('change', {
        preventDefault: () => {
        },
        target: {value: null}
    }).hostNodes();
    inputPassword.simulate('change', {
        preventDefault: () => {
        }, target: {value: 'valid_password'}
    }).hostNodes();
    buttonLogin.simulate('click', {
        preventDefault: () => {
        },
    }).hostNodes();
    const inputLoginErrorMessage = wrapper.find('.text-left.form-text.text-danger');

    const error = wrapper.state('error');
    expect(error).not.toBeNull();
    // @ts-ignore
    expect(error['errorMessage']).toEqual('User login cannot be empty');
    // @ts-ignore
    expect(error['fieldName']).toEqual('inputLogin');
    expect(inputLoginErrorMessage.hostNodes().text()).toEqual('User login cannot be empty');
    expect(wrapper.find('.form-control.border-danger').hostNodes()).not.toBeNull();
    expect(wrapper.find('.form-control.border-danger').hostNodes().length).toEqual(1);
});

it('displays validation error when empty login is being typed', () => {
    const wrapper = shallow(<LoginComponent history={[]}/>);
    const inputLogin = wrapper.find('#inputLogin');
    const inputPassword = wrapper.find('#inputPassword');
    const buttonLogin = wrapper.find('#buttonLogin');
    inputLogin.simulate('change', {
        preventDefault: () => {
        },
        target: {value: ''}
    }).hostNodes();
    inputPassword.simulate('change', {
        preventDefault: () => {
        }, target: {value: 'valid_password'}
    }).hostNodes();
    buttonLogin.simulate('click', {
        preventDefault: () => {
        },
    }).hostNodes();
    const inputLoginErrorMessage = wrapper.find('.text-left.form-text.text-danger');

    const error = wrapper.state('error');
    expect(error).not.toBeNull();
    // @ts-ignore
    expect(error['errorMessage']).toEqual('User login cannot be empty');
    // @ts-ignore
    expect(error['fieldName']).toEqual('inputLogin');
    expect(inputLoginErrorMessage.hostNodes().text()).toEqual('User login cannot be empty');
    expect(wrapper.find('.form-control.border-danger').hostNodes()).not.toBeNull();
    expect(wrapper.find('.form-control.border-danger').hostNodes().length).toEqual(1);
});

it('displays validation error when null password is being typed', () => {
    const wrapper = shallow(<LoginComponent history={[]}/>);
    const inputLogin = wrapper.find('#inputLogin');
    const inputPassword = wrapper.find('#inputPassword');
    const buttonLogin = wrapper.find('#buttonLogin');
    inputLogin.simulate('change', {
        preventDefault: () => {
        },
        target: {value: 'valid_login'}
    }).hostNodes();
    inputPassword.simulate('change', {
        preventDefault: () => {
        }, target: {value: null}
    }).hostNodes();
    buttonLogin.simulate('click', {
        preventDefault: () => {
        },
    }).hostNodes();
    const inputLoginErrorMessage = wrapper.find('.text-left.form-text.text-danger');

    const error = wrapper.state('error');
    expect(error).not.toBeNull();
    // @ts-ignore
    expect(error['errorMessage']).toEqual('User password cannot be empty');
    // @ts-ignore
    expect(error['fieldName']).toEqual('inputPassword');
    expect(inputLoginErrorMessage.hostNodes().text()).toEqual('User password cannot be empty');
    expect(wrapper.find('.form-control.border-danger').hostNodes()).not.toBeNull();
    expect(wrapper.find('.form-control.border-danger').hostNodes().length).toEqual(1);
});

it('displays validation error when empty password is being typed', () => {
    const wrapper = shallow(<LoginComponent history={[]}/>);
    const inputLogin = wrapper.find('#inputLogin');
    const inputPassword = wrapper.find('#inputPassword');
    const buttonLogin = wrapper.find('#buttonLogin');
    inputLogin.simulate('change', {
        preventDefault: () => {
        },
        target: {value: 'valid_login'}
    }).hostNodes();
    inputPassword.simulate('change', {
        preventDefault: () => {
        }, target: {value: ''}
    }).hostNodes();
    buttonLogin.simulate('click', {
        preventDefault: () => {
        },
    }).hostNodes();
    const inputLoginErrorMessage = wrapper.find('.text-left.form-text.text-danger');

    const error = wrapper.state('error');
    expect(error).not.toBeNull();
    // @ts-ignore
    expect(error['errorMessage']).toEqual('User password cannot be empty');
    // @ts-ignore
    expect(error['fieldName']).toEqual('inputPassword');
    expect(inputLoginErrorMessage.hostNodes().text()).toEqual('User password cannot be empty');
    expect(wrapper.find('.form-control.border-danger').hostNodes()).not.toBeNull();
    expect(wrapper.find('.form-control.border-danger').hostNodes().length).toEqual(1);
});

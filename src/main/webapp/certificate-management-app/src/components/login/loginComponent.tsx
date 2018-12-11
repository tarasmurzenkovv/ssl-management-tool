import * as React from "react";
import {ChangeEvent} from "react";
import ViewErrorsComponent from "../certificate-management-dashboard/errorToasterComponent";
import {UserService} from "../../service/userService";
import UserModel from "../../model/UserModel";
import IRouterHistory from "../../model/IRouterHistory";

class ValidationError {
    fieldName: string;
    errorMessage: string;

    constructor(fieldName: string, errorMessage: string) {
        this.fieldName = fieldName;
        this.errorMessage = errorMessage;
    }
}

interface ILoginComponentState {
    user: UserModel,
    error: ValidationError | null
}

class LoginComponent extends React.Component<IRouterHistory, ILoginComponentState> {

    constructor(props: IRouterHistory) {
        super(props);
        this.state = LoginComponent.getInitialState();
    }

    static getInitialState(): ILoginComponentState {
        return {
            user: {
                userName: '',
                password: ''
            },
            error: null
        }
    }

    static validateUserLoginInputFields = (user: UserModel) => {
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

    setLogin = (event: ChangeEvent<HTMLInputElement>) => {
        this.setState({
            user: {
                userName: event.target.value,
                password: this.state.user.password
            }
        });
    };

    setUserPassword = (event: ChangeEvent<HTMLInputElement>) => {
        this.setState({
            user: {
                userName: this.state.user.userName,
                password: event.target.value
            }
        });
    };

    processLogin = (event: any) => {
        event.preventDefault();
        const error = LoginComponent.validateUserLoginInputFields(this.state.user);
        if (error == null) {
            UserService.loginUser(this.state.user)
                .then(() => {
                    UserService.saveUserToCookie(this.state.user);
                    this.props.history.push('/manage-certificate/view-issued');
                })
                .catch((error: any) => this.setState({
                    error: new ValidationError('server-error', error.toString())
                }));

        }
        this.setState({
            error: error
        });
    };

    static getInputTextRedBorderColor(error: ValidationError | null, inputFieldName: string): string {
        return (error == null || error.fieldName != inputFieldName) ? '' : ' border-danger';
    }

    static displayErrorMessage(error: ValidationError | null, inputFieldName: string) {
        if (error == null || error.fieldName != inputFieldName) {
            return null;
        }

        return (
            <small id={inputFieldName}
                   className="text-left form-text text-danger">
                {error.errorMessage}
            </small>
        );
    }

    render() {
        return (
            <div className="text-center">
                <div className="col-lg-5 p-lg-5 form-left-alignment">
                    <form className="col-lg-5">
                        <div className="text-center mb-4">
                            <h1 className="h1 mb-3 font-weight-normal">Log In</h1>
                        </div>

                        <div className="form-label-group mb-3">
                            <input type="text"
                                   id="inputLogin"
                                   className={"form-control " + LoginComponent.getInputTextRedBorderColor(this.state.error, 'inputLogin')}
                                   placeholder="Login"
                                   onChange={this.setLogin}
                                   required
                                   autoFocus/>
                            {LoginComponent.displayErrorMessage(this.state.error, 'inputLogin')}
                        </div>

                        <div className="form-label-group mb-3">
                            <input type="password"
                                   id="inputPassword"
                                   className={"form-control " + LoginComponent.getInputTextRedBorderColor(this.state.error, 'inputPassword')}
                                   placeholder="Password"
                                   onChange={this.setUserPassword}
                                   required/>
                            {LoginComponent.displayErrorMessage(this.state.error, 'inputPassword')}
                        </div>

                        <button
                            id="buttonLogin"
                            className="btn btn-lg btn-primary btn-block"
                            onClick={this.processLogin}
                            type="submit">
                            Log In
                        </button>
                    </form>
                    {(this.state.error != null) &&
                    (this.state.error.fieldName == 'server-error') &&
                    <ViewErrorsComponent error={{'message': this.state.error.errorMessage}}/>}
                </div>
            </div>
        );
    }
}

export default LoginComponent;

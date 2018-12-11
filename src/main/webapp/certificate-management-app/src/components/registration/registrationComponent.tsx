import * as React from "react";
import {ChangeEvent} from "react";
import IRouterHistory from "../../model/IRouterHistory";
import UserModel from "../../model/UserModel";
import {UserService} from "../../service/userService";

class RegistrationComponent extends React.Component<IRouterHistory, UserModel> {

    constructor(props: IRouterHistory) {
        super(props);
        this.state = RegistrationComponent.getInitialState();
    }

    static getInitialState(): UserModel {
        return new UserModel('', '');
    }

    submitRegistrationRequest = (event: any) => {
        event.preventDefault();
        this.state = new UserModel(this.state.userName, '');
        UserService.registerUser(this.state)
            .then((response:any) => console.log('registered user with id ' + response.data))
            .then(() => UserService.saveUserToCookie(this.state))
            .catch((error:any) => console.log('error ' + error));
    };

    readUserName = (event: ChangeEvent<HTMLInputElement>) => {
        console.log(event.target.value);
        this.setState({userName: event.target.value});
    };

    render() {
        return (
            <React.Fragment>
                <div className='col-lg-5 p-lg-5 form-left-alignment'>
                    <form className='col-lg-5'>
                        <div className='text-center mb-4'>
                            <h1 className='h2 mb-3 font-weight-normal'>Submit registration</h1>
                        </div>

                        <div className='form-label-group mb-3'>
                            <label htmlFor='inputEmail'>Email</label>
                            <input type='email'
                                   id='inputEmail'
                                   className='form-control'
                                   placeholder='Email address'
                                   autoFocus/>
                        </div>

                        <div className='form-label-group mb-3'>
                            <label htmlFor='inputUserName'>User name</label>
                            <input type='text'
                                   id='inputUserName'
                                   className='form-control'
                                   placeholder='User name'
                                   value={this.state.userName}
                                   onChange={this.readUserName}
                                   autoFocus/>
                        </div>


                        <button
                            className="btn btn-primary"
                            onClick={event => this.submitRegistrationRequest(event)}>
                            Sign in
                        </button>
                    </form>
                </div>
            </React.Fragment>
        );
    }
}

export default RegistrationComponent;

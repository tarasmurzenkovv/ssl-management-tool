import * as React from "react";
import {saveUserToCookie} from "../../service/userService";
import UserModel from "../../model/UserModel";
import {ChangeEvent} from "react";

interface ILoginComponentState {
    userName: string
}

interface ILoginComponentProps {
    history: string[]
}


class LoginComponent extends React.Component<ILoginComponentProps, ILoginComponentState> {

    constructor(props: ILoginComponentProps) {
        super(props);
        this.state = {
            userName: ''
        };
    }

    setUserName = (event: ChangeEvent<HTMLInputElement>) => {
        const userName = event.target.value;
        this.setState({userName: userName});
    };

    processLogin = () => {
        saveUserToCookie(new UserModel(this.state.userName, ['']));
        console.log(this.state.userName);
        this.props.history.push('/manage-certificate/issue-new')
    };

    render() {
        return (
            <div className="text-center">
                <div className="col-lg-5 p-lg-5 form-left-alignment">
                    <form className="col-lg-5">
                        <div className="text-center mb-4">
                            <h1 className="h1 mb-3 font-weight-normal">Sign in</h1>
                        </div>

                        <div className="form-label-group mb-3">
                            <input type="text"
                                   id="inputEmail"
                                   className="form-control"
                                   placeholder="Email address"
                                   onChange={this.setUserName}
                                   required
                                   autoFocus/>
                        </div>

                        <div className="form-label-group mb-3">
                            <input type="password"
                                   id="inputPassword"
                                   className="form-control"
                                   placeholder="Password"
                                   required/>
                        </div>

                        <button
                            className="btn btn-lg btn-primary btn-block"
                            onClick={this.processLogin}
                            type="submit">
                            Sign in
                        </button>
                    </form>
                </div>
            </div>
        );
    }
}

export default LoginComponent;

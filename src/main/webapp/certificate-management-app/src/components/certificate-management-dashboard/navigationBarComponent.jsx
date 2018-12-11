import React from 'react';
import {NavLink} from "react-router-dom";
import {logoutUser} from "../../service/userService";

class NavigationBarComponent extends React.Component {

    processLogout = () => {
        logoutUser();
    };

    render() {
        return (
            <React.Fragment>
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <div className="navbar-brand">Dashboard</div>
                    <div className="collapse navbar-collapse" id="navbarText">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item">
                                <NavLink to="/manage-certificate/issue-new" className="nav-link">Issue new
                                    certificate</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/manage-certificate/view-issued" className="nav-link">View
                                    certificates</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/"
                                         onClick={this.processLogout}
                                         className="nav-link">Logout</NavLink>
                            </li>
                        </ul>
                        <span className="navbar-text">Hi, {this.props.userName} !</span>
                    </div>
                </nav>
            </React.Fragment>
        );
    }
}

export default NavigationBarComponent;

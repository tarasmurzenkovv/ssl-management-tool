import React from 'react';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import LoginComponent from "../login/loginComponent";
import LandingPageComponent from "../landing/landingPageComponent";
import ErrorComponent from "../error/errorComponent";
import RegistrationComponent from "../registration/registrationComponent";
import CertificateManagementDashboard from "../certificate-management-dashboard/certificateManagementDashboard";

class RoutingComponent extends React.Component {
    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route path="/" component={LandingPageComponent} exact/>
                    <Route path="/login" component={LoginComponent}/>
                    <Route path="/register" component={RegistrationComponent}/>
                    <Route path="/manage-certificate" component={CertificateManagementDashboard}/>
                    <Route component={ErrorComponent}/>
                </Switch>
            </BrowserRouter>
        );
    }
}

export default RoutingComponent;
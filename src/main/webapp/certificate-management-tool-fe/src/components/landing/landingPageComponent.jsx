import React from 'react';
import {NavLink} from "react-router-dom";

class LandingPageComponent extends React.Component {

    render() {
        return (
            <React.Fragment>
                <div className="position-relative overflow-hidden p-3 p-md-5 m-md-3 text-center">
                    <div className="col-md-5 p-lg-5 mx-auto my-5">
                        <h1 className="display-4 font-weight-normal">SSL Provisioning Service</h1>
                        <p className="lead font-weight-normal">
                            SSL certificates are made easier. Powered by <a href="https://letsencrypt.org">Let's
                            Encrypt </a>
                            and <a href="https://shredzone.org/maven/acme4j/index.html">acme4j</a> .
                        </p>
                        <NavLink to="/login" className="btn btn-primary m-3">Login</NavLink>
                        <NavLink to="/register" className="btn btn-outline-secondary">Register</NavLink>
                    </div>
                </div>
            </React.Fragment>

        );
    }
}

export default LandingPageComponent;

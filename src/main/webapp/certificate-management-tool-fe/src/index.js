import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import '/'
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';
import LandingPageComponent from "./components/landing/landingPageComponent";
import { Switch, BrowserRouter as Router, Route } from "react-router-dom";
import LoginComponent from "./components/login/loginComponent";

ReactDOM.render((
    <Router>
        <Switch>
            <Route path='/' component={LandingPageComponent}/>
            <Route path='/login' component={LoginComponent}/>
        </Switch>
    </Router>
), document.getElementById('root'));

serviceWorker.unregister();

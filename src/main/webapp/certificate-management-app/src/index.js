import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import '/'
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';
import Application from "./application";

ReactDOM.render((<Application/>), document.getElementById('root'));

serviceWorker.unregister();

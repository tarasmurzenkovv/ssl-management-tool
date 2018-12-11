import React from 'react';
import NavigationBarComponent from "./navigationBarComponent";
import {Route} from "react-router-dom";
import ViewCertificatesComponent from "./view-certificates-components/viewCertificatesComponents";
import CreateNewCertificateComponent from "./issue-new-certificate-components/createNewCertificateComponent";
import {getUserFromCookie} from "../../service/userService";

class CertificateManagementDashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: ''
        };
    }

    getUserOrRedirect = () => {
        const user = getUserFromCookie();
        if (user == null) {
            this.props.history.push('/login');
        } else {
            this.setState({userName: user.userName})
        }
    };

    componentDidMount() {
        this.getUserOrRedirect();
    }

    render() {
        return (
            <React.Fragment>
                <NavigationBarComponent userName={this.state.userName}/>
                <Route path="/manage-certificate/view-issued" component={ViewCertificatesComponent}/>
                <Route path="/manage-certificate/issue-new" component={CreateNewCertificateComponent}/>
            </React.Fragment>
        );
    }
}

export default CertificateManagementDashboard;

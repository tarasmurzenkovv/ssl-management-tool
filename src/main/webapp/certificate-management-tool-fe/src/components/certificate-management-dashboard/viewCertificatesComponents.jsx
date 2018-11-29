import React from 'react';
import {getUserFromCookie} from "../../service/userService";
import {getAllCertificatesForUserName} from "../../service/certificateService";

class ViewCertificatesComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            errors: null,
            serverIsResponded: false,
            certificates: []
        };
    }

    componentDidMount() {
        this.fetchCertificates();
    }

    fetchCertificates = () => {
        const user = getUserFromCookie();
        getAllCertificatesForUserName(user.userName)
            .then(certificates => {
                this.setState({
                    certificates: certificates,
                    serverIsResponded: true
                })
            })
            .catch(error => {
                this.setState({
                    errors: error,
                    serverIsResponded: true
                })
            })
            .finally(() => {
                return (<div>Hi errors</div>);
            });
    };

    displayTableContent = certificates => {
        return certificates.map((certificate, index) => {
            return (
                <tr>
                    <th>{index}</th>
                    <td>{certificate.principleDomain}</td>
                    <td>{certificate.dateOfIssue}</td>
                    <td>{certificate.dateOfExpiration}</td>
                    <td>{certificate.certificateBody}</td>
                </tr>
            );
        });
    };

    displayCertificates = certificates => {
        return (
            <React.Fragment>
                <table className="table">
                    <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">First</th>
                        <th scope="col">Last</th>
                        <th scope="col">Handle</th>
                        <th scope="col">Handle1</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.displayTableContent(certificates)}
                    </tbody>
                </table>
            </React.Fragment>
        );
    };

    displayErrors = error => {
        return (
            <React.Fragment>
                <div>{error.toString()}</div>
            </React.Fragment>
        );
    };

    display = state => {
        return (state.errors != null) ? this.displayErrors(state.errors) : this.displayCertificates(state.certificates)
    };

    render() {
        return (
            <React.Fragment>
                {this.state.serverIsResponded && this.display(this.state)}
            </React.Fragment>
        );
    }
}

export default ViewCertificatesComponent;
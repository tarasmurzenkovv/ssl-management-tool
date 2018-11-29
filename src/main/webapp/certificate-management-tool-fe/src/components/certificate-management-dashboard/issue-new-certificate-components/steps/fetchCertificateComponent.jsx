import React from 'react';
import {createCertificate} from "../../../../service/certificateService";
import {getUserFromCookie} from "../../../../service/userService";
import MDSpinner from "react-md-spinner";

export default class FetchCertificateComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            certificate: null,
            error: true,
            serverIsResponded: false,
            fetchCertificateButtonWasClicked: false
        };
    }

    fetchCertificate = () => {
        const user = getUserFromCookie();
        this.setState({fetchCertificateButtonWasClicked: true});
        createCertificate(user.userName, this.props.unparsedDomains)
            .then(certificates => {
                console.log('got certificate');
                this.setState({
                    certificate: certificates[0],
                    error: false
                });
                console.log('started rendering');
            })
            .catch(error => {
                console.log('error ' + error);
                this.setState({error: true});
            })
            .finally(() => this.setState({serverIsResponded: true}))
    };

    display = (state) => {
        return (state.error) ? this.displayErrors(state.error) : this.displayCertificate(state.certificate);
    };

    displayErrors = error => {
        return (
            <div>
                {error}
            </div>
        );
    };

    displayCertificate = certificate => {
        return (
            <form>
                <label htmlFor="certificateBody">Certificate Body</label>
                <div className="form-group">
                    <textarea className="form-control"
                              id="certificateBody"
                              value={certificate.certificateBody}
                              disabled
                    />
                    <small id="certificateBody"
                           className="form-text text-muted">
                        Copy generated SSL certificate.
                    </small>
                </div>
            </form>
        );
    };

    render() {
        return (
            <React.Fragment>
                <h5>Step 3: Complete Challenge</h5>
                {this.state.serverIsResponded && this.display(this.state)}
                <button className="btn btn-primary"
                        disabled={this.state.serverIsResponded || this.state.fetchCertificateButtonWasClicked}
                        onClick={this.fetchCertificate}>
                    Fetch Certificate
                </button>
            </React.Fragment>
        );
    }
}
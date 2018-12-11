import React from 'react';
import {getUserFromCookie} from "../../../../service/userService";
import {createCertificate} from "../../../../service/certificateService";

export default class FetchCertificateComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            certificates: [],
            error: true,
            serverIsResponded: false,
            fetchCertificateButtonWasClicked: false,
            buttonText: 'Fetch Certificate'
        };
    }

    fetchCertificate = () => {
        const user = getUserFromCookie();
        this.setState({fetchCertificateButtonWasClicked: true, buttonText: 'Fetching Certificate'});
        createCertificate(user.userName, this.props.unparsedDomains)
            .then(certificates => {
                console.log('got certificate');
                this.setState({
                    certificate: certificates,
                    error: false
                });
                console.log('started rendering');
            })
            .catch(error => {
                console.log('error ' + error);
                this.setState({error: true});
            })
            .finally(() => this.setState({serverIsResponded: true, buttonText: 'Fetched Certificate'}))
    };

    display = (state) => {
        return (state.error) ? this.displayErrors(state.error) : this.displayCertificates(state.certificate);
    };

    displayErrors = error => {
        return (
            <div>
                {error}
            </div>
        );
    };

    displayCertificates = certificates => {
        return (
            <React.Fragment>
                <label htmlFor="certificateBody">Certificates</label>
                {certificates.map(certificate => this.displayCertificate(certificate))}
                <small id="certificateBody"
                       className="form-text text-muted mb-1">
                    Copy generated SSL certificate.
                </small>
            </React.Fragment>
        );
    };

    displayCertificate = certificate => {
        return (
            <React.Fragment>
                <form>
                    <div className="form-group">
                        <textarea className="form-control" id="certificateBody" value={certificate.certificateBody} disabled/>
                    </div>
                </form>
            </React.Fragment>
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
                    {this.state.buttonText}
                </button>
            </React.Fragment>
        );
    }
}
import React from 'react';
import ChallengeCreatedComponent from "./steps/challengeCreatedComponent";
import ChallengeAvailableComponent from "./steps/challengeAvailableComponent";
import FetchCertificateComponent from "./steps/fetchCertificateComponent";
import {getUserFromCookie} from "../../../service/userService";

class CreateNewCertificateComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            unparsedDomains: '',
            userName: 'userName',
            challengeInformation: null,
            error: '',
            certificateBody: '',
            principleDomain: '',
            dateOfIssue: '',
            dateOfExpiration: '',
            isReadyChallenge: false
        };
    }

    storeChallengeInformationInState = challengeInformation => {
        console.log('got from child the following information ' + challengeInformation);
        this.setState({challengeInformation: challengeInformation})
    };

    challengeIsPrepared = () => {
        this.setState({isReadyChallenge: true})
    };

    getUnparsedDomains = unparsedDomains => {
        this.setState({unparsedDomains: unparsedDomains});
    };

    render() {
        if (getUserFromCookie() == null) {
            this.props.history.push('/error')
        }
        return (
            <React.Fragment>
                <div className="container-fluid">
                    <div className="row mt-lg-5">
                        <div className="col">
                            <ChallengeCreatedComponent onUnparsedDomainsAreEntered={this.getUnparsedDomains}
                                                       onChallengeAvailable={this.storeChallengeInformationInState}/>
                        </div>

                        <div className="col">
                            {this.state.challengeInformation &&
                            <ChallengeAvailableComponent onChallengeIsPrepared={this.challengeIsPrepared}
                                                         challengeInformation={this.state.challengeInformation}
                            />}
                        </div>
                        <div className="col">
                            {this.state.isReadyChallenge &&
                            <FetchCertificateComponent unparsedDomains={this.state.unparsedDomains}/>}
                        </div>
                    </div>

                </div>
            </React.Fragment>
        );
    }
}

export default CreateNewCertificateComponent;

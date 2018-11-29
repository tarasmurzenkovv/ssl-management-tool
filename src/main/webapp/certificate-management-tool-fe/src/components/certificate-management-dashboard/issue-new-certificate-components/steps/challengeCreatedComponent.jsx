import React from 'react';
import {submitChallenge} from "../../../../service/certificateService";
import {getUserFromCookie} from "../../../../service/userService";

class ChallengeCreatedComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: '',
            challengeInformation: null
        };
    }

    readDomains = event => {
        const unparsedDomains = event.target.value;
        this.setState({unparsedDomains: unparsedDomains})
    };

    parseDomains = unparsedDomains => {
        if (unparsedDomains.includes(';')) return unparsedDomains.split(';');
        return [].concat(unparsedDomains);
    };

    onChallengeAvailable = () => {
        this.props.onChallengeAvailable(this.state.challengeInformation);
    };

    onUnparsedDomainsAreEntered = () => {
        this.props.onUnparsedDomainsAreEntered(this.state.unparsedDomains);
    };

    submitChallenge = (event) => {
        event.preventDefault();
        const parsedDomains = this.parseDomains(this.state.unparsedDomains);
        const user = getUserFromCookie();
        submitChallenge(user.userName, parsedDomains)
            .then(challenges => {
                this.setState({challengeInformation: challenges[0]});
                this.setState({error: null});
                this.onUnparsedDomainsAreEntered();
                this.onChallengeAvailable();
            })
            .catch(error => {
                console.log('error ' + error);
                this.setState({error: error.toString()})
            });
    };

    render() {
        return (
            <React.Fragment>
                <form>
                    <h5>Step 1: Issue new Challenge</h5>
                    <label htmlFor="domainInput">Domains</label>
                    <div className="form-group">
                        <input type="text"
                               className="form-control"
                               id="domainInput"
                               placeholder="Enter domain(s)"
                               onChange={this.readDomains}
                        />
                        <small id="domainInputHelp"
                               className="form-text text-muted">
                            List of domains, separated by ';'. Asterics for subdomains can be used.
                        </small>
                    </div>
                    <button type="submit"
                            className="btn btn-primary"
                            onClick={this.submitChallenge}>
                        Issue Challenge
                    </button>
                </form>
            </React.Fragment>
        );
    }
}

export default ChallengeCreatedComponent;

import React from 'react';

export default class ChallengeAvailableComponent extends React.Component {

    onChallengeIsPrepared = (event) => {
        event.preventDefault();
        this.props.onChallengeIsPrepared()
    };

    displayChallengeInformation = challengeInformation => {
        if (challengeInformation == null) {
            return null;
        }
        return (
            <div>
                <form>
                    <h5>Step 2: Make Challenge Available</h5>
                    <div className="form-group">
                        <label htmlFor="fileNameInput">File name</label>
                        <input type="text"
                               className="form-control"
                               id="fileNameInput"
                               disabled
                               value={challengeInformation.fileName}
                        />
                        <small id="fileNameInputHelp"
                               className="form-text text-muted">
                            File name that must be publicly available
                        </small>
                    </div>

                    <div className="form-group">
                        <label htmlFor="fileUrl">The File URL</label>
                        <input type="text"
                               className="form-control"
                               id="fileUrlInput"
                               disabled
                               value={challengeInformation.host}
                        />
                        <small id="fileUrlInputHelp"
                               className="form-text text-muted">
                            The URL of the publicly available file
                        </small>
                    </div>

                    <div className="form-group">
                        <label htmlFor="fileContentInput">File content</label>
                        <input type="text"
                               className="form-control"
                               id="fileContentInput"
                               disabled
                               value={challengeInformation.content}
                        />
                        <small id="fileContentInputHelp"
                               className="form-text text-muted">
                            The content of the publicly available file
                        </small>
                    </div>
                    <button className="btn btn-primary"
                            onClick={this.onChallengeIsPrepared}>
                        Challenge Is Available
                    </button>
                </form>
            </div>
        );
    };

    render() {
        return (
            <React.Fragment>
                {this.displayChallengeInformation(this.props.challengeInformation)}
            </React.Fragment>
        );
    }
}
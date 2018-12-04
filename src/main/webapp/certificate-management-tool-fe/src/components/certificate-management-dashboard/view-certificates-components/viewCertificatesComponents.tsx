import React from 'react';
import {getUserFromCookie} from "../../../service/userService";
import {getAllCertificatesForUserName} from "../../../service/certificateService";
import {sortCertificatesByKey} from "../../../service/sortingUtilities";
import splitArrayInPages from "../../../service/paginationService";
import 'react-toastify/dist/ReactToastify.css';
import ViewCertificatesState from "../../../model/ViewCertificatesState";
import CertificateModel from "../../../model/CertificateModel";
import TableRowComponent from "./tableRowComponent";
import ViewErrorsComponent from "../errorComponent";

class ViewCertificatesComponent extends React.Component<{}, ViewCertificatesState> {
    constructor({}) {
        super({});
        this.state = ViewCertificatesComponent.initState();
    }

    static initState(): ViewCertificatesState {
        return new ViewCertificatesState('', false, false, [],
            0, 4, [], false, true);
    };

    componentDidMount() {
        this.fetchCertificates();
    }

    fetchCertificates = () => {
        const user = getUserFromCookie();
        getAllCertificatesForUserName(user.userName)
            .then(certificates => {
                this.setState({
                        certificates: certificates,
                        paginatedCertificate: splitArrayInPages(certificates, this.state.numberPerPage),
                        serverIsResponded: true
                    }
                )
            })
            .catch(error => {
                this.setState({
                    error: error,
                    serverIsResponded: true
                })
            });
    };

    sortCertificates = (sortingBy: CallableFunction) => {
        this.setState((previousState: ViewCertificatesState) => {
            const currentPage = previousState.currentPage;
            return ({
                certificates: sortCertificatesByKey(previousState.paginatedCertificate[currentPage], sortingBy, previousState.wasSorted),
                wasSorted: !previousState.wasSorted
            })
        })
    };

    displayTableHeading = () => {
        return (
            <thead>
            <tr>
                <th scope="col">
                    <button type="button" className="btn btn-link text-left font-weight-bold">
                        #
                    </button>
                </th>
                <th scope="col">
                    <button type="button"
                            className="btn btn-link text-left font-weight-bold"
                            onClick={() => this.sortCertificates((cert: CertificateModel) => cert.principleDomain)}>
                        Domains
                    </button>
                </th>
                <th scope="col">
                    <button type="button"
                            className="btn btn-link text-left font-weight-bold"
                            onClick={() => this.sortCertificates((cert: CertificateModel) => cert.dateOfIssue)}>
                        Date of Issue
                    </button>
                </th>
                <th scope="col">
                    <button type="button"
                            className="btn btn-link text-left font-weight-bold"
                            onClick={() => this.sortCertificates((cert: CertificateModel) => cert.dateOfExpiration)}>
                        Expiration Date
                    </button>
                </th>
                <th scope="col">
                    <button type="button"
                            className="btn btn-link text-left font-weight-bold">
                        Certificate Body
                    </button>
                </th>
            </tr>
            </thead>
        );
    };

    incrementCurrentPage = () => {
        this.setState((previousState: ViewCertificatesState) => {
            return {
                currentPage: (previousState.currentPage === previousState.paginatedCertificate.length - 1)
                    ? (previousState.paginatedCertificate.length - 1) : previousState.currentPage + 1,
                incrementButtonIsDisabled: ((previousState.currentPage) === previousState.paginatedCertificate.length - 1),
                decrementButtonIsDisabled: (previousState.incrementButtonIsDisabled)
            }
        });
    };

    decrementCurrentPage = () => {
        this.setState((previousState) => {
            return {
                currentPage: (previousState.currentPage === 0) ? 0 : previousState.currentPage - 1,
                decrementButtonIsDisabled: (previousState.currentPage === 0),
                incrementButtonIsDisabled: (previousState.decrementButtonIsDisabled)
            }
        })
    };

    displayCertificateTable = (certificates: Array<CertificateModel>) => {
        return (
            <React.Fragment>
                <table className="table">
                    {this.displayTableHeading()}
                    <TableRowComponent certificates={certificates}/>
                </table>
            </React.Fragment>
        );
    };

    displayNavigationButtons = () => {
        return (
            <div className="col-md">
                <nav aria-label="Page navigation example">
                    <ul className="pagination justify-content-center">
                        <button type="button"
                                className="btn btn-link text-left font-weight-bold"
                                disabled={this.state.decrementButtonIsDisabled}
                                onClick={() => this.decrementCurrentPage()}>
                            Previous
                        </button>
                        <button type="button"
                                className="btn btn-link text-left font-weight-bold"
                                disabled={this.state.incrementButtonIsDisabled}
                                onClick={() => this.incrementCurrentPage()}>
                            Next
                        </button>
                        {/*TODO: Fix me */}
                        <div className="mt-2">({this.state.currentPage + 1} out
                            of {this.state.paginatedCertificate.length})
                        </div>
                    </ul>
                </nav>
            </div>
        )
    };

    display = () => {
        const paginatedCertificates = this.state.paginatedCertificate[this.state.currentPage];
        return this.displayCertificateTable(paginatedCertificates)
    };

    renderFullUi = () => {
        return (
            <React.Fragment>
                {this.state.serverIsResponded && !this.state.error && this.display()}
                {this.state.serverIsResponded && !this.state.error && this.displayNavigationButtons()}
            </React.Fragment>
        );
    };

    render() {
        return (
            <React.Fragment>
                <div className="container-fluid">
                    <div className="row mt-lg-5">
                        {this.renderFullUi()}
                        <ViewErrorsComponent errors = {this.state.error}/>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default ViewCertificatesComponent;
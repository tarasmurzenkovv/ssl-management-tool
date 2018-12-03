import React from 'react';
import {getUserFromCookie} from "../../service/userService";
import {getAllCertificatesForUserName} from "../../service/certificateService";
import {sortCertificatesByKey} from "../../service/sortingUtilities";
import splitArrayInPages from "../../service/paginationService";
import moment from "moment";
import {toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

class ViewCertificatesComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            errors: null,
            serverIsResponded: false,
            wasSorted: false,
            certificates: [],
            currentPage: 0,
            numberPerPage: 4,
            paginatedCertificates: [],
            incrementButtonIsDisabled: false,
            decrementButtonIsDisabled: true
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
                    paginatedCertificates: splitArrayInPages(certificates, this.state.numberPerPage),
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

    applyColorToRow = (certificate) => {
        const expirationDate = moment(certificate.dateOfExpiration);
        console.log('expiration date is ', expirationDate);
        const currentDate = moment();
        const numberOfDays = expirationDate.diff(currentDate, 'days');
        console.log('number of days ' + numberOfDays);
        if (numberOfDays < 2) {
            return 'table-danger'
        } else if ((numberOfDays >= 2) && (numberOfDays <= 4)) {
            return 'table-warning'
        } else {
            return null;
        }
    };

    displayTableContent = certificates => {
        return (
            <tbody>
            {
                certificates.map((certificate, index) => {
                    return (
                        <tr className={this.applyColorToRow(certificate)} key={index}>
                            <th>{index}</th>
                            <td>{certificate.principleDomain}</td>
                            <td>{certificate.dateOfIssue}</td>
                            <td>{certificate.dateOfExpiration}</td>
                            <td>{certificate.certificateBody}</td>
                        </tr>
                    );
                })
            }
            </tbody>
        );
    };

    sortCertificates = (sortingBy) => {
        this.setState((previousState) => {
            const currentPage = previousState.currentPage;
            return ({
                certificates: sortCertificatesByKey(previousState.paginatedCertificates[currentPage], sortingBy, previousState.wasSorted),
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
                            onClick={() => this.sortCertificates(cert => cert.principleDomain)}>
                        Domains
                    </button>
                </th>
                <th scope="col">
                    <button type="button"
                            className="btn btn-link text-left font-weight-bold"
                            onClick={() => this.sortCertificates(cert => cert.dateOfIssue)}>
                        Date of Issue
                    </button>
                </th>
                <th scope="col">
                    <button type="button"
                            className="btn btn-link text-left font-weight-bold"
                            onClick={() => this.sortCertificates(cert => cert.dateOfExpiration)}>
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
        this.setState((previousState) => {
            return {
                currentPage: (previousState.currentPage === previousState.paginatedCertificates.length - 1)
                    ? (previousState.paginatedCertificates.length - 1) : previousState.currentPage + 1,
                incrementButtonIsDisabled: ((previousState.currentPage) === previousState.paginatedCertificates.length - 1),
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

    displayCertificateTable = certificates => {
        return (
            <React.Fragment>
                <table className="table">
                    {this.displayTableHeading()}
                    {this.displayTableContent(certificates)}
                </table>
            </React.Fragment>
        );
    };

    notify = (errors) => toast.error("" + errors, {
        type: toast.TYPE.ERROR,
        autoClose: 8000
    });


    displayNavigationButtons = () => {
        return (
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
                    <div className="mt-2">({this.state.currentPage + 1 } out of {this.state.paginatedCertificates.length})</div>
                </ul>
            </nav>
        )
    };

    display = () => {
        const paginatedCertificates = this.state.paginatedCertificates[this.state.currentPage];
        return this.displayCertificateTable(paginatedCertificates)
    };

    displayButtons = () => {
        return (
            <React.Fragment>
                <div className="col-md">
                    {this.displayNavigationButtons()}
                </div>
            </React.Fragment>
        );
    };

    renderFullUi = () => {
        return (
            <React.Fragment>
                {this.state.serverIsResponded && !this.state.errors && this.display()}
                {this.state.serverIsResponded && !this.state.errors && this.displayButtons()}
            </React.Fragment>
        );
    };

    render() {
        return (
            <React.Fragment>
                <div className="container-fluid">
                    <div className="row mt-lg-5">
                        {this.renderFullUi()}
                        {this.state.errors && this.notify(this.state.errors)}
                        <ToastContainer/>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default ViewCertificatesComponent;
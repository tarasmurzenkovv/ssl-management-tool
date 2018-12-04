import CertificateModel from "../../../model/CertificateModel";
import {NavLink} from 'react-router-dom'
import React from "react";
import moment from "moment";

interface TableRowComponentProps {
    certificates: CertificateModel[]
}

export default class TableRowComponent extends React.Component<TableRowComponentProps> {

    constructor(certificates: TableRowComponentProps) {
        super(certificates);
    }

    displayTableContent = (certificates: Array<CertificateModel>) => {
        return (
            <tbody>
            {
                certificates.map((certificate, index) => {
                    const linkPath = '/certificate/' + certificate.certificateId;
                    console.log(certificate.certificateBody);
                    return (
                        <tr className={this.applyColorToRow(certificate)} key={index}>
                            <th>{index}</th>
                            <td>{certificate.principleDomain}</td>
                            <td>{certificate.dateOfIssue}</td>
                            <td>{certificate.dateOfExpiration}</td>
                            <td>
                                <NavLink to={linkPath} className="nav-link">
                                    View Details
                                </NavLink>
                            </td>
                        </tr>
                    );
                })
            }
            </tbody>
        );
    };

    applyColorToRow = (certificate: CertificateModel) => {
        const expirationDate = moment(certificate.dateOfExpiration);
        const currentDate = moment();
        const numberOfDays = expirationDate.diff(currentDate, 'days');
        console.log('number of days ' + numberOfDays);
        if (numberOfDays < 2) {
            return 'table-danger'
        } else if ((numberOfDays >= 2) && (numberOfDays <= 4)) {
            return 'table-warning'
        } else {
            return '';
        }
    };

    render() {
        return (
            <React.Fragment>
                {this.displayTableContent(this.props.certificates)}
            </React.Fragment>
        );
    }
}


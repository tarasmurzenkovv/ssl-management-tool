import React from "react";
import CertificateModel from "../../../../model/CertificateModel";
import formatDate from "../../../../service/dateTimeService";
import {NavLink} from "react-router-dom";
import ModalComponent from "../../../modal-component/modalComponent";

interface IViewCertificateComponentProps {
    certificate: CertificateModel,
    actionForDeleteButton: Function,
    actionForRenewButton: Function
}

export default class ViewCertificateComponent extends React.Component<IViewCertificateComponentProps, any> {

    constructor(props: any) {
        super(props);
        this.state = {
            modalIsOpen: false
        }
    }

    renewCertificate = () => this.props.actionForRenewButton();

    openModal = () => this.setState({modalIsOpen: true});

    closeModal = () => this.setState({modalIsOpen: false});

    deleteCertificate = () => this.props.actionForDeleteButton();

    renderActionButtons() {
        return <div className="row">
            <div className="col">
                <NavLink to={'/manage-certificate/view-issued'} className="btn btn-primary">
                    Back
                </NavLink>
            </div>
            <div className="col">
                <button className="btn btn-warning" onClick={() => this.renewCertificate()}>Renew</button>
            </div>
            <div className="col">
                <button className="btn btn-danger" onClick={() => this.openModal()}>Delete</button>
            </div>
        </div>;
    }


    render() {
        return (
            <React.Fragment>
                <div className="container-fluid">
                    <div className="row mt-lg-5">
                        <div className="col-lg-5">
                            <h5> Certificate Details</h5>
                            <p>Expiration Date: {formatDate(this.props.certificate.dateOfExpiration)}</p>
                            <p>Domains: {this.props.certificate.principleDomain}</p>
                            <form>
                                <p>Certificate Body</p>
                                <div className="form-group">
                                <textarea className="form-control"
                                          id="certificateBody"
                                          value={this.props.certificate.certificateBody}
                                          disabled/>
                                </div>
                            </form>
                            {this.renderActionButtons()}
                        </div>
                    </div>
                </div>
                <ModalComponent isOpenModel={this.state.modalIsOpen}
                                onDeleteAction={() => this.deleteCertificate()}
                                onCloseAction={() => this.closeModal()}
                />
            </React.Fragment>
        );
    }
}
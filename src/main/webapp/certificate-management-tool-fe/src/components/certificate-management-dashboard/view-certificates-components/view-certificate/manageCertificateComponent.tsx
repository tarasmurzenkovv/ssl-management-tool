import React from "react";
import CertificateModel from "../../../../model/CertificateModel";
import {getUserFromCookie} from "../../../../service/userService";
import {deleteCertificate, getCertificate} from "../../../../service/certificateService";
import ViewCertificateComponent from "./viewCertificateComponent";
import ViewErrorsComponent from "../../errorToasterComponent";
import UserModel from "../../../../model/UserModel";
import CertificateManagementDashboard from "../../certificateManagementDashboard";

interface IViewCertificateComponentState {
    passedCertificateId: number,
    user: UserModel,
    certificate: CertificateModel,
    error: String | null
}

export default class ManageCertificateComponent extends React.Component<any, IViewCertificateComponentState> {

    static initState(certificateIdFromProps: number): IViewCertificateComponentState {
        return {
            certificate: CertificateModel.defaultValue(),
            user: getUserFromCookie(),
            passedCertificateId: certificateIdFromProps,
            error: null
        }
    }

    constructor(props: any) {
        super(props);
        this.state = ManageCertificateComponent.initState(this.props.match.params.certificateId);
    }

    componentDidMount(): void {
        this.getCertificateInformation();
    }

    getCertificateInformation() {
        getCertificate(this.state.user.userName, this.state.passedCertificateId)
            .then(certificate => this.setState({
                certificate: certificate
            }))
            .catch(error => {
                this.setState({error: error})
            });
    }

    deleteCertificate() {
        deleteCertificate(this.state.user.userName, this.state.passedCertificateId)
            .then(
                (result: any) => {
                    this.props.history.push('/manage-certificate/view-issued');
                },
                (error: any) => {
                    this.setState({error: error})
                })
    }

    renderToaster = (error: any) => {
        return (
            <ViewErrorsComponent error={error}/>
        );
    };

    render() {
        return (
            <React.Fragment>
                <CertificateManagementDashboard/>
                <ViewCertificateComponent certificate={this.state.certificate}
                                          actionForDeleteButton={() => this.deleteCertificate()}
                                          actionForRenewButton={() => console.log('blah')}
                />
                {this.state.error && this.renderToaster(this.state.error)}
            </React.Fragment>
        );
    }
}
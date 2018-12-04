import React from "react";
import {getCertificate} from "../../../service/certificateService";
import {getUserFromCookie} from "../../../service/userService";
import CertificateModel from "../../../model/CertificateModel";

interface IViewCertificateComponentState {
    certificate: CertificateModel | null,
    error: String | ''
}

export default class ViewCertificateComponent extends React.Component<any, IViewCertificateComponentState> {

    static initState(): IViewCertificateComponentState {
        return {
            certificate: null,
            error: ''
        }
    }

    constructor(props: any) {
        super(props);
        this.state = ViewCertificateComponent.initState();
    }

    componentDidMount(): void {
        const user = getUserFromCookie();
        const certificateId = this.props.match.params.certificateId;
        getCertificate(user.userName, certificateId)
            .then(certificate => this.setState({
                certificate: certificate
            }))
            .catch(error => {
                this.setState({error: error})
            });
    }

    render() {
        console.log('got from props: ' + this.props);
        return (
            <div>Hi there {this.props.match.params.certificateId}</div>
        );
    }
}
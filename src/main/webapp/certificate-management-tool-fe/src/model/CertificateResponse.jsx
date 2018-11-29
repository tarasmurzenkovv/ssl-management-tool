export default class CertificateResponse {
    constructor(certificateBody, principleDomain, dateOfIssue, dateOfExpiration) {
        this.certificateBody = certificateBody;
        this.principleDomain = principleDomain;
        this.dateOfIssue = dateOfIssue;
        this.dateOfExpiration = dateOfExpiration;
    }
}
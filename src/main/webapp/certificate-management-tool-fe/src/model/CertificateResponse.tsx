export default class CertificateResponse {
    private certificateBody: string;
    private principleDomain: string;
    private dateOfIssue: Date;
    private dateOfExpiration: Date;
    constructor(certificateBody: string, principleDomain: string, dateOfIssue: Date, dateOfExpiration: Date) {
        this.certificateBody = certificateBody;
        this.principleDomain = principleDomain;
        this.dateOfIssue = dateOfIssue;
        this.dateOfExpiration = dateOfExpiration;
    }
}
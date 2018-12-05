export default class CertificateModel {
    certificateId: number;
    certificateBody: string;
    principleDomain: string;
    dateOfIssue: Date;
    dateOfExpiration: Date;

    static defaultValue(): CertificateModel {
        return new CertificateModel(0, '', '', new Date(), new Date());
    }

    constructor(certificateId: number,
                certificateBody: string,
                principleDomain: string,
                dateOfIssue: Date,
                dateOfExpiration: Date) {
        this.certificateId = certificateId;
        this.certificateBody = certificateBody;
        this.principleDomain = principleDomain;
        this.dateOfIssue = dateOfIssue;
        this.dateOfExpiration = dateOfExpiration;
    }
}
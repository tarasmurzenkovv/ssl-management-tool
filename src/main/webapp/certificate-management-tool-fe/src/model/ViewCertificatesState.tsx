import CertificateModel from "./CertificateModel";

export default class ViewCertificatesState {
    error: string;
    serverIsResponded: boolean;
    wasSorted: boolean;
    certificates: Array<CertificateModel>;
    currentPage: number;
    numberPerPage: number;
    paginatedCertificate: Array<Array<CertificateModel>>;
    incrementButtonIsDisabled: boolean;
    decrementButtonIsDisabled: boolean;

    constructor(
        error: string,
        serverIsResponded: boolean,
        wasSorted: boolean,
        certificates: Array<CertificateModel>,
        currentPage: number,
        numberPerPage: number,
        paginatedCertificate: Array<Array<CertificateModel>>,
        incrementButtonIsDisabled: boolean,
        decrementButtonIsDisabled: boolean) {
        this.error = error;
        this.serverIsResponded = serverIsResponded;
        this.wasSorted = wasSorted;
        this.certificates = certificates;
        this.currentPage = currentPage;
        this.numberPerPage = numberPerPage;
        this.paginatedCertificate = paginatedCertificate;
        this.incrementButtonIsDisabled = incrementButtonIsDisabled;
        this.decrementButtonIsDisabled = decrementButtonIsDisabled;

    }
}
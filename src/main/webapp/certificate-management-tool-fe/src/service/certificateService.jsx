import axios from "axios";
import ChallengeRequest from "../model/ChallengeRequest";
import ChallengeResponse from "../model/ChallengeResponse";
import CertificateResponse from "../model/CertificateResponse";

const host = 'http://localhost:8080/';

export const mapResponseDataToArray = response => {
    response.data
        .map(element => new CertificateResponse(
            element.certificateBody,
            element.principleDomain,
            element.dateOfIssue,
            element.dateOfExpiration
            )
        )
};

export const submitChallenge = (userName, parsedDomains) => {
    const challengeRequest = new ChallengeRequest(userName, parsedDomains);
    return axios.post(host + 'challenge', challengeRequest)
        .then(response => {
            return response.data.map(element => new ChallengeResponse(element.content, element.fileName, element.host))
        })
};

export const createCertificate = (userName, unparsedDomains) => {
    const url = host + 'certificate?userName=' + userName + '&domains=' + unparsedDomains;
    return axios.post(url).then(response => this.mapResponseDataToArray(response))
};

export const getAllCertificatesForUserNameAndDomains = (userName, unparsedDomains) => {
    const url = host + 'certificate?userName=' + userName + '&domains=' + unparsedDomains;
    return axios.get(url).then(response => this.mapResponseDataToArray(response));
};

export const getAllCertificatesForUserName = (userName) => {
    const url = host + 'certificate?userName=' + userName;
    return axios.get(url)
        .then(response => response.data
            .map(element => new CertificateResponse(
                element.certificateBody,
                element.principleDomain,
                element.dateOfIssue,
                element.dateOfExpiration
            )));
};
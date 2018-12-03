import axios from "axios";
import ChallengeRequest from "../model/ChallengeRequest";
import ChallengeResponse from "../model/ChallengeResponse";
import CertificateResponse from "../model/CertificateResponse";

const host = 'http://localhost:8080/';

function mapResponseDataToArray(response) {
    return response.data
        .map(element => new CertificateResponse(
            element.certificateBody,
            element.principleDomain,
            element.dateOfIssue,
            element.dateOfExpiration
            )
        )
}

export function submitChallenge (userName, parsedDomains) {
    const challengeRequest = new ChallengeRequest(userName, parsedDomains);
    return axios.post(host + 'challenge', challengeRequest)
        .then(response => {
            return response.data.map(element => new ChallengeResponse(element.content, element.fileName, element.host))
        })
}

export function createCertificate (userName, unparsedDomains) {
    const url = host + 'certificate?userName=' + userName + '&domains=' + unparsedDomains;
    return axios.post(url).then(response => mapResponseDataToArray(response))
};

export function getAllCertificatesForUserNameAndDomains(userName, unparsedDomains) {
    const url = host + 'certificate?userName=' + userName + '&domains=' + unparsedDomains;
    return axios.get(url).then(response => mapResponseDataToArray(response));
};

export function getAllCertificatesForUserName(userName) {
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
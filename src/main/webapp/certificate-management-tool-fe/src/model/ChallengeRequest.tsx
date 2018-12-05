export default class ChallengeRequest {
    userName: string;
    domains: string[];

    constructor(userName: string, domains: string[]) {
        this.userName = userName;
        this.domains = domains;
    }
}
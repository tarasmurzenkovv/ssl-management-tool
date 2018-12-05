export default class ChallengeResponse {
    content: string;
    fileName: string;
    host: string;

    constructor(content: string, fileName: string, host: string) {
        this.content = content;
        this.fileName = fileName;
        this.host = host;
    }
}
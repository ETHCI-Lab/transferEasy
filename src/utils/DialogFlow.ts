import dialogflow from '@google-cloud/dialogflow';

export class DilogFlow {
    private CREDENTIALS: any;
    private PROJECID: String;
    private CONFIGURATION: { credentials: { private_key: any; client_email: any; }; };
    private sessionClient: any;

    constructor(){
        this.CREDENTIALS = {"type": "service_account","project_id": "chatbot-unclelin-rhrc","private_key_id": "023a14a7ed35198d32dfa7b074db4c985732ea25","private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQCz9SFcs4Xlv3uU\n6WUyehslOXvQZsKr7heOMJv/wbardch1C/AZeHXjQGsC/csh/81eCmCEvZsivFIq\nqoKQGBL+ydqUjraRKgLCz6LxUwwLnrMhqUmEuwUHS39MPhJvqI75fytOtj1nyoYx\nWzPJT4ygobpVC0EI4UXXqHMVOoIDupVZRCKjN2GIdaaVCIAdSJCyOknrgwmOVfic\nWeFIwgS6PnA0uiGK4cMspDsBRBJaLVvah64jZCr/KQ2wW/V+yiDAWa9GKjw8zBmP\nILTgi9bS4udf/W1SuClj0u0Jg1Scb4pHdJSC++NVUK/eTi4bLxWz8qrj8QnsrV2E\n6ITtQz1LAgMBAAECggEAJ0604dXIun1P1iAA3by0LzZWKBg6D2nrNUDC4mOCrgMF\nLSPVZwrb3S6V8UpUU3HXfuIPYQ81UqoF3JHwAN9xTrvyhZ6CnESr47eM5N958xPQ\nFtsuVtKu73/7J0Err74GtNKlOAUwdnpTQ3ajYiaBFhkdZTQXGYRzR/7gXFOyUHPT\n9O8+ybUNOZXrnXtvyRxFyeWXMcnkDPpJUYQ6cMmRCaget8GN0ma/XxmMEp/7RyoU\nKjchh4JkBlRp0EQ2vUf6c+3oOeHtVb5WkxtxuD7R1z8jTOtKmWKr4E/yl+Z8ad4Z\n5B9U8Keg1xxXwzwYAVzyLHsK9fKk4ufC5Phc3BaSSQKBgQDks3KyEItN/eI6qS9m\netu493tj5UDKZ/4QaOcGRkniYBiwtcDb5yU298CTQmsxp0TdHfbGBh5DEkdk2biu\nTb58KS8nq93Bo/33NhmOfTdB36qGUmypkzBU4ve9PUz9CQztovKCJjFoDURIFzYw\npbbaiSQrUvRPovrDTyNscH3cnwKBgQDJcDNEPbGDmtRH5aRABS0JaAdJ5WfSi+6/\naaAZ4x6hlo33JrJasGfWnzUKDBED6JZsKx2U5EfBmzfj8tbfFXTfjbMMX1Wqwzr3\na3ce4e9Ok/TAnttmgp122T0irI6uH/BlM0RNMup3TFG9yUcuDr+lx7F7z58qPuJx\nozYagAkz1QKBgQC0XanpMQ8MVVxj8yZE5kP/Xn7by+QLPXSrsG/zDOAcPrl6M/2D\n8InzDfW8rbcok8jFsmn6xrx7HSFdMjBqlznRZhGgcfUUUKdsnigNrkc0FpfAE6VL\nH6AQcmf7wSrErKybhdVIO6LfcwcU6+l6+FZ7h4kU+flgDSNDgVhon1dD9QKBgQC4\nGx4gDqrBd67xD0exY4moATY4Kb1cR5yrwWQchOIoGawi6XE1RemB1Pzq8+BRTDC/\nKCDfRkz2/GB2rCoKtledQqsUccWgTtMD82pqBWFs1flqW0Z3SIWWbDJeEIxPRM24\nEMUqMZDt/AjxhpbR15T9dagXWslEGTlpVxxJ2B+RCQKBgQCajUILIkbrGnjZ4HNC\nfDqQzaAnvztir6s9cHrk9ms5ocNp2PXjr0LerfAqH3hzOtLTIASLp8f0UK4dSrkz\ndaJe6OsypD/VoBScp6KIjzooiKaQBSVukMTwXRTXyINQKd0sJbs1gkxfeh10e/1C\n8IXpz1P/YbdXorGiyM/1iUlfhw==\n-----END PRIVATE KEY-----\n","client_email": "py-uncle@chatbot-unclelin-rhrc.iam.gserviceaccount.com","client_id": "103301140140250963432","auth_uri": "https://accounts.google.com/o/oauth2/auth","token_uri": "https://oauth2.googleapis.com/token","auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs","client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/py-uncle%40chatbot-unclelin-rhrc.iam.gserviceaccount.com"}
        this.PROJECID = this.CREDENTIALS.project_id
        this.CONFIGURATION = {
            credentials: {
                private_key: this.CREDENTIALS['private_key'],
                client_email: this.CREDENTIALS['client_email']
            }
        }
        this.sessionClient = new dialogflow.SessionsClient(this.CONFIGURATION);
    }

    detectIntent = async (queryText:string, sessionId:string) => {

        let sessionPath = this.sessionClient.projectAgentSessionPath(this.PROJECID, sessionId);
    
        let request = {
            session: sessionPath,
            queryInput: {
                text: {
                    text: queryText,
                    languageCode: "zh-CN",
                },
            },
        };
    
        const responses = await this.sessionClient.detectIntent(request);
        return {
            response: responses
        };
    }

    detectIntentAudio = async (audio:Buffer, sessionId:string) => {

        let sessionPath = this.sessionClient.projectAgentSessionPath(this.PROJECID, sessionId);
    
        // The text query request.
        const request = {
            session: sessionPath,
            queryInput: {
              audioConfig: {
                audioEncoding: 'AUDIO_ENCODING_LINEAR_16',
                languageCode: "zh-CN",
              },
            },
            inputAudio: audio,
          };
    
        const responses = await this.sessionClient.detectIntent(request);
    
        return {
            response: responses
        };
    }
}
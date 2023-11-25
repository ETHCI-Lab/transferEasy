import { Contorller } from "../interfaces/Contorller";
import { Request, Response } from "express";
import { logger } from "../middlewares/log";
import { AzureKeyCredential, DocumentAnalysisClient } from "@azure/ai-form-recognizer";
import { createReadStream } from "fs";

export class documentController extends Contorller {
    public test(Request: Request, Response: Response) {
        Response.send("test")
    }
    public async documentPaser(Request: Request, Response: Response) {
        const endpoint = "https://eastus.api.cognitive.microsoft.com/";
        const apiKey = "fb96cd07be8143cf87b370dac6aa71b2";
        const path = "be8c33cbf8a4d282.pdf";

        const readStream = createReadStream(path);
        const client = new DocumentAnalysisClient(endpoint, new AzureKeyCredential(apiKey));
        const poller = await client.beginAnalyzeDocument("prebuilt-read", readStream, {
            onProgress: ({ status }) => {
                console.log(`status: ${status}`);
            },
        });

        const { content, pages, languages, styles } = await poller.pollUntilDone();

        Response.send({
            content, pages, languages, styles
        })
    }
}
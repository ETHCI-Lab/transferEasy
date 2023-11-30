import { Contorller } from "../interfaces/Contorller";
import { Request, Response } from "express";
import { logger } from "../middlewares/log";
import { AzureKeyCredential, DocumentAnalysisClient } from "@azure/ai-form-recognizer";
import fs from 'fs';
import path from "path";

export class documentController extends Contorller {
    public test(Request: Request, Response: Response) {
        Response.send("test")
    }
    // public async documentPaser(Request: Request, Response: Response) {
    //     const endpoint = "https://eastus.api.cognitive.microsoft.com/";
    //     const apiKey = "fb96cd07be8143cf87b370dac6aa71b2";
    //     const path = "佛光大學.pdf";

    //     const readStream = createReadStream(path);
    //     const client = new DocumentAnalysisClient(endpoint, new AzureKeyCredential(apiKey));
    //     const poller = await client.beginAnalyzeDocument("prebuilt-layout", readStream);

    //     const {
    //         pages,
    //         tables
    //     } = await poller.pollUntilDone();


    //     if (pages && tables) {
    //         if (pages.length <= 0) {
    //             console.log("No pages were extracted from the document.");
    //         } else {
    //             console.log("Pages:");
    //             for (const page of pages) {
    //                 console.log("- Page", page.pageNumber, `(unit: ${page.unit})`);
    //                 console.log(`  ${page.width}x${page.height}, angle: ${page.angle}`);
    //                 console.log(`  ${page.lines?.length} lines, ${page.words?.length} words`);
    //             }
    //         }

    //         if (tables.length <= 0) {
    //             console.log("No tables were extracted from the document.");
    //         } else {
    //             console.log("Tables:");
    //             for (const table of tables) {
    //                 console.log(
    //                     `- Extracted table: ${table.columnCount} columns, ${table.rowCount} rows (${table.cells.length} cells)`
    //                 );
    //             }
    //         }
    //     }

    //     Response.send({
    //         tables
    //     })
    // }

    public async documentPaser(Request: Request, Response: Response) {
        const endpoint = "https://eastus.api.cognitive.microsoft.com/";
        const apiKey = "fb96cd07be8143cf87b370dac6aa71b2";

        if (Request.file) {
            const filePath = path.join('/pdf',Request.file.originalname,Request.file.originalname);
            if (fs.existsSync(filePath)) {
                const readStream = fs.createReadStream(filePath);
                const client = new DocumentAnalysisClient(endpoint, new AzureKeyCredential(apiKey));
                const poller = await client.beginAnalyzeDocument("prebuilt-layout", readStream);


                const {
                    pages,
                    tables
                } = await poller.pollUntilDone();

                Response.send({
                    tables
                })
            }
        }else{
            Response.send("not found")
        }
    }
}
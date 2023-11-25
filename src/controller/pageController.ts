import { Contorller } from "../interfaces/Contorller";
import {Request, Response} from "express";
import { logger } from "../middlewares/log";

const path = '/home/ethci/projects/R3f-editor-back/ETHCI-r3f-editor/dist/index.html'

export class PageController extends Contorller {
  public test(Request:Request, Response:Response) {
    Response.send(Request.headers.jti)
  }
  public sendPage(Request:Request, Response:Response){
    Response.sendFile(path,(err=>{
      logger.error(`${Request.ip} used sendPage(): ${err}`)
    }))
  }
}
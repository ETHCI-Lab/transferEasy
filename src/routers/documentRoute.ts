import { Route } from "../interfaces/Route"

import { documentController } from "../controller/documentController";

export class DocumentRoute extends Route{
    
    protected url: string;
    protected Contorller = new documentController();

    constructor(){
        super()
        this.url = '/document'
        this.setRoutes()
    }

    protected setRoutes(): void {
        this.router.get(`${this.url}/test`,this.Contorller.documentPaser)
    }

}
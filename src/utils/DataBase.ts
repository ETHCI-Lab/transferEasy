import { Schema, model, connect } from 'mongoose';
import { InteractLog } from '../models/interactLog';
import { interact } from '../interfaces/interact';
import { worlds, lights, objModels, collisions, materials } from '../models/world';
import { logger } from '../middlewares/log';
import { collision, light, material, objModel, worldinfo } from '../interfaces/worldInterfaces';

export class DataBase {
    DB!: typeof import("mongoose");

    constructor(url: string) {
        this.init(url).then(() => {
            logger.info(`suscess: connet to ${url} `);
        }).catch(() => {
            logger.error(`error: cannt connet to ${url} `);
        })
    }

    async init(url: string): Promise<void> {
        this.DB = await connect(url)
    }

    static async findAccessById(id:string):Promise<worldinfo |null>{
        const access = await worlds.findById(id,"publish owner")
        return access
    }

    static async PutInteract(info: { ID: any, User: any, Agent: any, Time: any }): Promise<void> {
        let ans = new InteractLog({
            ID: info.ID,
            User: info.User,
            Agent: info.Agent,
            Time: info.Time,
        })
        await ans.save();
    }

    static async findAllInteract(): Promise<any> {
        const ans = await InteractLog.find()
        return ans
    }

}


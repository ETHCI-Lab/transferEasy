import { createClient,RedisClientType } from 'redis';
import { logger } from '../middlewares/log';

export class RedisDB {
    private static client: RedisClientType|undefined;
    constructor(url:string){
        try {
            RedisDB.client =  createClient({
                url:url
            })
            RedisDB.client.connect().then(res=>{
                logger.info(`suscess: connet to ${url} `);
                console.log(`suscess: connet to ${url} `)
            }).catch(err=>{
                logger.error(`error: cannt connet to ${err} `)
                console.log(`error: cannt connet to ${err} `)
            })
        } catch (error) {
            logger.error(`error: cannt connet to ${url} `)
        }
    }

    static async findValue(key:string): Promise<any> {
        if (RedisDB.client && RedisDB.client.isReady == true) {
            const ans = await RedisDB.client.GET(key);
            return ans
        }else{
            return "false"
        }
    }

    static async findAll(): Promise<any> {
        if (RedisDB.client && RedisDB.client.isReady == true) {
            const keys:string[] = []
            for await (const key of RedisDB.client.scanIterator()) {
                // use the key!
                keys.push(key)
              }
            return keys
        }else{
            return "false"
        }
    }
}


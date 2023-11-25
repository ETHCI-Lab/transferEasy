import fs from "fs";

interface logs{
    cdn:string[],
    backend:string[]
}

export class fileUtils{
    public static listlog():logs {
        const path = '/home/ethci/projects/logs'
        const cdnLogs = fs.readdirSync(`${path}/cdn`).filter((file)=>{
            const destination = file.split('.')
            if (destination[1]=="log") {
                return(file)
            }
        })
        const backendLogs = fs.readdirSync(`${path}/backend`).filter((file)=>{
            const destination = file.split('.')
            if (destination[1]=="log") {
                return(file)
            }
        })
        return {
            cdn:cdnLogs,
            backend:backendLogs
        }
    }    
}
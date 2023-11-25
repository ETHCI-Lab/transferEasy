import { user } from "../interfaces/user"
import { Request, Response } from "express";
import { DataBase } from "./DataBase";

export const UserAuth = (Request: Request & { user?: user }, Response: Response, callback: Function) => {
    if (!Request.user) {
        Response.send({
            code: 403,
            message: "UnUserAuthenticated"
        })
    } else {
        callback()
    }
}

export const modleAuth = (Request: Request & { user?: user }, Response: Response, callback: Function) => {
    UserAuth(Request,Response,()=>{
        DataBase.findAccessById(Request.query.id as string).then(access => {
            if (access?.publish == "public") {
                callback()
            } else {
                if (Request.user?.name == access?.owner) {
                    callback()
                } else {
                    Response.send({
                        code: 403,
                        message: "no authority"
                    })
                }
            }
        }).catch(err => {
            Response.send(err)
        })
    })
}
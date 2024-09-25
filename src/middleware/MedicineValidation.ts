import { join } from "@prisma/client/runtime/library";
import { NextFunction, Request, Response } from "express";
import Joi from "joi";
import path from "path";
import { ROOT_DIRECTORY } from "../config";
import fs from "fs"

//create schema for new medicine

const createSchema = Joi.object({
    name: Joi.string().required(),
    stock: Joi.number().min(0).required(),
    price: Joi.number().min(1000).required(),
    exp_date: Joi.date().required(),
    type: Joi.string().valid("Syrup", "Tablet", "Powder").required()

})

const createValiadation = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const validate = createSchema.validate(req.body)
    if (validate.error) {
        //delete previous uploaded
        let fileName: string = req.file?.filename || ``
        let pathFile = path.join(ROOT_DIRECTORY, "Public", "medicine-photo", fileName )
        //check existanision file
        let fileExists = fs.existsSync(pathFile)
        if (fileExists && fileName !== ``) {
            fs.unlinkSync(pathFile)
        }
        return res.status(400)
            .json({
                message: validate
                    .error
                    .details
                    .map(it => it.message)
                    .join()
            })
    }
    next()
}
const UpdateSchema = Joi.object({
    name: Joi.string().optional(),
    stock: Joi.number().min(0).optional(),
    price: Joi.number().min(1000).optional(),
    exp_date: Joi.date().optional(),
    type: Joi.string().valid("Syrup", "Tablet", "Powder").optional()

})

const updateValiadation = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const validate = UpdateSchema.validate(req.body)
    if (validate.error) {
        //delete previous uploaded
        let fileName: string = req.file?.filename || ``
        let pathFile = path.join(ROOT_DIRECTORY, "Public", "medicine-photo", fileName )
        //check existanision file
        let fileExists = fs.existsSync(pathFile)
        if (fileExists && fileName !== ``) {
            fs.unlinkSync(pathFile)
        }
        return res.status(400)
            .json({
                message: validate
                    .error
                    .details
                    .map(it => it.message)
                    .join()
            })
    }
    next()
}
export { createValiadation, updateValiadation }
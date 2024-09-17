import { join } from "@prisma/client/runtime/library";
import { NextFunction, Request, Response } from "express";
import Joi from "joi";

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
export {createValiadation,updateValiadation}
import { NextFunction, Request, Response } from "express";
import Joi from "joi";

/** Schema for creating an admin */
const createSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
});

/** Validation middleware for creating an admin */
const createValidation = (req: Request, res: Response, next: NextFunction) => {
    const { error } = createSchema.validate(req.body);
    if (error) {
        return res.status(400).json({
            message: error.details.map((it) => it.message).join(", "),
        });
    }
    next();
};

/** Schema for updating an admin */
const updateSchema = Joi.object({
    name: Joi.string().optional(),
    email: Joi.string().email().optional(),
    password: Joi.string().min(6).optional(),
});

/** Validation middleware for updating an admin */
const updateValidation = (req: Request, res: Response, next: NextFunction) => {
    const { error } = updateSchema.validate(req.body);
    if (error) {
        return res.status(400).json({
            message: error.details.map((it) => it.message).join(", "),
        });
    }
    next();
}

const authSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required()
})
const authValidation = (req: Request, res: Response, next: NextFunction) => {
    const { error } = authSchema.validate(req.body);
    if (error) {
        return res.status(400).json({
            message: error.details.map((it) => it.message).join(", "),
        });
    }
    next();
}

export { createValidation, updateValidation, authValidation };
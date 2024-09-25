import jwt from "jsonwebtoken"
import { NextFunction, Request,Response } from "express"

const verivyToken =async (
    req: Request,
    res: Response,
    next: NextFunction
) =>{
    try {
        //read token from header
        const header =req.headers.authorization
        const [type,token]=header ? header.split("") : []

        //verivey token
        const signature =process.env.SECRET || ""
        const isVerified =jwt.verify(token,signature)
        if (!isVerified){
            return res.status(401)
            .json({
                message: `unverified token`})
        }
        next()
        
    } catch (error) {
        return res.status(401)
        .json({ message: error })
        
    }
}
export {verivyToken}
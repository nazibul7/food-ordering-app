import { NextFunction, Request, Response } from "express";
import { auth } from "express-oauth2-jwt-bearer";
import jwt from "jsonwebtoken"
import { User } from "../models/user.model";

declare global {
    namespace Express {
        interface Request {
            userId: string
            auth0Id: string
        }
    }
}
const jwtCheck = auth({
    audience: process.env.AUTH0_AUDIENCE,
    issuerBaseURL: process.env.AUTH0_ISSUE_BASED_URL,
    tokenSigningAlg: 'RS256'
});

export { jwtCheck }

export const jwtParse = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.headers.authorization
        if (!token || !token.startsWith('Bearer ')) {
            return res.status(401).json("Unauthorized")
        }
        const accessToken = token.split(' ')[1]
        const parseData = jwt.decode(accessToken)
        const auth0Id = parseData?.sub
        const user = await User.findOne({ auth0Id })
        if (!user) {
            return res.status(401).json("Incorrect token")
        }
        req.auth0Id = auth0Id as string
        req.userId = user._id.toString()
        next()
    } catch (error) {
        next(error)
    }
}
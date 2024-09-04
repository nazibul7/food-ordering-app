import { NextFunction, Request, Response } from "express";
import { User } from "../models/user.model";
import { errorHandler } from "../middleweres/errorHandler";

export const createUser=async(req:Request,res:Response,next:NextFunction)=>{
    try {
        const {auth0Id}=req.body
        const existingUser=await User.findOne({auth0Id})
        if(existingUser){
            return next(errorHandler(403,"User already exist"))
        }
        const newUser=await User.create(req.body)
        await newUser.save()
        res.status(201).json(newUser)
    } catch (error) {
        next(error)
    }
}
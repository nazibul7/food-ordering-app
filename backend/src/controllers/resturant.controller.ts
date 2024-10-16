import { NextFunction, Request, Response } from "express";
import { Resturant } from "../models/resturant.model";
import { resturantSchema, resturantSchemaType } from "../utils/zod.validation";
import { date } from "zod";
import { uploadOnCloudinary } from "../utils/cloudinary";

export const createResturant = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const existingResturant = await Resturant.findOne({ user: req.userId })
        if (existingResturant) {
            return res.status(409).json("User resturant already exists")
        }
        const result = resturantSchema.safeParse(req.body)
        if (!result.success) {
            const data = result.error.flatten().fieldErrors
            return res.status(400).json(data)
        }
        const inputData: resturantSchemaType = resturantSchema.parse(req.body)
        const filePath = req.file?.path
        console.log(filePath);
        
        const cloudinaryData = await uploadOnCloudinary(filePath as string)
        if (!cloudinaryData) {
            return res.status(400).json("Unable to upload file")
        }
        const imageUrl = cloudinaryData.secure_url
        const data = await Resturant.create({
            resturantName: inputData.resturantName,
            city: inputData.city,
            country: inputData.country,
            deliveryPrice: inputData.deliveryPrice,
            estimatedDeliveryTime: inputData.estimatedDeliveryTime,
            cuisines: inputData.cuisines,
            menuItems: inputData.menuItems,
            imageUrl: imageUrl
        })

        return res.status(200).json(data)
    } catch (error) {
        next(error)
    }
}
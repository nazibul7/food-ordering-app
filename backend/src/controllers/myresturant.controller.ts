import { NextFunction, Request, Response } from "express";
import { Resturant } from "../models/resturant.model";
import { resturantSchema, resturantSchemaType, UpdatResturantSchema } from "../utils/zod.validation";

import { uploadOnCloudinary } from "../utils/cloudinary";
import { ZodError } from "zod";
import { Order } from "../models/order.model";

export const createResturant = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const existingResturant = await Resturant.findOne({ user: req.userId })
        if (existingResturant) {
            return res.status(409).json("User resturant already exists")
        }
        const parsedBody = {
            ...req.body,
            deliveryPrice: parseFloat(req.body.deliveryPrice),
            estimatedDeliveryTime: parseFloat(req.body.estimatedDeliveryTime),
            menuItems: req.body.menuItems.map((item: { name: string, price: string }) => ({
                ...item,
                price: parseFloat(item.price) // Convert price to number
            }))
        };
        const result = resturantSchema.safeParse(parsedBody)
        if (!result.success) {
            const data = result.error.flatten().fieldErrors
            return res.status(400).json(data)
        }
        const inputData: resturantSchemaType = resturantSchema.parse(parsedBody)
        const filePath = req.file?.path

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
            cusines: inputData.cusines,
            menuItems: inputData.menuItems,
            imageUrl: imageUrl,
            lastUpdated: inputData.lastUpdated,
            user: req.userId
        })

        return res.status(200).json(data)
    } catch (error) {
        next(error)
    }
}

export const getResturant = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = req.userId
        const resturant = await Resturant.findOne({ user: userId })
        if (!resturant) {
            return res.status(404).json("No resturant found, Fill the form to create a resturant")
        }
        res.status(200).json(resturant)
    } catch (error) {
        next(error)
    }
}

export const updateResturant = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const parsedBody = {
            ...req.body,
            deliveryPrice: req.body?.deliveryPrice ? parseFloat(req.body.deliveryPrice) : undefined, // Corrected conditional parsing
            estimatedDeliveryTime: req.body?.estimatedDeliveryTime ? parseFloat(req.body.estimatedDeliveryTime) : undefined, // Conditionally parse
            menuItems: req.body?.menuItems ? req.body.menuItems.map((item: { name: string, price: string }) => ({
                ...item,
                price: item?.price ? parseFloat(item.price) : undefined // Conditionally parse price
            })) : undefined // Handle when menuItems is undefined
        };

        const data = UpdatResturantSchema.parse(parsedBody)
        const userId = req.userId
        const existingResturant = await Resturant.findOne({ user: userId })
        if (!existingResturant) {
            return res.status(404).json("No resturant found for update")
        }
        const updateResturant = await Resturant.updateOne({ user: userId }, data)
        if (req.file) {
            const filePath = req.file?.path
            const cloudinaryData = await uploadOnCloudinary(filePath as string)
            if (!cloudinaryData) {
                return res.status(400).json("Unable to upload file")
            }
            const imageUrl = cloudinaryData.secure_url
            existingResturant.imageUrl = imageUrl
            await existingResturant.save()
        }
        res.status(200).json(updateResturant)
    } catch (error) {
        if (error instanceof ZodError) {
            return next(error.errors[0])
        }
        else {
            next(error)
        }
    }
}


export const ordersResturant = async (req: Request, res: Response) => {
    try {
        const resturant = await Resturant.findOne({ user: req.userId })
        if (!resturant) {
            return res.status(404).json("No resturant found")
        }
        const orders = await Order.find({ resturant: resturant._id }).populate("resturant").populate("user")
        res.status(200).json(orders)
    } catch (error) {
        res.status(500).json("Something went wrong");
    }
}


export const updateOrderStatus = async (req: Request, res: Response) => {
    try {
        const orderId = req.params.orderId
        const status = req.body.status
        
        if (!orderId) {
            return res.status(404).json("Order id not found")
        }
        const order = await Order.findById(orderId)
        if (!order) {
            return res.status(404).json("Order not found")
        }
        const resturant = await Resturant.findById(order.resturant)
        if (resturant?.user._id.toString() != req.userId) {
            return res.status(401).json("You are not allowed to update order status")
        }
        const updateOrder = await Order.findByIdAndUpdate(orderId,
            {
                $set: {
                    status
                }
            },
            { new: true, runValidators: true }
        )
        res.status(200).json(updateOrder)
    } catch (error) {
        return res.status(500).json("Unable to update order status")
    }
}
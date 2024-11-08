import { NextFunction, Request, Response } from "express";
import { z, ZodError } from "zod";
import { Resturant } from "../models/resturant.model";

const ParamsSchema = z.object({
    city: z.string().min(1, "City is required")
})
type ParamsType = z.infer<typeof ParamsSchema>
export const searchResturnat = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { city }: ParamsType = ParamsSchema.parse(req.params)
        const searchQuery = req.query.searchQuery as string || ""
        const selectedCusine = req.query.selectedCusine as string || ""
        const sortOptions = req.query.sortOptions as string || "lastUpdated"
        const page = Number(req.query.page) || 1
        let queryObj: any = {}
        queryObj = {
            ...(city && { city: { $regex: city, $options: "i" } }),
        }
        const cityCheck = await Resturant.countDocuments(queryObj)
        if (cityCheck == 0) {
            return res.status(404).json({
                data: [],
                pagination: {
                    total: 0,
                    page: 1,
                    pages: 1
                }
            })
        }
        // queryObj = {
        //     ...(searchQuery && { $or: [{ resturantName: new RegExp(searchQuery, "i") }, { cusines: { $in: [new RegExp(searchQuery, "i")] } }] }),
        //     ...(selectedCusine && { cusines: { $all: selectedCusine.split(",").map(c => new RegExp(c, "i")) } }),
        // }

        if (searchQuery) {
            queryObj.$or = [
                { resturantName: new RegExp(searchQuery, "i") },
                { cusines: { $in: [new RegExp(searchQuery, "i")] } },
            ];
        }
        if (selectedCusine) {
            queryObj.cusines = { $all: selectedCusine.split(",").map((c) => new RegExp(c, "i")) };
        }
        const pageSize = 10
        const skip = (page - 1) * pageSize
        const resturant = await Resturant.find(queryObj)
            .sort({ [sortOptions]: 1 })
            .skip(skip)
            .limit(pageSize)
        const total = await Resturant.countDocuments(queryObj)
        const response = {
            data: resturant,
            pagination: {
                total,
                page,
                pages: Math.ceil(total / pageSize)
            }
        }
        res.status(200).json(response)
    } catch (error) {
        if (error instanceof ZodError) {
            const errorMessage = error.errors
            return res.status(404).json(errorMessage)
        }
        else {
            next(error)
        }
    }
}
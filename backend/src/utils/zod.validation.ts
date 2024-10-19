import z from "zod"

export const ValidatUserRequest = z.object({
    name: z.string().trim().min(1, "Name is needed"),
    addressLine1: z.string().trim().min(1, "Address is needed"),
    city: z.string().trim().min(1, "City is needed"),
    country: z.string().trim().min(1, "City is needed")
})

export type ValidatUserRequestType = z.infer<typeof ValidatUserRequest>

export const resturantSchema = z.object({
    resturantName: z.string(),
    city: z.string(),
    country: z.string(),
    deliveryPrice: z.number().positive(),
    estimatedDeliveryTime: z.number().positive(),
    cusines: z.array(z.string()),
    menuItems: z.array(z.object({
        name: z.string(),
        price: z.number().positive()
    })),
    lastUpdated: z.string()
})

export type resturantSchemaType = z.infer<typeof resturantSchema>
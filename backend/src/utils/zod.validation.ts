import z from "zod"

export const ValidatUserRequest = z.object({
    name: z.string().trim().min(1, "Name is needed"),
    addressLine1: z.string().trim().min(1, "Address is needed"),
    city: z.string().trim().min(1, "City is needed"),
    country: z.string().trim().min(1, "City is needed")
})

export type ValidatUserRequestType = z.infer<typeof ValidatUserRequest>
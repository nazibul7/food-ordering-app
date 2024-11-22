import { Resturant } from "@/types";
import { useAuth0 } from "@auth0/auth0-react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { toast } from "sonner";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useCreateResturant = () => {
    const queryClient = useQueryClient()
    const { getAccessTokenSilently } = useAuth0()
    const creatResturantRequest = async (resturantFormData: FormData): Promise<Resturant> => {
        const accessToken = await getAccessTokenSilently()
        const response = await fetch(`${API_BASE_URL}/api/resturant`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${accessToken}`
            },
            body: resturantFormData
        })
        if (!response.ok) {
            throw new Error("Failed to create resturant")
        }
        return response.json()
    }
    const { mutateAsync: creatResturant, isLoading, isSuccess, error } = useMutation(creatResturantRequest, {
        onSuccess: () => {
            queryClient.invalidateQueries("resturant")
        }
    })
    if (isSuccess) {
        toast.success("Resturant created")
    }
    if (error) {
        toast.error(error.toString())
    }
    return { creatResturant, isLoading }
}

export const useGetResturant = () => {
    const { getAccessTokenSilently } = useAuth0()
    const getResturantResponse = async () => {
        try {
            const accessToken = await getAccessTokenSilently()
            const response = await fetch(`${API_BASE_URL}/api/resturant`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })
            if (!response.ok) {
                return {
                    resturantName: "",
                    city: "",
                    country: "",
                    deliveryPrice: 0,
                    estimatedDeliveryTime: 0,
                    cusines: [],
                    menuItems: [{ name: "", price: 0 }],
                    imageFile: undefined
                }
            }
            return await response.json()
        } catch (error) {
            return error
        }
    }
    const { data: resturant, isLoading } = useQuery("resturant", getResturantResponse)

    return { resturant, isLoading }
}

export const useUpdateResturant = () => {
    const { getAccessTokenSilently } = useAuth0()
    const queryClient = useQueryClient()
    const updateResturantRequest = async (data: FormData): Promise<Resturant> => {
        const accessToken = await getAccessTokenSilently()
        const response = await fetch(`${API_BASE_URL}/api/resturant`, {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${accessToken}`
            },
            body: data
        })
        if (!response.ok) {
            throw new Error("Unable to update resturant")
        }
        return response.json()
    }
    const { mutateAsync: updateResturant, isLoading, isSuccess, error } = useMutation(updateResturantRequest, {
        onSuccess: () => {
            queryClient.invalidateQueries("resturant")
        }
    })
    if (isSuccess) {
        toast.success("Resturant updated")
    }
    if (error) {
        toast.error(error.toString())
    }
    return { updateResturant, isLoading }
}


export const useGetresturantOrders = () => {
    const { getAccessTokenSilently } = useAuth0()
    const resturantOrderResuest = async () => {
        try {
            const accessToken = await getAccessTokenSilently()
            const response = await fetch(`${API_BASE_URL}/api/resturant/order`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${accessToken}`
                }
            })
            if (!response.ok) {
                throw new Error("Unable to fetch orders")
            }
            return response.json()
        } catch (error) {
            throw new Error("Something went wrong")
        }
    }
    const { data: orderForResturantOwner, isLoading } = useQuery("resturantOrder", resturantOrderResuest)
    return { orderForResturantOwner, isLoading }
}
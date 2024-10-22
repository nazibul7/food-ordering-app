import { Resturant } from "@/types";
import { useAuth0 } from "@auth0/auth0-react";
import { useMutation, useQuery } from "react-query";
import { toast } from "sonner";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useCreateResturant = () => {
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
    const { mutateAsync: creatResturant, isLoading, isSuccess, error } = useMutation(creatResturantRequest)
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
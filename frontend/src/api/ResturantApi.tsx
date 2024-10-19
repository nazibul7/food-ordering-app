import { Resturant } from "@/types";
import { useAuth0 } from "@auth0/auth0-react";
import { useMutation } from "react-query";
import { toast } from "sonner";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useCreateResturant = () => {
    const { getAccessTokenSilently } = useAuth0()
    const creatResturantRequest = async (resturantFormData: FormData):Promise<Resturant> => {
        const accessToken = await getAccessTokenSilently()
        const response = await fetch(`${API_BASE_URL}//api/resturant`, {
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
    if(isSuccess){
        toast.success("Resturant created")
    }
    if(error){
        toast.error(error.toString())
    }
    return { creatResturant, isLoading }
}
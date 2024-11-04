import { ResturantSearchResponse } from "@/types";
import { useQuery } from "react-query";


const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useSearchResturant = (city?: string) => {
    const createSearchRequest = async ():Promise<ResturantSearchResponse> => {
        try {
            const response = await fetch(`${API_BASE_URL}/api/resturant/search/${city}`, {
                method: "GET"
            })
            if (!response.ok) {
                throw new Error("Unable to get resturnat")
            }
            return response.json()
        } catch (error) {
            throw new Error(error as string)
        }
    }
    const { data: results, isLoading } = useQuery('searchResturant', createSearchRequest, {
        enabled: !!city
    })
    return {results,isLoading}
}
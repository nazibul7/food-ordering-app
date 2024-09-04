import { useAuth0 } from "@auth0/auth0-react";
import { useMutation } from "react-query";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

type UserRequest = {
    auth0Id: string,
    email: string
}

export const useCreateMyUser = () => {
    const { getAccessTokenSilently } = useAuth0()
    const createUserRequest = async (user: UserRequest) => {
        const accessToken=await getAccessTokenSilently()
        const response = await fetch(`${API_BASE_URL}/api/v1/user/create`, {
            method: "POST",
            headers: {
                Authorization:`Bearer ${accessToken}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        })
        if (!response.ok) {
            throw new Error("Faild to create user")
        }
    }
    // rename mutateAsync to createUser
    const { mutateAsync: createUser, isLoading, isError, isSuccess } = useMutation(createUserRequest)
    return {
        createUser, isLoading, isError, isSuccess
    }
}
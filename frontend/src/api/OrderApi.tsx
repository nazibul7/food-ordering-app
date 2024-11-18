import { useAuth0 } from "@auth0/auth0-react"
import { useMutation } from "react-query";
import { toast } from "sonner";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

type TCheckoutSessionRequest = {
    cartItems: {
        menuItemId: string
        name: string
        quantity: number
    }[],
    deliveryDeatils: {
        email: string
        name: string
        addressLine1: string
        city: string
    },
    resturantId: string
}
export const useCreateCheckoutSession = () => {
    const { getAccessTokenSilently } = useAuth0()
    const createCheckoutSessionRequest = async (checkoutSessionRequest:TCheckoutSessionRequest) => {
        try {
            const accessToken = await getAccessTokenSilently()
            const response = await fetch(`${API_BASE_URL}/api/order/checkout/create-checkout-session`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${accessToken}`
                },
                body: JSON.stringify(checkoutSessionRequest)
            })
            if (!response.ok) {
                throw new Error("Unable to create checkout session")
            }
            return response.json()
        } catch (error) {
            console.log(error);
        }
    }
    const { mutateAsync: createCheckoutSession, isLoading, error, reset } = useMutation(createCheckoutSessionRequest)
    if (error) {
        toast.error(error.toString())
        reset()
    }
    return {
        createCheckoutSession, isLoading
    }
}
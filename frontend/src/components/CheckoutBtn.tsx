import { useAuth0 } from "@auth0/auth0-react"
import { useLocation } from "react-router-dom"
import { Button } from "./ui/button"
import LoadingButton from "./LoadingButton"
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog"
import UserProfileForm, { UserFormType } from "@/forms/user-profile-form/UserProfileForm"
import { useGetUser } from "@/api/UserApi"
import { User } from "@/types"

type TCheckOutProps = {
    onCheckout: (UserFormData:UserFormType) => void
    disabled:boolean
}

export default function CheckoutBtn({onCheckout,disabled}:TCheckOutProps) {
    const { isAuthenticated, isLoading: isAuthLoading, loginWithRedirect } = useAuth0()
    const { currentUser, isLoading } = useGetUser()
    const { pathname } = useLocation()
    const onLogin = async () => {
        await loginWithRedirect({
            appState: {
                returnTo: pathname
            }
        })
    }
    if (!isAuthenticated) {
        return <Button onClick={onLogin} className="bg-orange-500 flex-1">Login to check out</Button>
    }
    if (isAuthLoading || !currentUser) {
        return <LoadingButton />
    }
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="bg-orange-500 flex-1" disabled={disabled}>Go to check out</Button>
            </DialogTrigger>
            <DialogContent className="max-w-[425px] md:min-w-[700px] bg-gray-50">
                <UserProfileForm currentUser={currentUser as User} onSave={onCheckout} isLoading={isLoading} title="Confirm Delivery Details" btnText="Continue to payment"/>
            </DialogContent>
        </Dialog>
    )
}

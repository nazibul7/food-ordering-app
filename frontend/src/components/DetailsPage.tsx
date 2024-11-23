import { useGetResturantById } from "@/api/ResturantApi"
import { useParams } from "react-router-dom"
import { AspectRatio } from "./ui/aspect-ratio"
import ResturantInfo from "./ResturantInfo"
import MenuItemComp from "./MenuItemComp"
import { useState } from "react"
import { MenuItem, TCartItem, } from "@/types"
import { Card, CardFooter } from "./ui/card"
import OrderSummary from "./OrderSummary"
import CheckoutBtn from "./CheckoutBtn"
import { UserFormType } from "@/forms/user-profile-form/UserProfileForm"
import { useCreateCheckoutSession } from "@/api/OrderApi"


export default function DetailsPage() {
    const { resturantId } = useParams()
    const { result, isLoading } = useGetResturantById(resturantId)
    const { createCheckoutSession, isLoading: isCheckoutLoading } = useCreateCheckoutSession()
    const [cartItems, setCartItems] = useState<TCartItem[]>(() => {
        const data = sessionStorage.getItem(`cartItems-${resturantId}`)
        return data ? JSON.parse(data) : []
    })
    if (isLoading || !result || isCheckoutLoading) {
        return "Loading..."
    }
    const addCartItem = (menuItem: MenuItem) => {
        setCartItems((prevCartItem) => {
            const existingCartItem = prevCartItem.find((cartItem) => cartItem._id == menuItem._id)
            let updateCartItem;
            if (existingCartItem) {
                updateCartItem = prevCartItem.map((cartItem) => (
                    { ...cartItem, quantity: cartItem.quantity + 1 }
                ))
            }
            else {
                updateCartItem = [
                    ...prevCartItem, {
                        _id: menuItem._id,
                        name: menuItem.name,
                        price: menuItem.price,
                        quantity: 1
                    }
                ]
            }
            sessionStorage.setItem(`cartItems-${resturantId}`, JSON.stringify(updateCartItem))
            return updateCartItem
        })
    }
    const removecartItem = (menuItem: MenuItem) => {
        setCartItems((prev) => {
            const updateCartItem = prev.filter(menu => menu._id !== menuItem._id)
            sessionStorage.setItem(`cartItems-${resturantId}`, JSON.stringify(updateCartItem))
            return updateCartItem
        })
    }
    const onCheckoutHandler = async (UserFormData: UserFormType) => {
        const restaurantId = result._id; 
        const checkoutData = {
            cartItems: cartItems.map((cartItem) => {
                return {
                    menuItemId: cartItem._id,
                    name: cartItem.name,
                    quantity: cartItem.quantity
                }
            }),
            resturantId: restaurantId,
            deliveryDeatils: {
                email: UserFormData.email as string,
                name: UserFormData.name,
                addressLine1: UserFormData.addressLine1,
                city: UserFormData.city,
                country: UserFormData.country
            },
        }

        const data = await createCheckoutSession(checkoutData)
        if (data?.url) {
            window.location.href = data.url;
        } else {
            console.error("Checkout URL is missing");
        }
        
    }
    return (
        <div className="flex flex-col gap-10">
            <AspectRatio ratio={16 / 5} >
                <img src={result.imageUrl} className="rounded-md object-cover h-full w-full" />
            </AspectRatio>
            <div className="grid md:grid-cols-[4fr_2fr] gap-5 md:px-32">
                <div className="flex flex-col gap-10">
                    <ResturantInfo resturant={result} />
                    <span className="text-2xl font-bold tracking-tight">Menu</span>
                    {result.menuItems.map((menu, index) => (
                        <MenuItemComp key={index} menuItem={menu} addToCart={addCartItem} />
                    ))}
                </div>
                <div>
                    <Card>
                        <OrderSummary cartItem={cartItems} resturant={result} removeFromCart={removecartItem} />
                        <CardFooter>
                            <CheckoutBtn onCheckout={onCheckoutHandler} disabled={cartItems.length <= 0} isLoading={isCheckoutLoading} />
                        </CardFooter>
                    </Card>
                </div>
            </div>
        </div>
    )
}

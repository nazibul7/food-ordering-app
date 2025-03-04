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


export default function DetailsPage() {
    const { resturantId } = useParams()
    const { result, isLoading } = useGetResturantById(resturantId)
    const [cartItems, setCartItems] = useState<TCartItem[]>(() => {
        const data = sessionStorage.getItem(`cartItems-${resturantId}`)
        return data ? JSON.parse(data) : []
    })
    if (isLoading || !result) {
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
                            <CheckoutBtn cartItems={cartItems} resturantId={resturantId} disabled={cartItems.length <= 0} />
                        </CardFooter>
                    </Card>
                </div>
            </div>
        </div>
    )
}

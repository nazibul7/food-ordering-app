import { MenuItem, Resturant, TCartItem } from "@/types"
import { CardContent, CardHeader, CardTitle } from "./ui/card"
import { Badge } from "./ui/badge"
import { Separator } from "./ui/separator"
import { Trash } from "lucide-react"

type TOrderSummary = {
    resturant: Resturant
    cartItem: TCartItem[],
    removeFromCart: (menuItem:MenuItem) => void
}

export default function OrderSummary({ resturant, cartItem, removeFromCart }: TOrderSummary) {
    const getTotalCost = () => {
        const total = cartItem.reduce((total, item) => total + item.price * item.quantity, 0)
        return total + resturant.deliveryPrice
    }
    return (
        <>
            <CardHeader>
                <CardTitle className="flex justify-between text-2xl font-bold tracking-tight">
                    <span>Your Order</span>
                    <span>${getTotalCost()}</span>
                </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-5">
                {cartItem.map((item) => (
                    <div key={item._id} className="flex justify-between">
                        <span>
                            <Badge variant={'outline'} className="mr-2">
                                {item.quantity}
                            </Badge>
                            {item.name}
                        </span>
                        <span className="flex items-center gap-1">
                            <Trash onClick={()=>removeFromCart(item)} className="cursor-pointer" color="red" size={20} />
                            ${(item.price * item.quantity)}
                        </span>
                    </div>
                ))}
                <Separator />
                <div className="flex justify-between">
                    <span>Delivery</span>
                    <span>${resturant.deliveryPrice}</span>
                </div>
                <Separator />
            </CardContent>
        </>
    )
}

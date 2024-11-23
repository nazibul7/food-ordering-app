import { TOrderStatus } from "@/types"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Separator } from "./ui/separator"
import { Badge } from "./ui/badge"
import { Label } from "./ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { ORDER_STATUS } from "@/config/order-status-config"

type TOrderProp = {
    order: TOrderStatus
}
export default function OrderItemCard({ order }: TOrderProp) {
    const getTime = () => {
        const orderDate = new Date(order.createdAt)
        const hours = orderDate.getHours()
        const minutes = orderDate.getMinutes()
        const paddedMinute = minutes < 10 ? `0${minutes}` : minutes
        return `${hours}:${paddedMinute}`
    }
    return (
        <Card>
            <CardHeader>
                <CardTitle className="grid md:grid-cols-4 gap-4 justify-between mb-3">
                    <div>
                        Customer Name :
                        <span className="ml-2 font-normal">{order.deliveryDetails.name}</span>
                    </div>
                    <div>
                        Delivery address :
                        <span className="ml-2 font-normal">{order.deliveryDetails.addressLine1}, {order.deliveryDetails.city}</span>
                    </div>
                    <div>
                        Time :
                        <span className="ml-2 font-normal">{getTime()}</span>
                    </div>
                    <div>
                        Total Cost :
                        <span> ${order.totalAmount}</span>
                    </div>
                </CardTitle>
            <Separator/>
            </CardHeader>
            <CardContent className="flex flex-col gap-6">
                <div className="flex flex-col gap-2">
                    {order.cartItems.map((item)=>(
                        <span>
                            <Badge variant="outline" className="mr-2">{item.quantity}</Badge>
                            {item.name}
                        </span>
                    ))}
                </div>
                <div className="flex flex-col space-y-2">
                    <Label htmlFor="status">What is the status of this order?</Label>
                    <Select>
                        <SelectTrigger id="status">
                            <SelectValue placeholder="Status"/>
                        </SelectTrigger>
                        <SelectContent>
                            {ORDER_STATUS.map((status)=>(
                                <SelectItem value={status.value}>
                                    {status.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            </CardContent>
        </Card>
    )
}
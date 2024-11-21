import { OrderStatus } from "@/types"

type TOrderStatusInfo = {
    label: string
    value: OrderStatus
    progressValue: number
}

export const ORDER_STATUS: TOrderStatusInfo[] = [
    { label: "Placed", value: "placed", progressValue: 0 },
    { label: "Awaiting Resturant Confirmation", value: "paid", progressValue: 25 },
    { label: "In Progress", value: "inProgress", progressValue: 50 },
    { label: "Out For Delivery", value: "outForDelivery", progressValue: 75 },
    { label: "Delivered", value: "delivered", progressValue: 100 },
]
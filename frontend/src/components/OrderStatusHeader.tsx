import { TOrderStatus } from '@/types'


type TOrder = {
    order: TOrderStatus
}
export default function OrderStatusHeader({ order }: TOrder) {
    const getExpectedDelivery = () => {
        const created = new Date(order.createdAt)
        created.setMinutes(
            created.getMinutes() + order.resturant.estimatedDeliveryTime
        )
        const hours = created.getHours()
        const minutes = created.getMinutes()
        const paddedMinutes = minutes > 10 ? minutes : `0${minutes}`
        return `${hours}:${paddedMinutes}`
    }
    return (
        <>
            <h1 className='text-4xl font-bold tracking-tighter flex flex-col gap-5 md:flex-row md:justify-between'>
                <span>Order Status :{order.status}</span>
                <span>Expected by:{getExpectedDelivery()}</span>
            </h1>
        </>
    )
}

import { useGetOrders } from '@/api/OrderApi'
import OrderStatusDetail from '@/components/OrderStatusDetail'
import OrderStatusHeader from '@/components/OrderStatusHeader'
import { AspectRatio } from '@/components/ui/aspect-ratio'


export default function OrderStatusPages() {
    const { orders, isLoading } = useGetOrders()
    if (isLoading) {
        return "Loading..."
    }
    if (!orders || orders.length == 0) {
        return "No orders found"
    }

    return (
        <div className='space-y-10'>
            {orders.map((order) => (
                <div className='bg-gray-50 space-y-10 p-10 rounded-lg' key={order._id}>
                    <OrderStatusHeader order={order} />
                    <div className='grid gap-10 md:grid-cols-2'>
                        <OrderStatusDetail order={order} />
                        <AspectRatio ratio={16 / 5}>
                            <img src={order.resturant.imageUrl} alt="" className='rounded-md object-cover h-full w-full' />
                        </AspectRatio>
                    </div>
                </div>
            ))}
        </div>
    )
}

import { useGetOrders } from '@/api/OrderApi'
import OrderStatusHeader from '@/components/OrderStatusHeader'


export default function OrderStatusPages() {
    const { orders, isLoading } = useGetOrders()
    if (isLoading) {
        return "Loading..."
    }
    if (!orders || orders.length == 0) {
        return "No orders found"
    }
    console.log(orders);
    
    return (
        <div className=''>
            {orders.map((order)=>(
                <div className='bg-gray-50 p-10 rounded-lg'>
                    <OrderStatusHeader key={order._id} order={order}/>
                </div>
            ))}
        </div>
    )
}

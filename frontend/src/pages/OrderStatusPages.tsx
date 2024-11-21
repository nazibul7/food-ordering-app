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
    
    return (
        <div className=''>
            {orders.map((order)=>(
                <div className='bg-gray-50 p-10 rounded-lg' key={order._id}>
                    <OrderStatusHeader order={order}/>
                </div>
            ))}
        </div>
    )
}

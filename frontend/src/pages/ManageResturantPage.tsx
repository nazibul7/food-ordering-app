import { useCreateResturant, useGetResturant, useUpdateResturant, useGetresturantOrders } from "@/api/MyResturantApi";
import OrderItemCard from "@/components/OrderItemCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ManageResturantForm from "@/forms/manage-resturant-form/ManageResturantForm";

export default function ManageResturantPage() {
  const { creatResturant, isLoading: isCreateLoading } = useCreateResturant()
  const { resturant } = useGetResturant()
  const { updateResturant, isLoading: isUpdateLoading } = useUpdateResturant()
  const { orderForResturantOwner, isLoading } = useGetresturantOrders()
  console.log(orderForResturantOwner);

  return (
    <Tabs defaultValue="orders">
      <TabsList>
        <TabsTrigger value="orders">Orders</TabsTrigger>
        <TabsTrigger value="manage-resturant">Manage Resturant</TabsTrigger>
      </TabsList>
      <TabsContent value="orders" className="space-y-5 bg-slate-50 p-10 rounded-lg">
        <h2 className="text-2xl font-bold">{orderForResturantOwner?.length || 0} active orders</h2>
        {orderForResturantOwner?.map((order) => (
          <div>
            <OrderItemCard order={order} />
          </div>
        ))}
      </TabsContent>
      <TabsContent value="manage-resturant">
        <ManageResturantForm resturant={resturant} onSave={resturant?._id ? updateResturant : creatResturant} isLoading={isCreateLoading || isUpdateLoading} />
      </TabsContent>
    </Tabs>
  )
}

import { useCreateResturant, useGetResturant } from "@/api/ResturantApi";
import ManageResturantForm from "@/forms/manage-resturant-form/ManageResturantForm";

export default function ManageResturantPage() {
  const { creatResturant, isLoading:isCreateLoading } = useCreateResturant()
  const { resturant, isLoading:isGetLoading } = useGetResturant()
  return (
    <ManageResturantForm resturant={resturant} onSave={creatResturant} isLoading={isCreateLoading} />
  )
}

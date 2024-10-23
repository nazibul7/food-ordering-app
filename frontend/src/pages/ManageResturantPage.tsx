import { useCreateResturant, useGetResturant, useUpdateResturant } from "@/api/ResturantApi";
import ManageResturantForm from "@/forms/manage-resturant-form/ManageResturantForm";

export default function ManageResturantPage() {
  const { creatResturant, isLoading: isCreateLoading } = useCreateResturant()
  const { resturant } = useGetResturant()
  const { updateResturant, isLoading:isUpdateLoading } = useUpdateResturant()
  return (
    <ManageResturantForm resturant={resturant} onSave={resturant?._id ? updateResturant : creatResturant} isLoading={isCreateLoading || isUpdateLoading} />
  )
}

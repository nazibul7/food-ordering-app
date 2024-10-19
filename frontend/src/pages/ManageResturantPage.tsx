import { useCreateResturant } from "@/api/ResturantApi";
import ManageResturantForm from "@/forms/manage-resturant-form/ManageResturantForm";

export default function ManageResturantPage() {
  const { creatResturant, isLoading } = useCreateResturant()
  return (
    <ManageResturantForm onSave={creatResturant} isLoading={isLoading} />
  )
}

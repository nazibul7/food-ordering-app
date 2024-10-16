import { Form } from "@/components/ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import z from "zod"
import DetailsSection from "./DetailsSection"
import { Separator } from "@radix-ui/react-separator"
import CuisinesSection from "./CuisinesSection"
import MenuSection from "./MenuSection"
import ImageSection from "./ImageSection"
import LoadingButton from "@/components/LoadingButton"
import { Button } from "@/components/ui/button"

const formSchema = z.object({
    resturantName: z.string({ required_error: "Resturant name is required" }),
    city: z.string({ required_error: "City name is required" }),
    country: z.string({ required_error: "Country name is required" }),
    deliveryPrice: z.coerce.number({ required_error: "Delivery price is required", invalid_type_error: "Must be a valid number" }),
    estimatedDeliveryTime: z.coerce.number({ required_error: "Estimated delivery time is required", invalid_type_error: "Must be a valid number" }),
    cusines: z.array(z.string().nonempty({
        message: "Please select at least one item"
    })),
    menuItems: z.array(z.object({
        name: z.string().min(1, "Name is required"),
        price: z.coerce.number().min(1, "Price is required")
    })),
    imageFile: z.instanceof(File, { message: "Image is required" })
})

type resturantFormType = z.infer<typeof formSchema>
type Props = {
    onSave: (resturantFormData: resturantFormType) => void
    isLoading: boolean
}

const ManageResturantForm = ({ onSave, isLoading }: Props) => {
    const form = useForm<resturantFormType>({
        resolver: zodResolver(formSchema)
    })
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSave)} className="space-y-8 bg-gray-50 p-10 rounded-lg">
                <DetailsSection />
                <Separator />
                <CuisinesSection />
                <Separator />
                <MenuSection />
                <Separator />
                <ImageSection />
                {isLoading ? <LoadingButton/>:<Button type="submit">Submit</Button>}
            </form>
        </Form>
    )
}

export default ManageResturantForm
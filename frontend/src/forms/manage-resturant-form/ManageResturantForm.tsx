import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";
import DetailsSection from "./DetailsSection";
import { Separator } from "@radix-ui/react-separator";
import CuisinesSection from "./CuisinesSection";
import MenuSection from "./MenuSection";
import ImageSection from "./ImageSection";
import LoadingButton from "@/components/LoadingButton";
import { Button } from "@/components/ui/button";
import { DateTime } from "luxon";
import { useEffect } from "react";

const formSchema = z
  .object({
    resturantName: z.string().trim().min(1, "Resturant name is required"),
    city: z.string().min(1, "City is required"),
    country: z.string().min(1, "Country is required"),
    deliveryPrice: z.coerce
      .number({
        required_error: "Delivery price is required",
        invalid_type_error: "Must be a valid number",
      })
      .refine((val) => val > 0, { message: "Price must be grater than 0" }),
    estimatedDeliveryTime: z.coerce
      .number({
        required_error: "Estimated delivery time is required",
        invalid_type_error: "Must be a valid number",
      })
      .refine((val) => val > 0, {
        message: "Delivery time must be greater than 0 minutes",
      }),
    cusines: z.array(z.string()).min(1, "Please select at least one item"),
    menuItems: z.array(
      z.object({
        name: z.string().trim().min(1, "Name is required"),
        price: z.coerce.number().min(1, "Price is required"),
      })
    ),
    imageUrl: z.string().optional(),
    imageFile: z.instanceof(File, { message: "Image is required" }).optional(),
  })
  .refine((data) => data.imageFile || data.imageUrl, {
    message: "Either image url or image file is required",
    path: ["imageFile"],
  });

type resturantFormType = z.infer<typeof formSchema>;
type Props = {
  resturant?: resturantFormType;
  onSave: (resturantFormData: FormData) => void;
  isLoading: boolean;
};

const ManageResturantForm = ({ resturant, onSave, isLoading }: Props) => {
  const form = useForm<resturantFormType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      resturantName: "", // Default restaurant name
      city: "", // Default city
      country: "", // Default country
      deliveryPrice: 0, // Default delivery price
      estimatedDeliveryTime: 0, // Default estimated delivery time
      cusines: [], // Default empty array for cuisines
      menuItems: [{ name: "", price: 0 }], // Default single menu item
      imageFile: undefined, // Default for file input
    },
  });

  const onSubmit = (formDataJson: resturantFormType) => {
    try {
      const formData = new FormData();
      formData.append("resturantName", formDataJson.resturantName);
      formData.append("city", formDataJson.city);
      formData.append("country", formDataJson.country);
      formData.append("deliveryPrice", formDataJson.deliveryPrice.toString());
      formData.append(
        "estimatedDeliveryTime",
        formDataJson.estimatedDeliveryTime.toString()
      );

      formDataJson.menuItems.forEach((menu, index) => {
        formData.append(`menuItems[${index}][name]`, menu.name);
        formData.append(`menuItems[${index}][price]`, menu.price.toString());
      });
      formDataJson.cusines.forEach((item, index) => {
        formData.append(`cusines[${index}]`, item);
      });
      if (formDataJson.imageFile) {
        formData.append("imageFile", formDataJson.imageFile);
      }
      formData.append("lastUpdated", DateTime.now().toISO());
      onSave(formData);
    } catch (error) {
      console.error("Error during submission:", error);
    }
  };
  useEffect(() => {
    if (resturant) {
      form.reset(resturant);
    }
  }, [form, resturant]);
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 bg-gray-50 p-10 rounded-lg"
      >
        <DetailsSection />
        <Separator />
        <CuisinesSection />
        <Separator />
        <MenuSection />
        <Separator />
        <ImageSection />
        {isLoading ? <LoadingButton /> : <Button type="submit">Submit</Button>}
      </form>
    </Form>
  );
};

export default ManageResturantForm;

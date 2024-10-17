import { FormDescription, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { cuisineList } from "@/config/resturnat-options-config"
import { useForm } from "react-hook-form"
import CusineCheckbox from "./CusineCheckbox"

type FormValues = {
    cusines: string[];
};

export default function CuisinesSection() {
    const { control } = useForm<FormValues>({
        defaultValues: {
            cusines: []
        }
    })
    return (
        <div className="space-y-2">
            <div>
                <h2 className="text-2xl font-bold">Cuisines</h2>
                <FormDescription>
                    Select the cuisines that your resturant serves
                </FormDescription>
            </div>
            <FormField control={control} name="cusines" render={({ field }) => (
                <FormItem>
                    <div className="grid md:grid-cols-5 gap-1">{cuisineList.map((cusineItem) => {
                        return <CusineCheckbox key={cusineItem} cusine={cusineItem} field={field} />
                    })}
                    </div>
                    <FormMessage />
                </FormItem>
            )}>
            </FormField>
        </div>
    )
}

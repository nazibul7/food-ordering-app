import { Checkbox } from "@/components/ui/checkbox";
import { FormControl, FormItem, FormLabel } from "@/components/ui/form";
import { ControllerRenderProps } from "react-hook-form";
type FormValues = {
  cusines: string[];
};

type Props = {
  cusine: string;
  field: ControllerRenderProps<FormValues, "cusines">;
};
export default function CusineCheckbox({ cusine, field }: Props) {
  return (
    <FormItem className="flex flex-row items-center space-x-1 space-y-0 mt-2">
      <FormControl>
        <Checkbox
          className="bg-white"
          checked={field.value?.includes(cusine)}
          onCheckedChange={(checked) => {
            const updatedValues = checked
              ? [...field.value, cusine]
              : field.value.filter((item: string) => item != cusine);
            field.onChange(updatedValues);
          }}
        />
      </FormControl>
      <FormLabel className="text-sm font-normal">{cusine}</FormLabel>
    </FormItem>
  );
}

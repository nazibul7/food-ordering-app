import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";

type Props = {
    sortOption: string
    onChnage: (sortOption: string) => void
}

const SORT_OPTIONS = [
    {
        label: "Best match",
        value: "bestMatch",
    },
    {
        label: "Delivery price",
        value: "deliveryPrice",
    },
    {
        label: "Estimated delivery time",
        value: "estimatedDeliveryTime",
    },
];

export default function SortOptionDropDown({ sortOption, onChnage }: Props) {
    const selectedSortOption =SORT_OPTIONS.find((option)=>option.value==sortOption)?.label || SORT_OPTIONS[0].label
  return (
        <DropdownMenu>
            <DropdownMenuTrigger className="cursor-pointer">
                <div className="w-full cursor-pointer border p-2 rounded-md text-center">Sort by : {selectedSortOption}</div>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                {SORT_OPTIONS.map((option, index) => (
                    <DropdownMenuItem key={index} className="cursor-pointer" onClick={() => onChnage(option.value)} >
                        {option.label}
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

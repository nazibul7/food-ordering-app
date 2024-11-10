import { cuisineList } from "@/config/resturnat-options-config"
import { Label } from "./ui/label"
import { Check, ChevronDown, ChevronUp } from "lucide-react"
import { ChangeEvent } from "react"
import { Button } from "./ui/button"

type Props = {
    selectedCusine: string[]
    onChange: (cusines: string[]) => void
    isExpandes: boolean
    onExpandedClick: () => void
}

export default function CusineFilter({ selectedCusine, onChange, isExpandes, onExpandedClick }: Props) {
    // console.log(selectedCusine);
    const handleCusineReset = () => {
        onChange([])
    }
    const handleCusineChange = (event: ChangeEvent<HTMLInputElement>) => {
        const clickCusine = event.target.value
        const newCusineList = event.target.checked ? [...selectedCusine, clickCusine] : selectedCusine.filter((cusine) => cusine != clickCusine)
        onChange(newCusineList)
    }
    return (
        <>
            <div className="flex justify-between items-center px-2 mb-2">
                <div>Filter By Cuisine</div>
                <div onClick={handleCusineReset} className="text-sm font-semibold cursor-pointer text-blue-500">
                    Reset Filters
                </div>
            </div>
            <div className="space-y-2 flex flex-col">
                {cuisineList.map((cusine, index) => {
                    if (isExpandes || index < 7) {
                        const isSelected = selectedCusine.includes(cusine)
                        return <div key={index} className="flex">
                            <input id={`cusine_${cusine}`} type='checkbox' className="hidden" value={cusine}
                                checked={isSelected} onChange={handleCusineChange}
                            />
                            <Label htmlFor={`cusine_${cusine}`} className={`flex items-center text-sm rounded-full flex-1 px-4 py-2 font-semibold ${isSelected ? "border border-green-600 text-green-600" : "border border-slate-300"}`}>
                                {isSelected && <Check size={20} strokeWidth={3} />}
                                {cusine}
                            </Label>
                        </div>
                    }
                    return null
                })}
                <Button variant="link" onClick={onExpandedClick} className="mt-4 flex-1">
                    {isExpandes ? (<span className="flex flex-row items-center">View Less <ChevronUp/> </span>):(<span className="flex flex-row items-center">View More <ChevronDown/></span>)}
                </Button>
            </div>
        </>
    )
}

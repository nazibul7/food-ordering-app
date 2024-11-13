import { useGetResturantById } from "@/api/ResturantApi2"
import { useParams } from "react-router-dom"
import { AspectRatio } from "./ui/aspect-ratio"
import ResturantInfo from "./ResturantInfo"
import MenuItemComp from "./MenuItemComp"

export default function DetailsPage() {
    const { resturantId } = useParams()
    const { result, isLoading } = useGetResturantById(resturantId)
    if (isLoading || !result) {
        return "Loading..."
    }
    return (
        <div className="flex flex-col gap-10">
            <AspectRatio ratio={16 / 5} >
                <img src={result.imageUrl} className="rounded-md object-cover h-full w-full" />
            </AspectRatio>
            <div className="grid md:grid-cols-[4fr_2fr] gap-5 md:px-32">
                <div className="flex flex-col gap-10">
                    <ResturantInfo resturant={result} />
                    <span className="text-2xl font-bold tracking-tight">Menu</span>
                    {result.menuItems.map((menu,index)=>(
                        <MenuItemComp key={index} menuItem={menu}/>
                    ))}
                </div>
                <div></div>
            </div>
        </div>
    )
}

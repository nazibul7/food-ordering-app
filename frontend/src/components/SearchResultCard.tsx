import { Resturant } from "@/types"
import { Link } from "react-router-dom"
import { AspectRatio } from "./ui/aspect-ratio"
import { Banknote, Clock, Dot } from "lucide-react"

type Props = {
    resturant: Resturant
}

export default function SearchResultCard({ resturant }: Props) {
    return (
        <Link to={`/detail/${resturant._id}`}>
            <div className="grid lg:grid-cols-[2fr_3fr] gap-5 items-center group">
                <AspectRatio ratio={16 / 6}>
                    <img src={resturant.imageUrl} alt="" className="border rounded-md w-full h-full object-cover" />
                </AspectRatio>
                <div>
                    <h3 className="text-2xl tracking-tight w-full h-full group-hover:underline">
                        {resturant.resturantName}
                    </h3>
                    <div id="card-content" className="grid md:grid-cols-2 gap-2">
                        <div className="flex flex-row flex-wrap">
                            {resturant.cusines.map((item, index) => (
                                <span className="flex" key={index}>
                                    <span>{item}</span>
                                    {index < resturant.cusines.length - 1 && <Dot />}
                                </span>
                            ))}
                        </div>
                        <div className="flex gap-2 flex-col">
                            <div className="flex items-center gap-1 text-green-600">
                                <Clock className="text-green-600" />
                                {resturant.estimatedDeliveryTime} mins
                            </div>
                            <div className="flex items-center gap-1">
                                <Banknote />
                                Delivery from ${(resturant.deliveryPrice)}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    )
}

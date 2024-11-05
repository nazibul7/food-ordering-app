import { Link } from "react-router-dom"

type Props = {
    total: number
    city: string
}

export default function SearchResultInfo({ city, total }: Props) {
    return (
        <div className="text-xl font-bold flex flex-col gap-3 justify-between lg:items-center lg:flex-row">
            <span>
                {total} Resturants found in {city}
                <Link to={'/'} className="ml-1 text-sm font-semibold underline cursor-pointer text-blue-500">Change location</Link>
            </span>
            insert sort drop down here
        </div>
    )
}

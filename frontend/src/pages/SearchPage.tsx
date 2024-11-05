import { useSearchResturant } from "@/api/ResturantApi2"
import SearchResultCard from "@/components/SearchResultCard"
import SearchResultInfo from "@/components/SearchResultInfo"

import { useParams } from "react-router-dom"

export default function SearchPage() {
    const { city } = useParams()
    const { results, isLoading } = useSearchResturant(city)
    if (isLoading) {
        return <span>Loading...</span>
    }
    if (!results?.data) {
        return <span>No resturnats found</span>
    }
    return (
        <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5">
            <div id="cusine-list">
                Insert cusine here
            </div>
            <div id="main-content" className="flex flex-col gap-5">
                <SearchResultInfo city={city as string} total={results.pagination.total}/>
                {results.data.map((resturant,index)=>{
                    return <SearchResultCard key={index} resturant={resturant}/>
                })}
            </div>
        </div>
    )
}

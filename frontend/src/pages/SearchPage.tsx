import { useSearchResturant } from "@/api/ResturantApi2"
import SearchBar, { SearchForm } from "@/components/SearchBar"
import SearchResultCard from "@/components/SearchResultCard"
import SearchResultInfo from "@/components/SearchResultInfo"
import { useState } from "react"
import { useParams } from "react-router-dom"

export type SearchState = {
    searchQuery: string
    selectedCusine: string[]
    sortOptions: "bestMatch"
    page: number
}
export default function SearchPage() {
    const { city } = useParams()
    const [searchState, setSearchState] = useState<SearchState>({
        searchQuery: '',
        page: 1,
        selectedCusine: [],
        sortOptions: 'bestMatch'
    })
    const { results, isLoading } = useSearchResturant(searchState,city)

    if (isLoading) {
        return <span>Loading...</span>
    }
    if (!results?.data) {
        return <span>No resturnats found</span>
    }
    const submitSearchQuery = (searcFormData: SearchForm) => {
        setSearchState((prev) => {
            return { ...prev, searchQuery: searcFormData.inputSearchQuery }
        })
    }
    const resetSearch = () => {
        setSearchState((prev) => {
            return { ...prev, searchQuery: '' }
        })
    }
    return (
        <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5">
            <div id="cusine-list">
                Insert cusine here
            </div>
            <div id="main-content" className="flex flex-col gap-5">
                <SearchBar searchQuery={searchState.searchQuery} onReset={resetSearch} onSubmit={submitSearchQuery} placeHolder="Search by cuisine or resturant name" />
                <SearchResultInfo city={city as string} total={results.pagination.total} />
                {results.data.map((resturant, index) => {
                    return <SearchResultCard key={index} resturant={resturant} />
                })}
            </div>
        </div>
    )
}

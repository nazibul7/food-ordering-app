import { useSearchResturant } from "@/api/ResturantApi2"
import CusineFilter from "@/components/CusineFilter"
import PaginationComp from "@/components/PaginationComp"
import SearchBar, { SearchForm } from "@/components/SearchBar"
import SearchResultCard from "@/components/SearchResultCard"
import SearchResultInfo from "@/components/SearchResultInfo"
import SortOptionDropDown from "@/components/SortOptionDropDown"
import { useState } from "react"
import { useParams } from "react-router-dom"

export type SearchState = {
    searchQuery: string
    selectedCusine: string[]
    sortOptions: string
    page: number
}
export default function SearchPage() {
    const { city } = useParams()
    const [isExpande, setIsExpand] = useState(false)
    const [searchState, setSearchState] = useState<SearchState>({
        searchQuery: '',
        page: 1,
        selectedCusine: [],
        sortOptions: 'bestMatch'
    })

    const { results, isLoading } = useSearchResturant(searchState, city)

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
    const setPage = (page: number) => {
        setSearchState((prev) => {
            return { ...prev, page }
        })
    }
    const cusineOnChange = (selectedCusine: string[]) => {
        setSearchState((prev) => {
            return { ...prev, selectedCusine }
        })
    }
    const expandOnChnage = () => {
        setIsExpand(prev => !prev)
    }
    const setSortOptions = (sortOptions: string) => {
        setSearchState((prev) => {
            return { ...prev, sortOptions }
        })
    }
    return (
        <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5">
            <div id="cusine-list">
                <CusineFilter isExpandes={isExpande} onExpandedClick={expandOnChnage} selectedCusine={searchState.selectedCusine} onChange={cusineOnChange} />
            </div>
            <div id="main-content" className="flex flex-col gap-5">
                <SearchBar searchQuery={searchState.searchQuery} onReset={resetSearch} onSubmit={submitSearchQuery} placeHolder="Search by cuisine or resturant name" />
                <div className="flex justify-between flex-col gap-3 lg:flex-row">
                    <SearchResultInfo city={city as string} total={results.pagination.total} />
                    <SortOptionDropDown sortOption={searchState.sortOptions} onChnage={setSortOptions} />
                </div>
                {results.data.map((resturant, index) => {
                    return <SearchResultCard key={index} resturant={resturant} />
                })}
                <PaginationComp onPageChange={setPage} page={results.pagination.page} pages={results.pagination.pages} />
            </div>
        </div>
    )
}

import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "./ui/pagination"

type Props = {
    page: number
    pages: number
    onPageChange: (page: number) => void
}

export default function PaginationComp({ page, pages, onPageChange }: Props) {
    const pageNumners = []
    for (let i = 1; i <= pages; i++) {
        pageNumners.push(i)
    }
    return (
        <Pagination>
            <PaginationContent>
                {page > 1 && (
                    <PaginationItem>
                        <PaginationPrevious href="#" onClick={() => onPageChange(page - 1)} />
                    </PaginationItem>
                )}
                {pageNumners.map((number, index) => {
                    return <PaginationItem key={index}>
                        <PaginationLink href="#" onClick={() => onPageChange(number)} isActive={page == number}>
                            {number}
                        </PaginationLink>
                    </PaginationItem>
                })}
                {page != pageNumners.length && (
                    <PaginationItem>
                        <PaginationNext href="#" onClick={() => onPageChange(page + 1)} />
                    </PaginationItem>
                )}
            </PaginationContent>
        </Pagination >
    )
}

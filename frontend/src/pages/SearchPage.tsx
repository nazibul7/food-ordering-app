import { useParams } from "react-router-dom"

export default function SearchPage() {
    const { city } = useParams()
    return (
        <span>User searched for {city}</span>
    )
}

import { zodResolver } from "@hookform/resolvers/zod"
import { Search } from "lucide-react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Form, FormControl, FormField, FormItem } from "./ui/form"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { useEffect } from "react"

const formSchema = z.object({
    inputSearchQuery: z.string().trim().min(1, "Name is required")
})
export type SearchForm = z.infer<typeof formSchema>
type Props = {
    onSubmit: (formData: SearchForm) => void
    placeHolder: string
    onReset?: () => void
    searchQuery?: string
}

export default function SearchBar({ onSubmit, placeHolder, onReset, searchQuery }: Props) {
    const form = useForm<SearchForm>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            inputSearchQuery: ''
        }
    })

    const handleReset = () => {
        form.reset({
            inputSearchQuery: ""
        })
        if (onReset) {
            onReset()
        }
    }
    useEffect(() => {
        form.reset({
            inputSearchQuery: searchQuery
        })
    }, [searchQuery, form])
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className={`flex items-center gap-3 border-2 rounded-full p-3 ${form.formState.errors.inputSearchQuery && 'border-red-500'}`}>
                <div className="flex items-center flex-1">
                    <Search strokeWidth={2.5} size={30} className="ml-1 text-orange-500 hidden md:block" />
                    <FormField control={form.control} name="inputSearchQuery" render={({ field }) => {
                        return <FormItem className="flex-1">
                            <FormControl>
                                <Input {...field} placeholder={placeHolder} className="bg-none border-none shadow-none focus-visible:ring-0" />
                            </FormControl>
                        </FormItem>
                    }} />
                </div>
                <div className="flex gap-1">
                    {(form.formState.isDirty || searchQuery) && <Button onClick={handleReset} type="button" variant="outline" className="rounded-full">Clear</Button>}
                    <Button type="submit" className="rounded-full bg-orange-500">Search</Button>
                </div>
            </form>
        </Form>
    )
}

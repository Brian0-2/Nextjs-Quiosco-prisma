"use client"
import { SearchSchema } from "@/src/schema"
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export default function ProductSearchForm() {
    const router = useRouter()

    const handleSearchForm = (FormData: FormData) => {
        const data = {
            search: FormData.get('search')
        }

        const result = SearchSchema.safeParse(data);
        if(!result.success){
            result.error.issues.forEach(issu => {
                toast.error(issu.message)
            })

            return;
        }

        router.push(`/admin/products/search?search=${result.data.search}`)

    }   


  return (
    <form
        action={handleSearchForm} 
        className="flex items-center"
    >
        <input 
            type="text" 
            placeholder="Buscar Producto"
            className="p-2 placeholder-gray-400 w-full"
            name="search"
        />
        <input 
            type="submit" 
            value="Buscar"
            className="bg-indigo-600 p-2 uppercase text-white cursor-pointer"
        />
    </form>
  )
}

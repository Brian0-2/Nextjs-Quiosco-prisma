import ProductSearchForm from "@/components/products/ProductSearchForm";
import ProductTable from "@/components/products/ProductsTable";
import Heading from "@/components/ui/Heading";
import { prisma } from "@/src/lib/prisma";

async function searchProducts(searchTem : string) {
    const products = await prisma.product.findMany({
      where: {
        name: {
          contains: searchTem,
          mode: 'insensitive'
        }
      },
      include: {
        category: true
      }
    })
    return products
}

export default async function SearchPage({searchParams}: {searchParams: {search: string}}) {

  const products = await searchProducts(searchParams.search);
  return (
    <>
        <Heading>Resultados de busqueda: {searchParams.search}</Heading>
        <div className=" flex flex-col gap-5 lg:flex-row lg:justify-end">
              <ProductSearchForm />
        </div>

        {products.length ? (
          <ProductTable 
            products={products}
          />
          ) : (
          <p className="text-center text-lg">No hay Resultados...</p>
        )}

    </>
  )
}

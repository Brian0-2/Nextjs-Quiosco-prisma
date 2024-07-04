import ProductCard from "@/components/products/ProductCard"
import Heading from "@/components/ui/Heading";
import { prisma} from "@/src/lib/prisma"

async function getProducts(category: string){
  const products = await prisma.product.findMany({
    where: {
      category: {
        slug : category
      }
    }
  });

  return products;
}

//Params es accesible cuando se utiliza en los siguientes archivos
/** 
 * layout.tsx
 * page.tsx
 * route.tsx
 * generateMetadata
 * 
*/
export default async function OrderPage({params}: { params : {category : string}}) {
  const products = await getProducts(params.category);

  return (
    <>
    
    <Heading >Elige y personaliza tu pedido a continuación</Heading>

    <div className="grid grid-cols-1  xl:grid-cols-2 2xl:grid-cols-4 gap-4 items-center">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
        />
      ))}
    </div>
    </>
  )
}

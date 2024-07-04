"use server"

import { prisma } from "@/src/lib/prisma";
import { ProductSchema } from "@/src/schema";
import { revalidatePath } from "next/cache";

export async function updateProduct(data: unknown, id: number){
    const result = ProductSchema.safeParse(data);

    if(!result.success){
        return {
            errors: result.error.issues
        }
    }

    await prisma.product.update({
        where: {
            id
        },
        data: result.data
    });
      //revalidar la ruta para recargar los datos al cliente, 
      // esto solo aplica en la pantalla que se trabaja no en todo el sistema como un socket
    revalidatePath('/admin/products')
}
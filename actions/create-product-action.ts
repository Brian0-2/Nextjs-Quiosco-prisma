"use server"

import { prisma } from "@/src/lib/prisma";
import { ProductSchema } from "@/src/schema"

export async function createProduct(data: unknown) {
    const result = ProductSchema.safeParse(data);

    if(!result.success){
        return {
            errors: result.error.issues
        }
    }

    await prisma.product.create({
        data: result.data
    });
}
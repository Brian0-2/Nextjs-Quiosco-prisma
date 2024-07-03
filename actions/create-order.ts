"use server"

import { prisma } from "@/src/lib/prisma";
import { OrderSchema } from "@/src/schema"
import { error } from "console";


export async function createOrder(data : unknown){
    const result = OrderSchema.safeParse(data);

    if(!result.success){
        return {
            errors: result.error.issues
        }
    }

    try {
        await prisma.order.create({
            data: {
                name: result.data.name,
                total: result.data.total,
                orderProducts: {
                    create: result.data.order.map(product => ({
                        productId: product.id,
                        quantity: product.quantity
                    }))
                }
            }
        })
    } catch (error) {
        
    }
}
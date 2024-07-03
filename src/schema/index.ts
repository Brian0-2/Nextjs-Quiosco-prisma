import {z} from 'zod'

export const OrderSchema = z.object({
    name: z.string()
            .min(1, 'Tu nombre es Obligatorio'),
    total: z.number()
            .min(1, 'Hay errores en la Orden'),
    order: z.array(z.object({
        id: z.number(),
        name: z.string(),
        price: z.number(),
        quantity: z.number(),
        subtotal: z.number()
    }))
})
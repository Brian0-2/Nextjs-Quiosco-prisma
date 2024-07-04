"use server";
import { revalidatePath } from "next/cache";
import { prisma } from "@/src/lib/prisma";
import { OrderIdSchema } from "@/src/schema";

export async function completeOrder(formData: FormData) {
  const data = {
    orderId: formData.get("order_id")!,
  };

  const result = OrderIdSchema.safeParse(data);
  if (result.success) {
    try {
      await prisma.order.update({
        where: {
          id: result.data.orderId,
        },
        data: {
          status: true,
          orderReadyAt: new Date(Date.now()),
        },
      });
      //revalidar la ruta para recargar los datos al cliente, 
      // esto solo aplica en la pantalla que se trabaja no en todo el sistema como un socket
      revalidatePath('/admin/orders')
    } catch (error) {
      console.log(error);
    }
  }
}

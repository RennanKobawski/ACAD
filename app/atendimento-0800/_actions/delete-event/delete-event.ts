'use server'
import { revalidatePath } from "next/cache";
import prisma from "@/app/_lib/prisma";
import { DeleteEventSchema } from "./schema";

export const deleteEvent = async ({ eventId }: DeleteEventSchema) => {

  await prisma.event.delete({
    where: {
      id: eventId,
    },
  });

  const month = new Date().getMonth() + 1;  
  const day = new Date().getDate();
  const path = `/atendimento-0800/${month}/${day}`;

  revalidatePath(path);
};
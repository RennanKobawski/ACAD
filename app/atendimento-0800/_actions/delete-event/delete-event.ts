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

  revalidatePath(`/atendimento-0800`);
};
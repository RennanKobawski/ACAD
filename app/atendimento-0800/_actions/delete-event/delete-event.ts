"use server";

import  prisma  from "@/app/_lib/prisma";
import { revalidatePath } from "next/cache";
import { DeleteEventSchema } from "./schema";

export const deleteEvent = async ({
  eventId,
}: DeleteEventSchema) => {
  await prisma.event.delete({
    where: {
      id: eventId,
    },
  });
  revalidatePath("/atendimento");
  revalidatePath("/");
};
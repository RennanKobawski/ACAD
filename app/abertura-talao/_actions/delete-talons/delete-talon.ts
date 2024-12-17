'use server'
import { revalidatePath } from "next/cache";
import prisma from "@/app/_lib/prisma";
import { DeleteTalonSchema } from "./schema";

export const deleteTalon = async ({ talonId }: DeleteTalonSchema) => {

  await prisma.talon.delete({
    where: {
      id: talonId,
    },
  });

  const now = new Date();
  const month = now.getMonth() + 1;
  const day = now.getDate();
  const pathsToRevalidate = [
    `/abertura-talao/${month}/${day}`,
    `/abertura-talao/${month}`,
  ];
  
  pathsToRevalidate.forEach((path) => revalidatePath(path));
};
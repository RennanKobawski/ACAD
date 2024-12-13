"use server";

import prisma from '@/app/_lib/prisma'
import { getSession } from "next-auth/react";
import { revalidatePath } from "next/cache";
import { upsertEventSchema } from "./schema";

interface UpsertEventParams {
  id?: number;
  address: string;
  occasion: string;
  vtr: number;
  startTime: Date;
  activationTime: Date;
  arrivalTime: Date;
  endTime: Date;
  note: string;
  userId: string;
}

export const upsertEvent = async (params: UpsertEventParams) => {
  upsertEventSchema.parse(params);

  const session = await getSession();
  if (!session) {
    throw new Error("Unauthorized");
  }

  const {
    id,
    address,
    occasion,
    startTime,
    vtr,
    activationTime,
    endTime,
    arrivalTime,
    note,
    userId,
  } = params;

  await prisma.event.upsert({
    update: {
      address,
      occasion,
      startTime,
      vtr,
      activationTime,
      endTime,
      arrivalTime,
      note,
      userId,
    },
    create: {
      address,
      occasion,
      startTime,
      vtr,
      activationTime,
      endTime,
      arrivalTime,
      note,
      userId,
    },
    where: {
      id: id ?? 0,
    },
  });

  revalidatePath("/atendimento-0800");
};

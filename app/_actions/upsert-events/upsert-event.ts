"use server";

import prisma from "@/app/_lib/prisma";
import { getServerSession } from "next-auth/next";
import { revalidatePath } from "next/cache";
import { upsertEventSchema } from "./schema";
import { authOptions } from "@/app/_lib/auth";

interface UpsertEventParams {
  id?: number;
  address: string;
  occasion: string;
  vtr: string;
  startTime: Date;
  activationTime?: Date;
  arrivalTime?: Date;
  endTime?: Date;
  note: string;
}

export const upsertEvent = async (params: UpsertEventParams) => {
  upsertEventSchema.parse(params);

  const session = await getServerSession(authOptions);

  if (!session || !session.user || !session.user.id) {
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
  } = params;

  const userId = session.user.id;

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

  const currentDate = new Date();
  const currentMonth = currentDate.getMonth() + 1;
  const currentDay = currentDate.getDate();


  revalidatePath(`/atendimento-0800?month=${currentMonth < 10 ? `0${currentMonth}` : currentMonth}&day=${currentDay < 10 ? `0${currentDay}` : currentDay}`);
};

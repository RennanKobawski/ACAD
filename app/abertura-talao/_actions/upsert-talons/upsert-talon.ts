"use server";

import prisma from "@/app/_lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/_lib/auth";
import { revalidatePath } from "next/cache";

interface UpsertTalonParams {
  id?: number;
  ht: number;
  vtr: string;
  responsible: string;
  startHour: Date;
  endHour?: Date; 
  startKm: number;
  endKm?: number;
  percKm?: number;
  startQar1?: Date;
  endQar1?: Date;
  startQar2?: Date;
  endQar2?: Date;
  note: string;
}

export const upsertTalon = async (params: UpsertTalonParams) => {
  const session = await getServerSession(authOptions);

  if (!session || !session.user || !session.user.id) {
    throw new Error("Unauthorized");
  }

  const userId = session.user.id;

  const {
    id,
    ht,
    vtr,
    responsible,
    startHour,
    endHour,
    startKm,
    endKm,
    percKm,
    startQar1,
    endQar1,
    startQar2,
    endQar2,
    note,
  } = params;

  const now = new Date();
  const startOfDay = new Date(now.setHours(0, 0, 0, 0));
  const endOfDay = new Date(now.setHours(23, 59, 59, 999));

  const count = await prisma.talon.count({
    where: {
      userId,
      createdAt: {
        gte: startOfDay,
        lt: endOfDay,
      },
    },
  });

  const dailyIndex = count + 1;

  await prisma.talon.upsert({
    where: { id: id },
    update: {
      ht,
      vtr,
      responsible,
      startHour,
      endHour,
      startKm,
      endKm,
      percKm,
      startQar1,
      endQar1,
      startQar2,
      endQar2,
      note,
      updatedAt: new Date(),
    },
    create: {
      ht,
      vtr,
      responsible,
      startHour,
      endHour,
      startKm,
      endKm,
      percKm,
      startQar1,
      endQar1,
      startQar2,
      endQar2,
      note,
      userId,
      dailyIndex,
    },
  });

  const month = now.getMonth() + 1;
  const day = now.getDate();
  const pathsToRevalidate = [
    `/abertura-talao/${month}/${day}`,
    `/abertura-talao/${month}`,
  ];
  
  pathsToRevalidate.forEach((path) => revalidatePath(path));
};

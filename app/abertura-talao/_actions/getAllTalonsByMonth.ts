"use server";

import prisma from "@/app/_lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/_lib/auth"; 

export const getAllTalonsByMonth = async () => {
  const session = await getServerSession(authOptions);
  
  if (!session || !session.user || !session.user.id) {
    throw new Error("Usuário não autenticado");
  }

  const userId = session.user.id;

  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const startOfNextMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1);

  const talons = await prisma.talon.findMany({
    where: {
      createdAt: {
        gte: startOfMonth,
        lt: startOfNextMonth,
      },
      userId: userId,
    },
    orderBy: {
      createdAt: "asc",
    },
  });

  console.log("Talons retornados:", talons);
  
  return talons;
};

"use server";

import prisma from "@/app/_lib/prisma";

export const getAllTalonsByMonth = async () => {
  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const startOfNextMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1);

  const talons = await prisma.talon.findMany({
    where: {
      createdAt: {
        gte: startOfMonth,
        lt: startOfNextMonth,
      },
    },
    orderBy: {
      createdAt: "asc",
    },
  });

  return talons;
};

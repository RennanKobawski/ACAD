"use server";

import prisma from "@/app/_lib/prisma";

export const getAllTalonsByCurrentDate = async () => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const talons = await prisma.talon.findMany({
    where: {
      OR: [
        {
          createdAt: {
            gte: today,
            lt: tomorrow,
          },
        },
        {
          startHour: {
            lt: tomorrow,
          },
          createdAt: {
            lt: tomorrow,
          },
        },
      ],
    },
    orderBy: {
      createdAt: "asc",
    },
  });

  return talons;
};

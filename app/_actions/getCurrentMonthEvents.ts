import { endOfMonth, startOfMonth } from "date-fns";
import { getSession } from "next-auth/react"; 
import { NextApiRequest } from "next"; 
import prisma from '@/app/_lib/prisma';

export const getCurrentMonthEvents = async (context: { req: NextApiRequest }) => {
  const session = await getSession({ req: context.req });

  if (!session) {
    return;
  }

  const userId = session.user.id;

  return prisma.event.count({
    where: {
      userId,
      createdAt: {
        gte: startOfMonth(new Date()),
        lt: endOfMonth(new Date()),
      },
    },
  });
};

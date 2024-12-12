import { endOfMonth, startOfMonth } from "date-fns";
import { getSession } from "next-auth/react"; 
import prisma from '../../_lib/prisma';

export const getCurrentMonthEvents = async (context: any) => {
  const session = await getSession({ req: context.req });

  if (!session) {
    return ;
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

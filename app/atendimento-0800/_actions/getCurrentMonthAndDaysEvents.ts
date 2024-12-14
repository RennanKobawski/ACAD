import { endOfMonth, startOfMonth, startOfDay, endOfDay } from "date-fns";
import { getSession } from "next-auth/react"; 
import { NextApiRequest } from "next"; 
import prisma from '../../_lib/prisma';

export const getCurrentMonthAndDayEvents = async (context: { req: NextApiRequest }) => {
  const session = await getSession({ req: context.req });

  if (!session) {
    return [];
  }

  const userId = session.user.id;

  const currentDate = new Date();

  const events = await prisma.event.findMany({
    where: {
      userId,
      OR: [
        {
          createdAt: {
            gte: startOfMonth(currentDate), 
            lt: endOfMonth(currentDate),     
          },
        },
        {
          createdAt: {
            gte: startOfDay(currentDate),    
            lt: endOfDay(currentDate),       
          },
        },
      ],
    },
  });

  return events;
};

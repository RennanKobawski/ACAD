"use server"
import prisma from '../_lib/prisma'

export const getEvents = async (userId : string) => {

    const events = await prisma.event.findMany({
        where: {
            userId,
        },
        orderBy: {
            startTime: 'desc',
        },
    });

    return events;
}

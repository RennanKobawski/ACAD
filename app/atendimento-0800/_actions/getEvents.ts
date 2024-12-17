"use server"
import prisma from '@/app/_lib/prisma';

export const getEvents = async () => {

    const events = await prisma.event.findMany({
        orderBy: {
            startTime: 'desc',
        },
    });

    return events;
}

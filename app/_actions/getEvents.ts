"use server"
import { revalidatePath } from 'next/cache';
import prisma from '../_lib/prisma'

export const getEvents = async () => {

    const events = await prisma.event.findMany({
        orderBy: {
            startTime: 'asc',
        },
    });

    return events;
}

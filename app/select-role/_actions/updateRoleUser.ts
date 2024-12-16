'use server';
import { Role } from '@prisma/client';
import prisma from '@/app/_lib/prisma';

export const updateRole = async (userId: string, role: Role) => {
  const updatedUser = await prisma.user.update({
    where: { id: userId },
    data: { role },
  });

  return updatedUser;
};

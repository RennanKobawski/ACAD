'use server';
import { Role } from '@prisma/client';
import prisma from '../_lib/prisma';

export const updateRole = async (userId: string, role: Role) => {
  const existingUser = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (existingUser?.role === role) {
    throw new Error("A nova role é igual à atual.");
  }

  const updatedUser = await prisma.user.update({
    where: { id: userId },
    data: { role },
  });

  return updatedUser;
};

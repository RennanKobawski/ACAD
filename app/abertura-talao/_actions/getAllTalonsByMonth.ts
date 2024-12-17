"use server";

import prisma from "@/app/_lib/prisma";
import { getServerSession } from "next-auth";
<<<<<<< HEAD
import { authOptions } from "@/app/_lib/auth"; 

export const getAllTalonsByMonth = async () => {
  const session = await getServerSession(authOptions);
  
=======
import { authOptions } from "@/app/_lib/auth"; // Caminho do arquivo de configuração do NextAuth

export const getAllTalonsByMonth = async () => {
  // Obter sessão do usuário
  const session = await getServerSession(authOptions);

  // Verificar se o usuário está autenticado
>>>>>>> 3df5ca7a9ef20dc5513082741e2089feb50c21c7
  if (!session || !session.user || !session.user.id) {
    throw new Error("Usuário não autenticado");
  }

  const userId = session.user.id;

  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const startOfNextMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1);

  // Buscar os talons apenas do usuário logado
  const talons = await prisma.talon.findMany({
    where: {
      createdAt: {
        gte: startOfMonth,
        lt: startOfNextMonth,
      },
      userId: userId,
    },
    orderBy: {
      createdAt: "asc",
    },
  });

  return talons;
};

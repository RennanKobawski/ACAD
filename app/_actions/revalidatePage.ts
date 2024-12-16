'use server';

import { revalidatePath } from "next/cache";

export const revalidatePage = async (path: string) => {
  try {
    await revalidatePath(path);
  } catch (error) {
    console.error("Erro ao revalidar caminho:", error);
  }
};

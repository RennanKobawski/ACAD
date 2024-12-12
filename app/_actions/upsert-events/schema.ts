import { z } from "zod";

export const upsertEventSchema = z.object({
  name: z.string().trim().min(1, { message: "O nome é obrigatório." }),
  address: z.string().min(1, { message: "O endereço é obrigatório." }),
  occasion: z.string().min(1, { message: "A ocasião é obrigatória." }),
  startTime: z.date(),
  vtr: z.number().int().positive(),
  activationTime: z.date(),
  endTime: z.date(),
  arrivalTime: z.number().int().positive(),
  note: z.string().optional(),
});

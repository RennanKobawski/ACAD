import { z } from "zod";

export const upsertEventSchema = z.object({
  address: z.string().min(1, { message: "O endereço é obrigatório." }),
  occasion: z.string().min(1, { message: "A ocasião é obrigatória." }),
  startTime: z.date(),
  vtr: z.string(),
  activationTime: z.date().optional(),
  endTime: z.date().optional(),
  arrivalTime: z.date().optional(),
  note: z.string().optional(),
});

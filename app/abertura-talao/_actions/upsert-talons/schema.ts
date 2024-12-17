import { z } from "zod";

export const upsertTalonSchema = z.object({
  ht: z.number().int().positive({ message: "HT é obrigatório."}),
  vtr: z.string({ message: "A VTR é obrigatória." }),
  responsible: z.string().min(1, { message: "Campo obrigatório." }),
  startHour: z.date({ message: "A HI é obrigatória." }),
  endHour: z.date().optional(),
  startKm: z.number().int().positive({ message: "Campo obrigatório." }),
  endKm: z.number().int().optional(),
  percKm: z.number().int().optional(),
  startQar1: z.date().optional(),
  endQar1: z.date().optional(),
  startQar2: z.date().optional(),
  endQar2: z.date().optional(),
  note: z.string({message: "A observação é obrigatória.",}),
});

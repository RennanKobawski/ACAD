import { z } from "zod";

export const deleteTalonSchema = z.object({
  talonId: z.number(),
});

export type DeleteTalonSchema = z.infer<typeof deleteTalonSchema>;

import { z } from "zod";

export const deleteEventSchema = z.object({
  eventId: z.number(),
});

export type DeleteEventSchema = z.infer<typeof deleteEventSchema>;
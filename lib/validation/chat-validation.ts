import * as z from "zod";

export const chatSchema = z.object({
  content: z.string().min(1),
});

export type ChatValue = z.infer<typeof chatSchema>;

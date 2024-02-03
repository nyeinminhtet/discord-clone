import * as z from "zod";

export const chatSchema = z.object({
  content: z.string().min(1),
});

export type ChatValue = z.infer<typeof chatSchema>;

export const messageFileSchema = z.object({
  fileUrl: z.string().min(1, {
    message: "Attachment is required",
  }),
});

export type MessageFile = z.infer<typeof messageFileSchema>;

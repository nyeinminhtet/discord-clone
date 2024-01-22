import { ChannelType } from "@prisma/client";
import { z } from "zod";

export const formSchema = z.object({
  name: z.string().min(3, { message: "Server name is required." }),
  imageUrl: z.string().min(1, { message: "Server image is required." }),
});

export const channelSchema = z.object({
  name: z
    .string()
    .min(4, { message: "Channel Name is required." })
    .refine((name) => name !== "general", {
      message: "Channel cann't be 'general!",
    }),
  type: z.nativeEnum(ChannelType),
});

export type ChannelValues = z.infer<typeof channelSchema>;
export type FormValues = z.infer<typeof formSchema>;

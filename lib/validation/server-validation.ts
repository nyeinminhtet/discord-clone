import { z } from "zod";

export const formSchema = z.object({
  name: z.string().min(3, { message: "Server name is required." }),
  imageUrl: z.string().min(1, { message: "Server image is required." }),
});

export type FormValues = z.infer<typeof formSchema>;

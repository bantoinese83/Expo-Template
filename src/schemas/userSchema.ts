import { z } from "zod";

export const userProfileSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  bio: z.string().max(160, "Bio must be less than 160 characters").optional(),
  website: z.string().url("Invalid URL").optional().or(z.literal("")),
});

export type UserProfileFormValues = z.infer<typeof userProfileSchema>;

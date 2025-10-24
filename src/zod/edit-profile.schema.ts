import z from "zod";

export const EditProfileSchema = z.object({
  username: z.string().optional().or(z.literal("")),
  email: z.email().optional().or(z.literal("")),
  userImg: z
    .instanceof(File, { error: "Please upload a valid image" })
    .optional()
    .refine((file) => !file || file.size <= 5 * 1024 * 1024, "Image must be less than 5MB")
    .refine((file) => !file || ["image/jpeg", "image/png"].includes(file.type), "Only JPEG and PNG images are allowed"),
  plant_care_skill_level: z.enum(["beginner", "intermediate", "advanced", "Demeter"]).optional(),
  password: z.string(),
});

export type EditProfileFormValues = z.infer<typeof EditProfileSchema>;

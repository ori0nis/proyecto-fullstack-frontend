import z from "zod";

export const EditProfileSchema = z.object({
  username: z.string().optional().or(z.literal("")),
  email: z.email().optional().or(z.literal("")),
  profilePic: z
    .instanceof(File)
    .optional()
    .refine((file) => !file || file.size <= 5 * 1024 * 1024, "Image must be less than 5MB")
    .refine((file) => !file || ["image/jpeg", "image/png"].includes(file.type), "Only JPEG and PNG images are allowed"),
  plant_care_skill_level: z
    .string()
    .refine((val) => ["beginner", "intermediate", "advanced", "Demeter"].includes(val), {
      message: "beginner, intermediate, advanced",
    })
    .optional(),
  profile_bio: z.string().max(60).optional(),
  password: z.string(),
});

export type EditProfileFormValues = z.infer<typeof EditProfileSchema>;

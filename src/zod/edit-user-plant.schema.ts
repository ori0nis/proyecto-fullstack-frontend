import z from "zod";

export const EditUserPlantSchema = z.object({
  nameByUser: z.string().optional(),
  plantImg: z
    .instanceof(File, { error: "Please upload a valid image" })
    .optional()
    .refine((file) => !file || file.size <= 5 * 1024 * 1024, "Image must be less than 5MB")
    .refine((file) => !file || ["image/jpeg", "image/png"].includes(file.type), "Only JPEG and PNG images are allowed").optional(),
});

export type EditUserPlantFormValues = z.infer<typeof EditUserPlantSchema>;

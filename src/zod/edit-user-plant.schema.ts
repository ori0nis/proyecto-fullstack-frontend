import z from "zod";

export const EditUserPlantSchema = z.object({
  nameByUser: z.string().max(12, "Name is too long").optional(),
  plantImg: z
    .instanceof(File)
    .refine((file) => file.size <= 5 * 1024 * 1024, "Image must be less than 5MB")
    .refine((file) => ["image/jpeg", "image/png"].includes(file.type), "Only JPEG and PNG images are allowed")
    .optional(),
});

export type EditUserPlantFormValues = z.infer<typeof EditUserPlantSchema>;

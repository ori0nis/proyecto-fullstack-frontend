import z from "zod";

export const AddUserPlantSchema = z.object({
  nameByUser: z.string().min(1, "Please provide a name").max(12, "Name is too long"),
  plantImg: z
    .instanceof(File)
    .refine((file) => file.size <= 5 * 1024 * 1024, "Image must be less than 5MB")
    .refine((file) => ["image/jpeg", "image/png"].includes(file.type), "Only JPEG and PNG images are allowed")
    .optional(),
});

export type AddUserPlantFormValues = z.infer<typeof AddUserPlantSchema>;

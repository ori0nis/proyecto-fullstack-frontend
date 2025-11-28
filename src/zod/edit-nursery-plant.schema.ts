import z from "zod";

export const EditNurseryPlantSchema = z.object({
  scientific_name: z.string().optional(),
  common_name: z.string().optional(),
  type: z.string().refine((val) => ["tropical", "desert", "temperate", "alpine", "aquatic"].includes(val), {
    message: "tropical, desert, temperate, alpine, aquatic",
  }),
  plantImg: z
    .instanceof(File)
    .optional()
    .refine((file) => !file || file.size <= 5 * 1024 * 1024, "Image must be less than 5MB")
    .refine((file) => !file || ["image/jpeg", "image/png"].includes(file.type), "Only JPEG and PNG images are allowed")
    .optional(),
});

export type EditNurseryPlantFormValues = z.infer<typeof EditNurseryPlantSchema>;

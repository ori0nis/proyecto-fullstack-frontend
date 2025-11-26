import z from "zod";

export const NewNurseryPlantSchema = z.object({
  scientific_name: z.string().min(5, "Please provide a name"),
  common_name: z.string().min(5, "Please provide a name"),
  type: z
    .string()
    .refine((val) => ["tropical", "desert", "temperate", "alpine", "aquatic"].includes(val), {
      message: "tropical, desert, temperate, alpine, aquatic",
    }),
  plantImg: z
    .instanceof(File)
    .refine((file) => file.size <= 5 * 1024 * 1024, "Image must be less than 5MB")
    .refine((file) => ["image/jpeg", "image/png"].includes(file.type), "Only JPEG and PNG images are allowed"),
});

export type NewNurseryPlantFormValues = z.infer<typeof NewNurseryPlantSchema>;

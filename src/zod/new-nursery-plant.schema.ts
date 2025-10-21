import z from "zod";

export const NewNurseryPlantSchema = z.object({
  scientific_name: z.string(),
  common_name: z.string(),
  type: z.enum(["tropical", "desert", "temperate", "alpine", "aquatic"]),
  plantImg: z.instanceof(File, { error: "Please upload a valid image" }),
});

export type NewNurseryPlantFormValues = z.infer<typeof NewNurseryPlantSchema>;

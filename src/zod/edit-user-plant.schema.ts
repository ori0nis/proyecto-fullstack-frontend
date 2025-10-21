import z from "zod";

export const EditUserPlantSchema = z.object({
  nameByUser: z.string(),
  plantImg: z.instanceof(File, { error: "Please upload a valid image" }),
});

export type EditUserPlantFormValues = z.infer<typeof EditUserPlantSchema>;

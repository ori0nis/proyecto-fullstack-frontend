import z from "zod";

export const DeleteAccountSchema = z
  .object({
    password: z.string(),
    confirm_password: z.string(),
  })
  .refine((data) => data.password === data.confirm_password, {
    error: "Passwords do not match",
    path: ["confirm_password"],
  });

export type DeleteAccountFormValues = z.infer<typeof DeleteAccountSchema>;

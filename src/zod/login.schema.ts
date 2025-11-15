import z from "zod";

export const LoginSchema = z.object({
  email: z.email("Insert a valid email"),
  password: z.string().min(4, "Password is required"),
});

export type LoginFormValues = z.infer<typeof LoginSchema>;

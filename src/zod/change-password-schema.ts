import z from "zod";

const lowSecurityPassword: string[] = ["123", "abc", "qwerty", "password", "admin", "user", "login"];

export const ChangePasswordSchema = z
  .object({
    old_password: z.string().or(z.literal("")),
    new_password: z
      .string()
      .min(8, "")
      .max(80, "")
      .refine((val) => /^(?!\s)(?!.*\s$).*$/.test(val), { error: "" })
      .refine((val) => /[a-z]/.test(val), { error: "" })
      .refine((val) => /[A-Z]/.test(val), { error: "" })
      .refine((val) => /\d/.test(val), { error: "" })
      .refine((val) => /[!@#$%^&*()_+\-=[\]{}|;:,.<>?]/.test(val), { error: "" })
      .refine((val) => (!lowSecurityPassword.includes(val) ? { error: "" } : ""))
      .or(z.literal("")),
    confirm_password: z.string().or(z.literal("")),
  })
  .refine((data) => data.old_password === data.confirm_password, {
    error: "Passwords do not match",
    path: ["confirm_password"],
  });

export type ChangePasswordFormValues = z.infer<typeof ChangePasswordSchema>;

//? Error messages are empty because they will be shown not through zod, but through PasswordChecklist

import z from "zod";

const lowSecurityPassword: string[] = ["123", "abc", "qwerty", "password", "admin", "user", "login"];

export const RegisterSchema = z
  .object({
    username: z.string().min(2, "At least 2 characters long").max(40, "Username is too long"),
    email: z.email("Invalid email").max(80),
    plant_care_skill_level: z
      .string()
      .refine((val) => ["beginner", "intermediate", "advanced", "Demeter"].includes(val), {
        message: "beginner, intermediate, advanced",
      }),
    password: z
      .string()
      .min(8, "")
      .max(80, "")
      .refine((val) => /^(?!\s)(?!.*\s$).*$/.test(val), { error: "" })
      .refine((val) => /[a-z]/.test(val), { error: "" })
      .refine((val) => /[A-Z]/.test(val), { error: "" })
      .refine((val) => /\d/.test(val), { error: "" })
      .refine((val) => /[!@#$%^&*()_+\-=[\]{}|;:,.<>?]/.test(val), { error: "" })
      .refine((val) => (!lowSecurityPassword.includes(val) ? { error: "" } : "")),
    confirm_password: z.string(),
  })
  .refine((data) => data.password === data.confirm_password, {
    error: "Passwords do not match",
    path: ["confirm_password"],
  });

export type RegisterFormValues = z.infer<typeof RegisterSchema>;

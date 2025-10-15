import { useForm } from "react-hook-form";
import { Input } from "../input";
import { RegisterSchema, type RegisterFormValues } from "../../zod";
import { zodResolver } from "@hookform/resolvers/zod";

export const RegisterForm = () => {
  const {
    control,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(RegisterSchema),
    mode: "onChange",
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirm_password: "",
      plant_care_skill_level: undefined,
    },
  });

  return (
    <>
      <div>
        <h1>Register</h1>
        <Input
          label="Username"
          name="username"
          control={control}
          type="text"
          placeholder="Username..."
          error={errors.username}
        />
        <Input label="Email" name="email" control={control} type="email" placeholder="Email..." error={errors.email} />
        <Input
          label="Password"
          name="password"
          control={control}
          type="text"
          placeholder="Password..."
          error={errors.password}
        />
        <Input
          label="Plant care skill level"
          name="plant_care_skill_level"
          control={control}
          type="text"
          placeholder="Plant care skill level..."
          error={errors.plant_care_skill_level}
        />
      </div>
    </>
  );
};

import { useForm } from "react-hook-form";
import { InputRegister } from ".";
import { RegisterSchema, type RegisterFormValues } from "../../zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PasswordChecklist } from ".";
import { useAuth } from "../../context";

type FormValues = {
  username: string;
  email: string;
  password: string;
  plant_care_skill_level: string;
};

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

  const { register, error, setError } = useAuth();
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [password, confirm_password] = watch(["password", "confirm_password"]);
  const [showPasswordChecklist, setShowPasswordChecklist] = useState<boolean>(true);
  const navigate = useNavigate();

  const passwordsMatch = password === confirm_password;

  const onSubmit = async (data: FormValues) => {
    setLoading(true);

    try {
      const success = await register(data);

      if (success) {
        setSuccess(true);
        reset();
        navigate("/login");
      } else {
        setSuccess(false);
      }
    } catch (error: unknown) {
      console.error(error);
      alert("Register couldn't be completed");
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Error registering user");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div>
        <h1>Register</h1>
        <form action="post" onSubmit={handleSubmit(onSubmit)} className="">
          <InputRegister
            label="Username: "
            name="username"
            control={control}
            type="text"
            placeholder="Username..."
            error={errors.username}
          />
          <InputRegister
            label="Email: "
            name="email"
            control={control}
            type="email"
            placeholder="Email..."
            error={errors.email}
          />
          <InputRegister
            label="Password: "
            name="password"
            control={control}
            type="password"
            placeholder="Password..."
            error={errors.password}
            onFocus={() => setShowPasswordChecklist(true)}
            onBlur={() => setShowPasswordChecklist(false)}
          />
          {password && showPasswordChecklist && <PasswordChecklist password={password} />}
          <InputRegister
            label="Confirm password: "
            name="confirm_password"
            control={control}
            type="password"
            placeholder="Confirm password..."
            error={errors.confirm_password}
          />
          {password && passwordsMatch && <p>✓ Password is safe</p>}
          <InputRegister
            label="Plant care skill level: "
            name="plant_care_skill_level"
            control={control}
            type="text"
            placeholder="Plant care skill level..."
            error={errors.plant_care_skill_level}
          />
          <button type="submit" disabled={!(password && passwordsMatch) || loading}>
            Register
          </button>
        </form>
        {error && <p>{error}</p>}
        {success && <p>User registered successfully</p>}
      </div>
    </>
  );
};

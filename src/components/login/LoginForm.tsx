import { useState } from "react";
import { useForm } from "react-hook-form";
import { LoginSchema, type LoginFormValues } from "../../zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { InputLogin } from "./InputLogin";
import { useAuth } from "../../context";
import { useNavigate } from "react-router-dom";

type FormValues = {
  email: string;
  password: string;
};

export const LoginForm = () => {
  const {
    handleSubmit,
    control,
    reset,
    watch,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(LoginSchema),
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { login, error, setError } = useAuth();
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [email, password] = watch(["email", "password"]);
  const navigate = useNavigate();

  const onSubmit = async (data: FormValues) => {
    setLoading(true);
    setError(null);

    try {
      const loggedUser = await login(data);

      if (loggedUser) {
        setSuccess(true);
        reset();

        setTimeout(() => {
          navigate(`/myplants/home/profile/${loggedUser.username}`);
        }, 1500);
      } else {
        setSuccess(false);
      }
    } catch (error: unknown) {
      console.error(error);
      if (error instanceof Error) {
        setError(error.message);
        alert("There was an error logging in");
      } else {
        setError("Error logging in");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div>
        <form action="post" onSubmit={handleSubmit(onSubmit)}>
          <InputLogin
            label="Email: "
            name="email"
            control={control}
            type="text"
            placeholder="Email... "
            error={errors.email}
          />
          <InputLogin
            label="Password: "
            name="password"
            control={control}
            type="password"
            placeholder="Password... "
            error={errors.password}
          />
          <button type="submit" disabled={!(email && password) || loading}>
            Login
          </button>
          {success && <p>Login successful!</p>}
          {error && <p>{error}</p>}
        </form>
      </div>
    </>
  );
};

import { useState } from "react";
import { useForm } from "react-hook-form";
import { LoginSchema, type LoginFormValues } from "../../zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { InputLogin } from "./InputLogin";
import { useAuth } from "../../context";
import { useNavigate } from "react-router-dom";

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

  const onSubmit = async (data: LoginFormValues) => {
    setLoading(true);
    setError(null);

    try {
      const loggedUser = await login(data);

      if (loggedUser) {
        if (loggedUser.role === "user") {
          setSuccess(true);
          reset();

          setTimeout(() => {
            navigate(`/myplants/home/profile/${loggedUser.username}`);
          }, 1500);
        } else {
          setSuccess(true);
          reset();

          setTimeout(() => {
            navigate(`/myplants/admin/home/profile/${loggedUser.username}`);
          }, 1500);
        }
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
    {/* // TODO: GSAP */}
      <div className="bg-[#b8d6c4] border-gray-400 rounded-lg text-center shadow-[-6px_6px_12px_rgba(0,0,0,0.18)]">
        <form action="post" onSubmit={handleSubmit(onSubmit)}>
          <InputLogin
            label="Email: "
            name="email"
            control={control}
            type="text"
            placeholder="email... "
            error={errors.email}
            containerClassname="mx-auto text-center p-2"
            labelClassname="font-[quicksand] text-md text-gray-900 mb-1 block"
            inputClassname="font-[quicksand] text-sm w-full px-4 py-2 rounded-lg border border-gray-400 
                  text-gray-800 font-sans placeholder:text-gray-400 placeholder:font-light
                  focus:outline-none focus:ring-1 focus:ring-[#183f30] focus:border-[#183f30]
                  transition-colors duration-200"
            errorClassname="text-[#c53030] text-xs font-medium font-[quicksand]"
          />
          <InputLogin
            label="Password: "
            name="password"
            control={control}
            type="password"
            placeholder="password... "
            error={errors.password}
            containerClassname="mx-auto text-center p-2"
            labelClassname="font-[quicksand] text-md text-gray-900 mb-1 block"
            inputClassname="font-[quicksand] text-sm w-full px-4 py-2 rounded-lg border border-gray-400 
                  text-gray-800 font-sans placeholder:text-gray-400 placeholder:font-light
                  focus:outline-none focus:ring-1 focus:ring-[#183f30] focus:border-[#183f30]
                  transition-colors duration-200"
            errorClassname="text-[#c53030] text-xs font-medium font-[quicksand]"
          />
          <button
            type="submit"
            disabled={!(email && password) || loading}
            className="font-[quicksand] w-[35%] font-medium border border-gray-400 rounded-md bg-[#49a073] text-gray-800 cursor-pointer disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-default p-1 mt-1.5 mb-3 transition-colors duration-200"
          >
            Login
          </button>
          {success && <p className="font-[quicksand] font-medium text-sm text-[#3d8861] mb-1">Login successful!</p>}
          {error && <p className="text-[#c53030] text-xs font-medium font-[quicksand] mb-1">{error}</p>} 
        </form>
      </div>
    </>
  );
};

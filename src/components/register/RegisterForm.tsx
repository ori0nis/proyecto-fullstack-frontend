import { useForm } from "react-hook-form";
import { InputRegister } from ".";
import { RegisterSchema, type RegisterFormValues } from "../../zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PasswordChecklist } from ".";
import { useAuth } from "../../context";

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
  const [username, email, password, confirm_password, plant_care_skill_level] = watch([
    "username",
    "email",
    "password",
    "confirm_password",
    "plant_care_skill_level",
  ]);
  const [showPasswordChecklist, setShowPasswordChecklist] = useState<boolean>(true);
  const navigate = useNavigate();

  const passwordsMatch = password === confirm_password;

  const onSubmit = async (data: RegisterFormValues) => {
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
    } catch (error) {
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
      {/* // TODO: GSAP */}
      <div className="bg-[#cdb9a3] border-gray-400 rounded-lg text-center shadow-[-6px_6px_12px_rgba(0,0,0,0.18)] p-1">
        <form action="post" onSubmit={handleSubmit(onSubmit)}>
          <InputRegister
            label="Username: "
            name="username"
            control={control}
            type="text"
            placeholder="Username..."
            error={errors.username}
            containerClassname="mx-auto text-center p-2 min-w-[250px]"
            labelClassname="font-[quicksand] text-md text-gray-700 mb-1 block"
            inputClassname="font-[quicksand] text-sm w-full px-4 py-2 rounded-lg border border-gray-400 text-gray-800 font-sans placeholder:text-gray-500 placeholder:font-light focus:outline-none focus:ring-1 focus:ring-[#946a4c] focus:border-[#946a4c] transition-colors duration-200"
            errorClassname="text-[#c53030] text-xs font-medium font-[quicksand] mt-1"
          />
          <InputRegister
            label="Email: "
            name="email"
            control={control}
            type="email"
            placeholder="Email..."
            error={errors.email}
            containerClassname="mx-auto text-center p-2 min-w-[250px]"
            labelClassname="font-[quicksand] text-md text-gray-700 mb-1 block"
            inputClassname="font-[quicksand] text-sm w-full px-4 py-2 rounded-lg border border-gray-400 text-gray-800 font-sans placeholder:text-gray-500 placeholder:font-light focus:outline-none focus:ring-1 focus:ring-[#946a4c] focus:border-[#946a4c] transition-colors duration-200"
            errorClassname="text-[#c53030] text-xs font-medium font-[quicksand] mt-1"
          />
          <div className="flex flex-col w-full gap-1 h-20.5">
            <InputRegister
              label="Password: "
              name="password"
              control={control}
              type="password"
              placeholder="Password..."
              error={undefined}
              onFocus={() => setShowPasswordChecklist(true)}
              onBlur={() => setShowPasswordChecklist(false)}
              containerClassname="mx-auto text-center p-2 min-w-[250px]"
              labelClassname="font-[quicksand] text-md text-gray-700 mb-1 block"
              inputClassname="font-[quicksand] text-sm w-full px-4 py-2 rounded-lg border border-gray-400 text-gray-800 font-sans placeholder:text-gray-500 placeholder:font-light focus:outline-none focus:ring-1 focus:ring-[#946a4c] focus:border-[#946a4c] transition-colors duration-200"
              errorClassname="text-[#c53030] text-xs font-medium font-[quicksand] mt-1"
            />
            {password && showPasswordChecklist && <PasswordChecklist password={password} />}
          </div>
          <InputRegister
            label="Confirm password: "
            name="confirm_password"
            control={control}
            type="password"
            placeholder="Confirm password..."
            error={errors.confirm_password}
            containerClassname="mx-auto text-center p-2 min-w-[250px]"
            labelClassname="font-[quicksand] text-md text-gray-700 mb-1 block"
            inputClassname="font-[quicksand] text-sm w-full px-4 py-2 rounded-lg border border-gray-400 text-gray-800 font-sans placeholder:text-gray-500 placeholder:font-light focus:outline-none focus:ring-1 focus:ring-[#946a4c] focus:border-[#946a4c] transition-colors duration-200"
            errorClassname="text-[#c53030] text-xs font-medium font-[quicksand] mt-1"
          />
          <InputRegister
            label="Plant care skill level: "
            name="plant_care_skill_level"
            control={control}
            type="text"
            placeholder="Plant care skill level..."
            error={errors.plant_care_skill_level}
            containerClassname="mx-auto text-center p-2 min-w-[250px]"
            labelClassname="font-[quicksand] text-md text-gray-700 mb-1 block"
            inputClassname="font-[quicksand] text-sm w-full px-4 py-2 rounded-lg border border-gray-400 text-gray-800 font-sans placeholder:text-gray-500 placeholder:font-light focus:outline-none focus:ring-1 focus:ring-[#946a4c] focus:border-[#946a4c] transition-colors duration-200"
            errorClassname="text-[#c53030] text-xs font-medium font-[quicksand] mt-1"
          />
          <button
            type="submit"
            disabled={!(username && email && password && passwordsMatch && plant_care_skill_level) || loading}
            className="font-[quicksand] w-[35%] font-medium border border-gray-400 rounded-md bg-[#9a6f4c] text-gray-800 cursor-pointer disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-default p-1 mt-1.5 mb-3 transition-colors duration-200"
          >
            Register
          </button>
        </form>
        {error && <p>{error}</p>}
        {success && <p>User registered successfully</p>}
      </div>
    </>
  );
};

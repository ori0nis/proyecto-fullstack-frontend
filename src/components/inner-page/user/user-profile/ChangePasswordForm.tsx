import { useForm } from "react-hook-form";
import { ChangePasswordSchema, type ChangePasswordFormValues } from "../../../../zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "../../../../context";
import { changePassword } from "../../../../services";
import { useState } from "react";
import { InputChangePassword } from "./InputChangePassword";
import { PasswordChecklist } from "../../../register";
import { useOutletContext } from "react-router-dom";

interface EditProfileContext {
  formKey: number;
  handleFormSuccess: () => void;
}

export const ChangePasswordForm = () => {
  const {
    handleSubmit,
    control,
    watch,
    reset,
    formState: { errors },
  } = useForm<ChangePasswordFormValues>({
    resolver: zodResolver(ChangePasswordSchema),
    mode: "onChange",
    defaultValues: {
      old_password: "",
      new_password: "",
      confirm_password: "",
    },
  });

  const { user } = useAuth();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const [new_password, old_password, confirm_password] = watch(["new_password", "old_password", "confirm_password"]);
  const { handleFormSuccess, formKey } = useOutletContext<EditProfileContext>();

  const onSubmit = async (data: ChangePasswordFormValues) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const { old_password, new_password, confirm_password } = data;

      if (old_password && new_password && confirm_password) {
        const success = await changePassword(user!._id, old_password, new_password);

        if (success) {
          setSuccess(true);
          alert("Password successfully changed!");
          reset();
          handleFormSuccess();
        }
      }
    } catch (error) {
      console.error(error);
      alert("There was an error editing your profile");

      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Error editing your profile");
      }
    }
  };

  return (
    <>
      <div className="mx-auto text-center">
        <form action="post" key={formKey} onSubmit={handleSubmit(onSubmit)}>
          <InputChangePassword
            label="Old password*: "
            name="old_password"
            control={control}
            type="password"
            error={errors.old_password}
            containerClassname="mx-auto text-center p-2 mb-3"
            labelClassname="font-[quicksand] text-md text-gray-900 mb-1 block"
            inputClassname="font-[quicksand] text-sm w-full px-4 py-2 rounded-lg border border-gray-400 text-gray-800 font-sans placeholder:text-gray-400 placeholder:font-light focus:outline-none focus:ring-1 focus:ring-[#183f30] focus:border-[#183f30] transition-colors duration-200"
            errorClassname="text-[#c53030] text-xs font-medium font-[quicksand]"
          />
          <InputChangePassword
            label="Confirm password*: "
            name="confirm_password"
            control={control}
            type="password"
            error={errors.confirm_password}
            containerClassname="mx-auto text-center p-2 mb-3"
            labelClassname="font-[quicksand] text-md text-gray-900 mb-1 block"
            inputClassname="font-[quicksand] text-sm w-full px-4 py-2 rounded-lg border border-gray-400 text-gray-800 font-sans placeholder:text-gray-400 placeholder:font-light focus:outline-none focus:ring-1 focus:ring-[#183f30] focus:border-[#183f30] transition-colors duration-200"
            errorClassname="text-[#c53030] text-xs font-medium font-[quicksand]"
          />
          <InputChangePassword
            label="New password*: "
            name="new_password"
            control={control}
            type="password"
            error={errors.new_password}
            containerClassname="mx-auto text-center p-2 mb-3"
            labelClassname="font-[quicksand] text-md text-gray-900 mb-1 block"
            inputClassname="font-[quicksand] text-sm w-full px-4 py-2 rounded-lg border border-gray-400 text-gray-800 font-sans placeholder:text-gray-400 placeholder:font-light focus:outline-none focus:ring-1 focus:ring-[#183f30] focus:border-[#183f30] transition-colors duration-200"
            errorClassname="text-[#c53030] text-xs font-medium font-[quicksand]"
          />
          {new_password && <PasswordChecklist password={new_password} />}
          <button
            type="submit"
            disabled={!(new_password && old_password && confirm_password) || loading}
            className="cursor-pointer font-medium border border-gray-900 rounded-md p-1"
          >
            Submit
          </button>
          {error && <p className="text-red-400">{error}</p>}
          {success && (
            <p className="text-[#3d8861] text-sm font-medium font-[quicksand] mt-2">Password updated successfully!</p>
          )}
        </form>
      </div>
    </>
  );
};

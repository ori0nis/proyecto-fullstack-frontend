import { useForm } from "react-hook-form";
import { DeleteAccountSchema, type DeleteAccountFormValues } from "../../../../zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { InputDeleteAccount } from "./InputDeleteAccount";
import { useState } from "react";
import { deleteUser } from "../../../../services";
import { EditProfileContext, useAuth } from "../../../../context";
import { useOutletContext } from "react-router-dom";

interface EditProfileContext {
  formKey: number;
  handleFormSuccess: () => void;
}

export const DeleteAccountForm = () => {
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<DeleteAccountFormValues>({
    resolver: zodResolver(DeleteAccountSchema),
    mode: "onChange",
    defaultValues: {
      password: "",
      confirm_password: "",
    },
  });

  const { user, logout } = useAuth();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const { formKey, handleFormSuccess } = useOutletContext<EditProfileContext>();

  const onSubmit = async (data: DeleteAccountFormValues) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const success = await deleteUser(user!._id, data.password);

      if (success) {
        setSuccess(true);
        alert("Your account was successfully deleted");
        reset();
        handleFormSuccess();
        logout();
      }
    } catch (error) {
      console.error(error);
      alert("There was an error editing your profile");

      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Error editing your profile");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="text-center mx-auto xs:max-w-[70%]">
        <h2 className="text-[#c53030] font-semibold mb-2 underline">
          Are you sure you want to delete your account? This action can't be undone
        </h2>
        <form action="post" key={formKey} onSubmit={handleSubmit(onSubmit)}>
          <InputDeleteAccount
            label="Password*: "
            name="password"
            control={control}
            type="password"
            error={errors.password}
            containerClassname="mx-auto text-center p-2 mb-3"
            labelClassname="font-[quicksand] text-md text-gray-900 mb-1 block"
            inputClassname="font-[quicksand] text-sm w-full px-4 py-2 rounded-lg border border-gray-400 text-gray-800 font-sans placeholder:text-gray-400 placeholder:font-light focus:outline-none focus:ring-1 focus:ring-[#183f30] focus:border-[#183f30] transition-colors duration-200"
            errorClassname="text-[#c53030] text-xs font-medium font-[quicksand]"
          />
          <InputDeleteAccount
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
          <button
            type="submit"
            disabled={loading}
            className="cursor-pointer font-medium border border-gray-900 rounded-md p-1"
          >
            Submit
          </button>
          {error && <p className="text-[#c53030] text-sm font-medium font-[quicksand] mt-2">{error}</p>}
          {success && (
            <p className="text-[#3d8861] text-sm font-medium font-[quicksand] mt-2">Account deleted successfully</p>
          )}
        </form>
      </div>
    </>
  );
};

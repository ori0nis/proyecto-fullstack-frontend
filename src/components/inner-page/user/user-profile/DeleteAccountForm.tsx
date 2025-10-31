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
      <div>
        <h2>Are you sure you want to delete your account? This action can't be undone</h2>
        <form action="post" key={formKey} onSubmit={handleSubmit(onSubmit)}>
          <InputDeleteAccount
            label="Password: "
            name="password"
            control={control}
            type="password"
            error={errors.password}
          />
          <InputDeleteAccount
            label="Confirm password: "
            name="confirm_password"
            control={control}
            type="password"
            error={errors.confirm_password}
          />
          <button type="submit" disabled={loading}>
            Submit
          </button>
          {error && <p className="">{error}</p>}
          {success && <p className="">Account deleted successfully</p>}
        </form>
      </div>
    </>
  );
};

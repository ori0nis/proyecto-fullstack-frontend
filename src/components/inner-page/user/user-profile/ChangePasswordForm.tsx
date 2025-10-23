import { useForm } from "react-hook-form";
import { ChangePasswordSchema, type ChangePasswordFormValues } from "../../../../zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "../../../../context";
import { changePassword } from "../../../../services";
import { useState } from "react";
import { InputChangePassword } from "./InputChangePassword";
import { PasswordChecklist } from "../../../register";

interface Props {
  key: number;
  onSuccess: () => void;
}

export const ChangePasswordForm = ({ onSuccess }: Props) => {
  const {
    handleSubmit,
    control,
    watch,
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
          onSuccess();
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
      <div>
        <form action="post" onSubmit={handleSubmit(onSubmit)}>
          <InputChangePassword
            label="Old password: "
            name="old_password"
            control={control}
            type="password"
            error={errors.old_password}
          />
          <InputChangePassword
            label="Confirm password: "
            name="confirm_password"
            control={control}
            type="password"
            error={errors.confirm_password}
          />
          <InputChangePassword
            label="New password: "
            name="new_password"
            control={control}
            type="password"
            error={errors.new_password}
          />
          {new_password && <PasswordChecklist password={new_password} />}
          <button type="submit" disabled={!(new_password && old_password && confirm_password) || loading}>
            Submit
          </button>
          {error && <p className="text-red-400">{error}</p>}
          {success && <p className="">Password updated successfully!</p>}
        </form>
      </div>
    </>
  );
};

import { useForm } from "react-hook-form";
import { useOutletContext } from "react-router-dom";
import { EditProfileSchema, type EditProfileFormValues } from "../../../../zod/";
import { zodResolver } from "@hookform/resolvers/zod";
import { InputEditProfile } from "./InputEditProfile";
import { useState } from "react";
import { editUser } from "../../../../services";
import { useAuth } from "../../../../context";
import type { PublicUser } from "../../../../models/user";

//? Makes this form reusable for admin
interface Props {
  targetUser?: PublicUser;
  onSuccess?: () => void;
}

export const EditProfileForm = ({ targetUser, onSuccess }: Props) => {
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<EditProfileFormValues>({
    resolver: zodResolver(EditProfileSchema),
    mode: "onChange",
    defaultValues: {
      username: "",
      email: "",
      plant_care_skill_level: undefined,
      password: "",
    },
  });

  //? Context props
  const outletContext = useOutletContext<{ handleFormSuccess: () => void; formKey: number } | null>();
  const handleFormSuccess = outletContext?.handleFormSuccess ?? (() => {});
  const formKey = outletContext?.formKey ?? 0;

  const { user } = useAuth();
  const userBeingEdited = targetUser || user;
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const onSubmit = async (data: EditProfileFormValues) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...otherFields } = data;

    const hasChanges = Object.values(otherFields).some((value) => value !== "" && value !== undefined);

    if (!hasChanges) {
      alert("No changes detected. Please update at least one field.");
      setLoading(false);
      return;
    }

    try {
      const success = await editUser(userBeingEdited!._id, data);

      if (success) {
        setSuccess(true);
        alert("Profile updated successfully!");
        reset();
        handleFormSuccess(); //? For user flux (comes from outlet context)
        onSuccess?.(); //? For admin flux (comes from AdminEditUserPage prop)
      } else {
        setSuccess(false);
        alert("There was an error updating your profile");
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
        <form action="post" key={formKey} onSubmit={handleSubmit(onSubmit)}>
          <InputEditProfile
            label="New username: "
            name="username"
            control={control}
            type="text"
            placeholder="New username..."
            error={errors.username}
          />
          <InputEditProfile
            label="New email address: "
            name="email"
            control={control}
            type="email"
            placeholder="Email..."
            error={errors.email}
          />
          <InputEditProfile
            label="Profile picture: "
            name="userImg"
            control={control}
            type="file"
            error={errors.userImg}
          />
          <InputEditProfile
            label="Plant care skill level: "
            name="plant_care_skill_level"
            control={control}
            type="text"
            placeholder="Plant care skill level..."
            error={errors.plant_care_skill_level}
          />

          {user?.role === "admin" && <h3>Input your password to complete user edit: </h3>}
          {user?.role === "user" && <h3>Confirm your password to complete your request:</h3>}

          <InputEditProfile
            label="Password: "
            name="password"
            control={control}
            type="password"
            error={errors.password}
          />
          <button type="submit" disabled={loading}>
            Submit
          </button>
          {error && <p className="text-red-400">{error}</p>}
          {success && <p className="">Profile updated successfully!</p>}
        </form>
      </div>
    </>
  );
};

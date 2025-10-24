import { useForm } from "react-hook-form";
import { EditProfileSchema, type EditProfileFormValues } from "../../../../zod/";
import { zodResolver } from "@hookform/resolvers/zod";
import { InputEditProfile } from "./InputEditProfile";
import { useState } from "react";
import { editUser } from "../../../../services";
import { useAuth } from "../../../../context";

interface Props {
  key: number;
  onSuccess: () => void;
}

export const EditProfileForm = ({ onSuccess }: Props) => {
  const {
    handleSubmit,
    control,
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

  const { user } = useAuth();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const onSubmit = async (data: EditProfileFormValues) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const success = await editUser(user!._id, data);

      if (success) {
        setSuccess(true);
        alert("Profile updated successfully!");
        onSuccess();
      } else {
        setSuccess(false);
        alert("There was an error updating your profile");
      }

      // TODO: if (!passwordChanged && !hasOtherProfileChanges) alert("No changes detected");
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
          {/* // TODO: Service to check if username exists */}
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
          <h3>Confirm your password to complete your request: </h3>
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

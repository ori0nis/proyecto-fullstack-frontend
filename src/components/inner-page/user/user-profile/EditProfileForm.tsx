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
  const [wordCount, setWordCount] = useState<number>(0);

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
      <div className="text-center">
        <form action="post" key={formKey} onSubmit={handleSubmit(onSubmit)}>
          <InputEditProfile
            label="New username: "
            name="username"
            control={control}
            type="text"
            placeholder="New username..."
            error={errors.username}
            containerClassname="mx-auto text-center p-2 mb-3"
            labelClassname="font-[quicksand] text-md text-gray-900 mb-1 block"
            inputClassname="font-[quicksand] text-sm w-full px-4 py-2 rounded-lg border border-gray-400 text-gray-800 font-sans placeholder:text-gray-400 placeholder:font-light focus:outline-none focus:ring-1 focus:ring-[#183f30] focus:border-[#183f30] transition-colors duration-200"
            errorClassname="text-[#c53030] text-xs font-medium font-[quicksand]"
          />
          <InputEditProfile
            label="New email address: "
            name="email"
            control={control}
            type="email"
            placeholder="Email..."
            error={errors.email}
            containerClassname="mx-auto text-center mb-3"
            labelClassname="font-[quicksand] text-md text-gray-900 mb-1 block"
            inputClassname="font-[quicksand] text-sm w-full px-4 py-2 rounded-lg border border-gray-400 text-gray-800 font-sans placeholder:text-gray-400 placeholder:font-light focus:outline-none focus:ring-1 focus:ring-[#183f30] focus:border-[#183f30] transition-colors duration-200"
            errorClassname="text-[#c53030] text-xs font-medium font-[quicksand]"
          />
          <InputEditProfile
            label="Profile picture: "
            name="profilePic"
            control={control}
            type="file"
            error={errors.profilePic}
            as="file"
            containerClassname="mx-auto text-center mb-3"
            labelClassname="font-[quicksand] text-md text-gray-900 mb-1 block"
            inputClassname="font-[quicksand] text-sm w-full px-4 py-2 rounded-lg border border-gray-400 text-gray-800 font-sans placeholder:text-gray-400 placeholder:font-light focus:outline-none focus:ring-1 focus:ring-[#183f30] focus:border-[#183f30] transition-colors duration-200"
            errorClassname="text-[#c53030] text-xs font-medium font-[quicksand]"
          />
          <InputEditProfile
            label="Plant care skill level: "
            name="plant_care_skill_level"
            control={control}
            type="text"
            placeholder="Plant care skill level..."
            error={errors.plant_care_skill_level}
            containerClassname="mx-auto text-center mb-3"
            labelClassname="font-[quicksand] text-md text-gray-900 mb-1 block"
            inputClassname="font-[quicksand] text-sm w-full px-4 py-2 rounded-lg border border-gray-400 text-gray-800 font-sans placeholder:text-gray-400 placeholder:font-light focus:outline-none focus:ring-1 focus:ring-[#183f30] focus:border-[#183f30] transition-colors duration-200"
            errorClassname="text-[#c53030] text-xs font-medium font-[quicksand]"
          />
          <InputEditProfile
            label="Profile bio: "
            name="profile_bio"
            control={control}
            as="textarea"
            placeholder="Say something about yourself..."
            onChange={(value) => setWordCount(value.length)}
            error={errors.profile_bio}
            containerClassname="mx-auto text-center"
            labelClassname="font-[quicksand] text-md text-gray-900 mb-1 block"
            inputClassname="font-[quicksand] text-sm w-full px-4 py-2 rounded-lg border border-gray-400 text-gray-800 font-sans placeholder:text-gray-400 placeholder:font-light focus:outline-none focus:ring-1 focus:ring-[#183f30] focus:border-[#183f30] transition-colors duration-200"
            errorClassname="text-[#c53030] text-xs font-medium font-[quicksand]"
          />
          <span className="font-medium">{wordCount}/60</span>

          {user?.role === "admin" && <h3 className="mt-3 mb-3">Input your password to complete user edit: </h3>}
          {user?.role === "user" && <h3 className="mt-3 mb-3">Confirm your password to complete your request:</h3>}

          <InputEditProfile
            label="Password: "
            name="password"
            control={control}
            type="password"
            error={errors.password}
            containerClassname="mx-auto text-center mb-3"
            labelClassname="font-[quicksand] text-md text-gray-900 mb-1 block"
            inputClassname="font-[quicksand] text-sm w-full px-4 py-2 rounded-lg border border-gray-400 text-gray-800 font-sans placeholder:text-gray-400 placeholder:font-light focus:outline-none focus:ring-1 focus:ring-[#183f30] focus:border-[#183f30] transition-colors duration-200"
            errorClassname="text-[#c53030] text-xs font-medium font-[quicksand]"
          />
          <button
            type="submit"
            disabled={loading || wordCount > 60}
            className="cursor-pointer font-medium border border-gray-900 rounded-md p-1"
          >
            Submit
          </button>

          {/* States */}
          {error && <p className="text-[#c53030] text-sm font-medium font-[quicksand] mt-2">{error}</p>}
          {success && (
            <p className="text-[#3d8861] text-sm font-medium font-[quicksand] mt-2">Profile updated successfully!</p>
          )}
        </form>
      </div>
    </>
  );
};

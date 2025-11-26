import { useForm } from "react-hook-form";
import { AddUserPlantSchema, type AddUserPlantFormValues } from "../../../../zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { addPlantToUserProfile } from "../../../../services";
import { InputAddUserPlant } from "..";

interface Props {
  plantId: string;
  onAdded: () => void;
  onClose: () => void;
}

export const AddUserPlantForm = ({ plantId, onClose, onAdded }: Props) => {
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<AddUserPlantFormValues>({
    resolver: zodResolver(AddUserPlantSchema),
    mode: "onChange",
    defaultValues: {
      nameByUser: "",
    },
  });

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);

  const onSubmit = async (data: AddUserPlantFormValues) => {
    setLoading(true);
    setError(null);

    try {
      const success = await addPlantToUserProfile(plantId, data);

      const hasChanges = Object.values(data).some((value) => value !== "" || value !== undefined);

      if (!hasChanges) {
        alert("No changes detected, please fill at least one field");
        setLoading(false);
        return;
      }

      if (success) {
        setSuccess(true);
        reset();
        alert("Plant successfully added!");
        onAdded();
        onClose();
      } else {
        setSuccess(false);
      }
    } catch (error) {
      console.error(error);
      alert("There was an error adding your plant");

      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Error adding your plant");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div>
        <h3 className="underline text-center font-semibold mt-2">Add plant to your plot</h3>
        <form action="post" onSubmit={handleSubmit(onSubmit)}>
          <InputAddUserPlant
            label="Your plant's name: "
            name="nameByUser"
            type="text"
            placeholder="New name..."
            error={errors.nameByUser}
            control={control}
            containerClassname="mx-auto text-center p-2"
            labelClassname="font-[quicksand] text-md text-gray-900 mb-1 block"
            inputClassname="font-[quicksand] text-sm w-full px-4 py-2 rounded-lg border border-gray-400 text-gray-800 font-sans placeholder:text-gray-400 placeholder:font-light focus:outline-none focus:ring-1 focus:ring-[#183f30] focus:border-[#183f30] transition-colors duration-200"
            errorClassname="text-[#c53030] text-xs font-medium font-[quicksand]"
          />
          <InputAddUserPlant
            label="Plant img: "
            name="plantImg"
            type="file"
            error={errors.plantImg}
            control={control}
            as="file"
            containerClassname="mx-auto text-center"
            labelClassname="font-[quicksand] text-md text-gray-900 mb-1 block"
            inputClassname="font-[quicksand] text-sm w-full px-4 py-2 rounded-lg border border-gray-400 text-gray-800 font-sans placeholder:text-gray-400 placeholder:font-light focus:outline-none focus:ring-1 focus:ring-[#183f30] focus:border-[#183f30] transition-colors duration-200"
            errorClassname="text-[#c53030] text-xs font-medium font-[quicksand]"
          />

          {/* Buttons */}
          <div className="flex gap-2 justify-center mt-3">
            <button
              type="submit"
              disabled={loading}
              className="cursor-pointer font-medium border border-gray-900 rounded-md p-1"
            >
              Submit
            </button>
            <button
              type="button"
              onClick={onClose}
              className="cursor-pointer font-medium border border-gray-900 rounded-md p-1"
            >
              Cancel
            </button>
          </div>
        </form>
        {error && <p className="text-[#c53030] text-sm font-medium font-[quicksand] mt-2 text-center">{error}</p>}
        {success && (
          <p className="text-[#3d8861] text-sm font-medium font-[quicksand] mt-2">Plant successfully added!</p>
        )}
      </div>
    </>
  );
};

import { useForm } from "react-hook-form";
import { EditUserPlantSchema, type EditUserPlantFormValues } from "../../../../zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { editUserPlant } from "../../../../services";
import { InputEditUserPlant } from "./InputEditUserPlant";

interface Props {
  plantId: string;
  onClose: () => void;
  onEdited: () => void;
}

export const EditUserPlantForm = ({ plantId, onClose, onEdited }: Props) => {
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<EditUserPlantFormValues>({
    resolver: zodResolver(EditUserPlantSchema),
    mode: "onChange",
    defaultValues: {
      nameByUser: "",
    },
  });

  const [error, setError] = useState<string | null>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);

  const onSubmit = async (data: EditUserPlantFormValues) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const success = await editUserPlant(plantId, data);

      if (success) {
        setSuccess(true);
        reset();
        alert("Plant successfully edited!");
        onClose();
        onEdited();
      } else {
        setSuccess(false);
      }
    } catch (error) {
      console.error(error);
      alert("There was an error editing your plant");

      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Error editing your plant");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div>
        <h3 className="underline text-center font-semibold mt-2">Edit your plant</h3>
        <form action="post" onSubmit={handleSubmit(onSubmit)}>
          <InputEditUserPlant
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
          <InputEditUserPlant
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
        {error && <p className="">{error}</p>}
        {success && <p className="">Plant successfully edited!</p>}
      </div>
    </>
  );
};

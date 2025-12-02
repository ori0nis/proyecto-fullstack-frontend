import { useForm } from "react-hook-form";
import { AddNurseryPlantSchema, type AddNurseryPlantFormValues } from "../../../../zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { postNewPlant } from "../../../../services";
import { InputNewNurseryPlant } from "./InputNewNurseryPlant";

interface Props {
  onClose: () => void;
}

export const AddNewNurseryPlantForm = ({ onClose }: Props) => {
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<AddNurseryPlantFormValues>({
    resolver: zodResolver(AddNurseryPlantSchema),
    mode: "onChange",
    defaultValues: {
      scientific_name: "",
      common_name: "",
      type: undefined,
    },
  });

  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);

  const onSubmit = async (data: AddNurseryPlantFormValues) => {
    setLoading(true);

    try {
      const success = await postNewPlant(data);

      if (success) {
        setSuccess(true);
        alert("Plant added successfully!");
        reset();
        onClose();
      } else {
        setSuccess(false);
      }
    } catch (error) {
      console.error(error);
      alert("Couldn't add plant to the nursery");

      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Error adding plant");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div>
        <h3 className="underline text-center font-semibold mt-2">Add a new plant</h3>
        <form action="post" onSubmit={handleSubmit(onSubmit)}>
          <InputNewNurseryPlant
            label="Scientific name: "
            name="scientific_name"
            type="text"
            placeholder="Scientific name..."
            control={control}
            error={errors.scientific_name}
            containerClassname="mx-auto text-center p-2"
            labelClassname="font-[quicksand] text-md text-gray-900 mb-1 block"
            inputClassname="font-[quicksand] text-sm w-full px-4 py-2 rounded-lg border border-gray-400 text-gray-800 font-sans placeholder:text-gray-400 placeholder:font-light focus:outline-none focus:ring-1 focus:ring-[#183f30] focus:border-[#183f30] transition-colors duration-200"
            errorClassname="text-[#c53030] text-xs font-medium font-[quicksand]"
          />
          <InputNewNurseryPlant
            label="Common name: "
            name="common_name"
            type="text"
            placeholder="Common name..."
            control={control}
            error={errors.common_name}
            containerClassname="mx-auto text-center p-2"
            labelClassname="font-[quicksand] text-md text-gray-900 mb-1 block"
            inputClassname="font-[quicksand] text-sm w-full px-4 py-2 rounded-lg border border-gray-400 text-gray-800 font-sans placeholder:text-gray-400 placeholder:font-light focus:outline-none focus:ring-1 focus:ring-[#183f30] focus:border-[#183f30] transition-colors duration-200"
            errorClassname="text-[#c53030] text-xs font-medium font-[quicksand]"
          />
          <InputNewNurseryPlant
            label="Plant type: "
            name="type"
            type="text"
            placeholder="Plant type..."
            control={control}
            error={errors.type}
            containerClassname="mx-auto text-center p-2"
            labelClassname="font-[quicksand] text-md text-gray-900 mb-1 block"
            inputClassname="font-[quicksand] text-sm w-full px-4 py-2 rounded-lg border border-gray-400 text-gray-800 font-sans placeholder:text-gray-400 placeholder:font-light focus:outline-none focus:ring-1 focus:ring-[#183f30] focus:border-[#183f30] transition-colors duration-200"
            errorClassname="text-[#c53030] text-xs font-medium font-[quicksand] wrap-break-word max-w-[150px] mx-auto mt-1"
          />
          <InputNewNurseryPlant
            label="Plant image: "
            name="plantImg"
            type="file"
            control={control}
            error={errors.plantImg}
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
          {error && <p className="text-[#c53030] text-sm font-medium font-[quicksand] mt-2">{error}</p>}
          {success && <p className="text-[#3d8861] text-sm font-medium font-[quicksand] mt-2">Plant added successfully!</p>}
        </form>
      </div>
    </>
  );
};

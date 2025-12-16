import { useForm } from "react-hook-form";
import { EditNurseryPlantSchema, type EditNurseryPlantFormValues } from "../../../../zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { editPlant } from "../../../../services";
import { InputAdminEditNurseryPlant } from "./InputAdminEditNurseryPlant";

interface Props {
  plantId: string;
  onClose: () => void;
  onSuccess: () => void;
}

export const AdminEditPlantForm = ({ plantId, onClose, onSuccess }: Props) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EditNurseryPlantFormValues>({
    resolver: zodResolver(EditNurseryPlantSchema),
    mode: "onChange",
    defaultValues: {
      scientific_name: "",
      common_name: "",
    },
  });

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>("");

  const onSubmit = async (data: EditNurseryPlantFormValues) => {
    setLoading(true);
    setError(null);

    try {
      const success = await editPlant(plantId, data);

      if (success) {
        alert("Successfully edited plant!");
        reset();
        onSuccess();
      }
    } catch (error) {
      console.error(error);
      alert("There was an error editing the plant");

      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Error editing plant");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div>
        <h3 className="underline text-center font-semibold mt-2 mb-2">Edit nursery plant</h3>
        <form action="post" onSubmit={handleSubmit(onSubmit)}>
          <InputAdminEditNurseryPlant
            label="Scientific name: "
            name="scientific_name"
            type="text"
            placeholder="New scientific name..."
            error={errors.scientific_name}
            control={control}
            containerClassname="mx-auto text-center p-2"
            labelClassname="font-[quicksand] text-md text-gray-900 mb-1 block"
            inputClassname="font-[quicksand] text-sm w-full px-4 py-2 rounded-lg border border-gray-400 text-gray-800 font-sans placeholder:text-gray-400 placeholder:font-light focus:outline-none focus:ring-1 focus:ring-[#183f30] focus:border-[#183f30] transition-colors duration-200"
            errorClassname="text-[#c53030] text-xs font-medium font-[quicksand]"
          />
          <InputAdminEditNurseryPlant
            label="Common name: "
            name="common_name"
            type="text"
            placeholder="New common name..."
            error={errors.common_name}
            control={control}
            containerClassname="mx-auto text-center p-2"
            labelClassname="font-[quicksand] text-md text-gray-900 mb-1 block"
            inputClassname="font-[quicksand] text-sm w-full px-4 py-2 rounded-lg border border-gray-400 text-gray-800 font-sans placeholder:text-gray-400 placeholder:font-light focus:outline-none focus:ring-1 focus:ring-[#183f30] focus:border-[#183f30] transition-colors duration-200"
            errorClassname="text-[#c53030] text-xs font-medium font-[quicksand]"
          />
          <InputAdminEditNurseryPlant
            label="Plant img: "
            name="plantImg"
            type="file"
            error={errors.plantImg}
            as="file"
            control={control}
            containerClassname="mx-auto text-center p-2"
            labelClassname="font-[quicksand] text-md text-gray-900 mb-1 block"
            inputClassname="font-[quicksand] text-sm w-full px-4 py-2 rounded-lg border border-gray-400 text-gray-800 font-sans placeholder:text-gray-400 placeholder:font-light focus:outline-none focus:ring-1 focus:ring-[#183f30] focus:border-[#183f30] transition-colors duration-200"
            errorClassname="text-[#c53030] text-xs font-medium font-[quicksand]"
          />
          <InputAdminEditNurseryPlant
            label="Type: "
            name="type"
            as="select"
            options={[
              { label: "tropical", value: "tropical" },
              { label: "desert", value: "desert" },
              { label: "temperate", value: "temperate" },
              { label: "alpine", value: "alpine" },
              { label: "aquatic", value: "aquatic" },
            ]}
            error={errors.type}
            control={control}
            containerClassname="mx-auto text-center p-2"
            labelClassname="font-[quicksand] text-md text-gray-900 mb-1 block"
            inputClassname="font-[quicksand] text-sm w-full px-4 py-2 rounded-lg border border-gray-400 text-gray-800 font-sans placeholder:text-gray-400 placeholder:font-light focus:outline-none focus:ring-1 focus:ring-[#183f30] focus:border-[#183f30] transition-colors duration-200"
            errorClassname="text-[#c53030] text-xs font-medium font-[quicksand] wrap-break-word max-w-[150px] mx-auto mt-1"
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
        {error && <p className="text-[#c53030] text-sm font-medium font-[quicksand] mt-2">{error}</p>}
      </div>
    </>
  );
};

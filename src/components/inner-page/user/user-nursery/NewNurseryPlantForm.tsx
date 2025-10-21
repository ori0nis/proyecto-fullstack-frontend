import { useForm } from "react-hook-form";
import { NewNurseryPlantSchema, type NewNurseryPlantFormValues } from "../../../../zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { postNewPlant } from "../../../../services";
import { InputNewNurseryPlant } from "./InputNewNurseryPlant";

type FormValues = {
  scientific_name: string;
  common_name: string;
  type: "desert" | "tropical" | "temperate" | "alpine" | "aquatic";
  plantImg: File;
};

interface Props {
  onClose: () => void;
}

export const NewNurseryPlantForm = ({ onClose }: Props) => {
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<NewNurseryPlantFormValues>({
    resolver: zodResolver(NewNurseryPlantSchema),
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

  const onSubmit = async (data: FormValues) => {
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
        <h3>Add a new plant</h3>
        <form action="post" onSubmit={handleSubmit(onSubmit)}>
          <InputNewNurseryPlant
            label="Scientific name: "
            name="scientific_name"
            type="text"
            placeholder="Scientific name..."
            control={control}
            error={errors.scientific_name}
          />
          <InputNewNurseryPlant
            label="Common name: "
            name="common_name"
            type="text"
            placeholder="Common name..."
            control={control}
            error={errors.common_name}
          />
          <InputNewNurseryPlant
            label="Plant type: "
            name="type"
            type="text"
            placeholder="Plant type..."
            control={control}
            error={errors.type}
          />
          <InputNewNurseryPlant
            label="Plant image: "
            name="plantImg"
            type="file"
            control={control}
            error={errors.plantImg}
          />
          <button type="submit" disabled={loading}>
            Submit
          </button>
          <button type="button" onClick={onClose}>
            Cancel
          </button>
          {error && <p className="">{error}</p>}
          {success && <p>Plant added successfully!</p>}
        </form>
      </div>
    </>
  );
};

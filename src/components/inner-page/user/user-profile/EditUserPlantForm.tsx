import { useForm } from "react-hook-form";
import { EditUserPlantSchema, type EditUserPlantFormValues } from "../../../../zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { editUserPlant } from "../../../../services";
import { InputEditUserPlant } from "./InputEditUserPlant";

interface Props {
  plantId: string;
  onClose: () => void;
}

export const EditUserPlantForm = ({ plantId, onClose }: Props) => {
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
        <h3>Edit your plant</h3>
        <form action="post" onSubmit={handleSubmit(onSubmit)}>
          <InputEditUserPlant
            label="Your plant's name: "
            name="nameByUser"
            type="text"
            placeholder="New name..."
            error={errors.nameByUser}
            control={control}
          />
          <InputEditUserPlant
            label="Plant img: "
            name="plantImg"
            type="file"
            error={errors.plantImg}
            control={control}
          />
          <button type="submit" disabled={loading}>
            Submit
          </button>
          <button type="button" onClick={onClose}>
            Cancel
          </button>
        </form>
        {error && <p className="">{error}</p>}
        {success && <p className="">Plant successfully edited!</p>}
      </div>
    </>
  );
};

import { useForm } from "react-hook-form";
import { EditUserPlantSchema, type EditUserPlantFormValues } from "../../../../zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { addPlantToUserProfile } from "../../../../services";
import { InputEditUserPlant } from "./InputEditUserPlant";

type FormValues = {
  nameByUser: string;
  plantImg: File;
};

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
  } = useForm<EditUserPlantFormValues>({
    resolver: zodResolver(EditUserPlantSchema),
    mode: "onChange",
    defaultValues: {
      nameByUser: "",
    },
  });

  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);

  const onSubmit = async (data: FormValues) => {
    setLoading(true);
    try {
      const success = await addPlantToUserProfile(plantId, data);

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
        <h3>Add plant to your plot</h3>
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
        {success && <p className="">Plant successfully added!</p>}
      </div>
    </>
  );
};

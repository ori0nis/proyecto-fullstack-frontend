import { useForm } from "react-hook-form";
import { AdminEditNurseryPlantSchema, type AdminEditNurseryPlantFormValues } from "../../../../zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { editPlant } from "../../../../services";
import { InputAdminEditNurseryPlant } from "./InputAdminEditNurseryPlant";

interface Props {
  plantId: string;
  onClose: () => void;
}

export const AdminEditPlantForm = ({ plantId, onClose }: Props) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AdminEditNurseryPlantFormValues>({
    resolver: zodResolver(AdminEditNurseryPlantSchema),
    mode: "onChange",
    defaultValues: {
      scientific_name: "",
      common_name: "",
    },
  });

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>("");
  const [success, setSuccess] = useState<boolean>(false);

  const onSubmit = async (data: AdminEditNurseryPlantFormValues) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const success = await editPlant(plantId, data);

      if (success) {
        setSuccess(true);
        alert("Successfully edited plant!");
        reset();
      } else {
        setSuccess(false);
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

  if (loading) return <p>Loading...</p>;

  return (
    <>
      <div>
        <h3>Edit nursery plant</h3>
        <form action="post" onSubmit={handleSubmit(onSubmit)}>
          <InputAdminEditNurseryPlant
            label="Scientific name: "
            name="scientific_name"
            type="text"
            placeholder="New scientific name..."
            error={errors.scientific_name}
            control={control}
          />
          <InputAdminEditNurseryPlant
            label="Common name: "
            name="common_name"
            type="text"
            placeholder="New common name..."
            error={errors.common_name}
            control={control}
          />
          <InputAdminEditNurseryPlant
            label="Plant img: "
            name="plantImg"
            type="file"
            error={errors.plantImg}
            control={control}
          />
          <InputAdminEditNurseryPlant
            label="Type "
            name="type"
            type="text"
            placeholder="New type..."
            error={errors.type}
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
        {success && <p>Plant successfully edited!</p>}
      </div>
    </>
  );
};

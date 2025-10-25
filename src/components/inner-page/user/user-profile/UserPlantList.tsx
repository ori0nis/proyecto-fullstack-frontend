import { useState } from "react";
import { deleteUserPlant } from "../../../../services";
import { ConfirmDeleteModal, EditUserPlantModal } from "../../../modals";
import { EditUserPlantForm } from "./EditUserPlantForm";
import type { UserPlant } from "../../../../models/plant";

interface Props {
  plants: UserPlant[];
  setPlants: React.Dispatch<React.SetStateAction<UserPlant[]>>;
}

export const UserPlantList = ({ plants, setPlants }: Props) => {
  const [editingPlant, setEditingPlant] = useState<string | null>(null);
  const [deletingPlant, setDeletingPlant] = useState<string | null>(null);

  const handleConfirmDelete = async (plantId: string) => {
    try {
      const success = await deleteUserPlant(plantId);

      if (success) {
        setPlants((prev) => prev.filter((plant) => plant._id !== plantId));
        setDeletingPlant(null);
      } else {
        alert("Couldn't delete your plant");
      }
    } catch (error) {
      console.error("Couldn't delete plant: ", error);
    }
  };

  if (plants.length === 0) return <p>Your plot is empty. Add a new plant now!</p>;

  return (
    <>
      <div>
        {/* // TODO: Add grid and list view */}

        {plants.map((plant) => (
          <div key={plant._id}>
            <img src={plant.imgPublicUrl} className="w-25" alt={plant.nameByUser} />
            <p>{plant.nameByUser}</p>
            <button onClick={() => setEditingPlant(plant._id)}>Edit</button>
            {editingPlant === plant._id && (
              <EditUserPlantModal isOpen={true} onClose={() => setEditingPlant(null)}>
                <EditUserPlantForm plantId={plant._id} onClose={() => setEditingPlant(null)} />
              </EditUserPlantModal>
            )}
            <button onClick={() => setDeletingPlant(plant._id)}>Delete</button>
            {deletingPlant === plant._id && (
              <ConfirmDeleteModal
                isOpen={true}
                onClose={() => setDeletingPlant(null)}
                onAccept={() => handleConfirmDelete(plant._id)}
                onCancel={() => setDeletingPlant(null)}
              />
            )}
          </div>
        ))}
      </div>
    </>
  );
};

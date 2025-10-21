import { useEffect, useState } from "react";
import { deleteUserPlant, getUserPlants } from "../../../../services";
import type { UserPlant } from "../../../../models/plant";
import { DeleteUserPlantModal, EditUserPlantModal } from "../../../modals";
import { EditUserPlantForm } from "./EditUserPlantForm";

export const UserPlantList = () => {
  const [plants, setPlants] = useState<UserPlant[]>([]);
  const [editingPlant, setEditingPlant] = useState<string | null>(null);
  const [deletingPlant, setDeletingPlant] = useState<string | null>(null);

  useEffect(() => {
    const fetchPlants = async () => {
      try {
        const response = await getUserPlants();
        setPlants(response.data.userPlants);
      } catch (error) {
        console.error("Error fetching plants: ", error);
      }
    };
    fetchPlants();
  }, []);

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
        <h2>Your plants:</h2>
        {plants.map((plant) => (
          <div key={plant._id}>
            <p>{plant.imgPublicUrl}</p>
            <p>{plant.nameByUser}</p>
            <button onClick={() => setEditingPlant(plant._id)}>Edit</button>
            {editingPlant === plant._id && (
              <EditUserPlantModal isOpen={true} onClose={() => setEditingPlant(null)}>
                <EditUserPlantForm plantId={plant._id} onClose={() => setEditingPlant(null)} />
              </EditUserPlantModal>
            )}
            <button onClick={() => setDeletingPlant(plant._id)}>Delete</button>
            {deletingPlant === plant._id && (
              <DeleteUserPlantModal
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

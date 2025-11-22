import { useState } from "react";
import { deleteUserPlant } from "../../../../services";
import { ConfirmDeleteModal, EditUserPlantModal } from "../../../modals";
import { EditUserPlantForm } from "./EditUserPlantForm";
import type { UserPlant } from "../../../../models/plant";

interface Props {
  plants: UserPlant[];
  setPlants: React.Dispatch<React.SetStateAction<UserPlant[]>>;
  fetchPlants: () => void;
}

export const UserPlantList = ({ plants, setPlants, fetchPlants }: Props) => {
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

  if (plants.length === 0) return <p className="text-md mt-3">Your plot is empty. Add a new plant now!</p>;

  return (
    <>
      <div className="mt-4 p-6 grid grid-cols-1 gap-4 xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl-grid-cols-5">
        {/* Plants */}
        {plants.map((plant) => (
          <div
            key={plant._id}
            className="rounded-lg shadow-md shadow-neutral-500 overflow-hidden flex flex-col items-center text-center"
          >
            <div className="w-full aspect-square overflow-hidden">
              <img src={plant.imgPublicUrl} alt={plant.nameByUser} className="w-full h-full object-cover" />
            </div>
            <p className="mt-2 font-semibold">{plant.nameByUser}</p>
            <p className="text-sm">{plant.scientific_name}</p>

            {/* Buttons */}
            <div className="flex gap-2 mt-2 mb-1 p-1 w-full">
              {/* Plant edit */}
              <button
                onClick={() => setEditingPlant(plant._id)}
                className="flex-1 cursor-pointer px-3 py-1 text-sm border rounded hover:bg-green-400 transition duration-300"
              >
                Edit
              </button>
              {editingPlant === plant._id && (
                <EditUserPlantModal isOpen={true} onClose={() => setEditingPlant(null)}>
                  <EditUserPlantForm plantId={plant._id} onEdited={fetchPlants} onClose={() => setEditingPlant(null)} />
                </EditUserPlantModal>
              )}

              {/* Plant delete */}
              <button
                onClick={() => setDeletingPlant(plant._id)}
                className="flex-1 cursor-pointer px-3 py-1 text-sm border rounded hover:bg-red-400 transition duration-300"
              >
                Delete
              </button>
              {deletingPlant === plant._id && (
                <ConfirmDeleteModal
                  isOpen={true}
                  onAccept={() => handleConfirmDelete(plant._id)}
                  onCancel={() => setDeletingPlant(null)}
                  onClose={() => setDeletingPlant(null)}
                />
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

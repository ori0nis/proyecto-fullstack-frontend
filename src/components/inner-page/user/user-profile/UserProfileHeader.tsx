import { useState } from "react";
import { AddNewUserPlantModal } from "../../../modals";
import { AddUserPlantFlow } from "./AddUserPlantFlow";

interface Props {
  fetchPlants: () => void;
}

export const UserProfileHeader = ({ fetchPlants }: Props) => {
  const [showAddPlantModal, setShowAddPlantModal] = useState<boolean>(false);

  return (
    <>
      <h2>Your Plants:</h2>
      <button onClick={() => setShowAddPlantModal((prev) => !prev)}>+</button>
      {showAddPlantModal && (
        <AddNewUserPlantModal isOpen={true} onClose={() => setShowAddPlantModal((prev) => !prev)}>
          <AddUserPlantFlow onClose={() => setShowAddPlantModal((prev) => !prev)} onAdded={fetchPlants} />
        </AddNewUserPlantModal>
      )}
    </>
  );
};

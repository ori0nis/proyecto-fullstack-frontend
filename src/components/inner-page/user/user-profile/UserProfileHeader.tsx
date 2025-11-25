import { useState } from "react";
import { AddNewUserPlantModal } from "../../../modals";
import { AddUserPlantFlow } from "./AddUserPlantFlow";

interface Props {
  fetchPlants: () => void;
}

export const UserProfileHeader = ({ fetchPlants }: Props) => {
  const [showAddPlantModal, setShowAddPlantModal] = useState<boolean>(false);

  return (
    <div className="flex flex-col gap-3 w-full border-t">
      <h2 className="text-2xl mt-3">Your plants:</h2>
      <button onClick={() => setShowAddPlantModal((prev) => !prev)} className="cursor-pointer w-fit text-md border pr-3 pl-3 pt-0.5 pb-0.5 rounded-lg font-medium"><span className="font-semibold">+ </span>Add plant</button>
      {showAddPlantModal && (
        <AddNewUserPlantModal isOpen={true} onClose={() => setShowAddPlantModal((prev) => !prev)}>
          <AddUserPlantFlow onClose={() => setShowAddPlantModal((prev) => !prev)} onAdded={fetchPlants} />
        </AddNewUserPlantModal>
      )}
    </div>
  );
};

import { useEffect, useState } from "react";
import type { Plant } from "../../../../models/plant";
import { getAllPlants } from "../../../../services";
import { AddNewNurseryPlantModal } from "../../../modals";
import { NewNurseryPlantForm } from "./NewNurseryPlantForm";

export const UserNursery = () => {
  const [plants, setPlants] = useState<Plant[]>([]);
  const [showNewPlantModal, setShowNewPlantModal] = useState<boolean>(false);

  useEffect(() => {
    const fetchPlants = async () => {
      try {
        const response = await getAllPlants();
        setPlants(response.data.plants);
      } catch (error) {
        console.error("Error fetching plants: ", error);
      }
    };
    fetchPlants();
  }, []);

  return (
    <>
      <h2>MyPlants Nursery</h2>
      <p>
        Welcome to the MyPlants Nursery! This collaborative repository contains all the plants known to our users. Want
        to add a new one?
      </p>
      <button onClick={() => setShowNewPlantModal((prev) => !prev)}>Request to add a new plant</button>
      {showNewPlantModal && (
        <AddNewNurseryPlantModal isOpen={showNewPlantModal} onClose={() => setShowNewPlantModal((prev) => !prev)}>
          <NewNurseryPlantForm onClose={() => setShowNewPlantModal((prev) => !prev)} />
        </AddNewNurseryPlantModal>
      )}
      {plants.map((plant) => (
        <div key={plant._id}>
          <img src={plant.imgPublicUrl} alt={plant.scientific_name} />
          <p>{plant.scientific_name}</p>
          <p>{plant.common_name}</p>
          <p>{plant.types}</p>
        </div>
      ))}
    </>
  );
};

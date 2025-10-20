import { useEffect, useState } from "react";
import { getUserPlants } from "../../../services";
import type { UserPlant } from "../../../models/plant";

export const UserPlantList = () => {
  const [plants, setPlants] = useState<UserPlant[]>([]);

  useEffect(() => {
    const fetchPlants = async () => {
      try {
        const response = await getUserPlants();
        setPlants(response.userPlants);
      } catch (error) {
        console.error("Error fetching plants: ", error);
      }
    };
    fetchPlants();
  }, []);

  return (
    <>
      <div>
        <h2>Your plants:</h2>
        {plants.map((plant, id) => (
          <div key={id}>
            <p>{plant.imgPublicUrl}</p>
            <p>{plant.nameByUser}</p>
          </div>
        ))}
      </div>
    </>
  );
};

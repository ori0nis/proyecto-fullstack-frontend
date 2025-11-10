import { useState } from "react";
import { flexiblePlantSearch } from "../../../../services";
import type { Plant } from "../../../../models/plant";
import { AddUserPlantForm } from "./AddUserPlantForm";

interface Props {
  onClose: () => void;
  onAdded: () => void;
}

export const AddUserPlantFlow = ({ onClose, onAdded }: Props) => {
  const [query, setQuery] = useState<string>("");
  const [results, setResults] = useState<Plant[]>([]);
  const [plantId, setPlantId] = useState<string>("");
  const [step, setStep] = useState<"form" | "search">("search");

  const handleSearch = async () => {
    try {
      const response = await flexiblePlantSearch(query);
      const plantData = response.data;

      if (plantData && plantData.plants && Array.isArray(plantData)) {
        setResults(plantData);
      } else {
        setResults([]);
      }
    } catch (error) {
      console.error("Error searching plants: ", error);
    }
  };

  const handleSelectPlant = (id: string) => {
    setPlantId(id);
    setStep("form");
  };

  if (step === "search") {
    return (
      <>
        <div>
          <h3>Find your plant in the MyPlants Nursery</h3>
          <input type="text" value={query} placeholder="Search plant..." onChange={(e) => setQuery(e.target.value)} />
          <button onClick={handleSearch}>Search</button>

          <div>
            {results.map((plant) => (
              <div key={plant._id}>
                <img src={plant.imgPublicUrl} alt={plant.scientific_name} />
                <p>{plant.scientific_name}</p>
                <button onClick={() => handleSelectPlant(plant._id)}>Select</button>
              </div>
            ))}
          </div>

          <button onClick={onClose}>Cancel</button>
        </div>
      </>
    );
  }

  if (step === "form") {
    return <AddUserPlantForm plantId={plantId} onClose={onClose} onAdded={onAdded} />;
  }

  return null;
};

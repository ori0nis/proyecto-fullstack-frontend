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
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async () => {
    setError(null);

    try {
      const response = await flexiblePlantSearch(query);
      const plantData = response.data;

      if (plantData && Array.isArray(plantData.plants)) {
        setResults(plantData.plants);
      } else {
        setResults([]);
      }
    } catch (error) {
      console.error("Error searching plants: ", error);

      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Couldn't find plant");
      }
    }
  };

  const handleSelectPlant = (id: string) => {
    setPlantId(id);
    setStep("form");
  };

  if (step === "search") {
    return (
      <>
        <div className="flex flex-col mt-2 gap-1">
          <h3 className="underline text-center font-semibold mt-2 text-md">Find your plant in the Nursery</h3>
          {/* Search */}
          <div className="flex justify-center mt-2 gap-1">
            <input
              type="text"
              value={query}
              placeholder="Search plant..."
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleSearch();
                }
              }}
              className="w-fit border border-gray-800 rounded-md p-1 placeholder: text-sm placeholder: text-gray-900"
            />
          </div>

          {/* Error */}
          {error && (
            <p className="text-[#c53030] text-sm font-medium font-[quicksand] mt-2">
              {error}
            </p>
          )}

          {/* Results */}
          <div className="flex flex-col gap-2 overflow-y-auto mt-3 pb-2">
            {results.map((plant) => (
              <div
                key={plant._id}
                className="w-full flex flex-row items-center gap-4 border border-gray-700 rounded-lg shadow-sm shadow-neutral-700"
              >
                {/* Img */}
                <img
                  src={plant.imgPublicUrl}
                  alt={plant.scientific_name}
                  className="w-28 h-28 object-cover rounded-md shrink-0"
                />
                {/* Info + select */}
                <div className="flex flex-col justify-center w-full text-center">
                  <p className="text-sm font-semibold leading-tight line-clamp-2">{plant.scientific_name}</p>
                  <button
                    onClick={() => handleSelectPlant(plant._id)}
                    className="cursor-pointer mt-2 self-center font-medium border border-gray-900 rounded-md px-3 py-1 "
                  >
                    Select
                  </button>
                </div>
              </div>
            ))}
          </div>
          {/* Buttons */}
          <div className="flex gap-2 justify-center">
            <button onClick={handleSearch} className="cursor-pointer font-medium border border-gray-900 rounded-md p-1">
              Search
            </button>
            <button
              onClick={onClose}
              className="cursor-pointer self-center font-medium border border-gray-900 rounded-md p-1 bg-[#c53030] opacity-90"
            >
              Cancel
            </button>
          </div>
        </div>
      </>
    );
  }

  if (step === "form") {
    return (
      <>
        <button onClick={() => setStep("search")} className="cursor-pointer font-medium mb-4 flex items-center gap-1">
          <svg width="21" height="21">
            <use href="/public/assets/spritesheet.svg#logout-icon" />
          </svg>
          Back
        </button>
        <AddUserPlantForm plantId={plantId} onClose={onClose} onAdded={onAdded} />
      </>
    );
  }

  return null;
};

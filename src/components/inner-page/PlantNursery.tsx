import { useEffect, useState } from "react";
import type { Plant } from "../../models/plant";
import {
  deletePlant,
  getAllPlants,
  getPlantsByCommonName,
  getPlantsByScientificName,
  getPlantsByType,
} from "../../services";
import { AddNewNurseryPlantModal, AdminEditPlant, ConfirmDeleteModal } from "../modals";
import { NewNurseryPlantForm } from "./user/user-nursery/NewNurseryPlantForm";
import { throttle } from "lodash";
import { useAuth } from "../../context";
import { AdminEditPlantForm } from "./admin";
import { PlantCardSkeleton } from ".";

export const PlantNursery = () => {
  const { user } = useAuth();
  const [plants, setPlants] = useState<Plant[]>([]);
  const [showNewPlantModal, setShowNewPlantModal] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  /* Pagination states */
  const [initialLoading, setInitialLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [loadingMore, setLoadingMore] = useState<boolean>(false);
  /* Debounce and search states */
  const [debouncedValue, setDebouncedValue] = useState<string>("");
  const [isDebouncing, setIsDebouncing] = useState<boolean>(false);
  const [searchType, setSearchType] = useState<string>("");
  const [searchValue, setSearchValue] = useState<string>("");
  /* Admin states */
  const [editingPlant, setEditingPlant] = useState<string | null>("");
  const [deletingPlant, setDeletingPlant] = useState<string | null>("");

  const fetchPlants = async (page = 1) => {
    if (page === 1) {
      setInitialLoading(true);
    } else {
      setLoadingMore(true);
    }

    setError(null);

    try {
      const response = await getAllPlants(page);
      const plantData = response.data;

      if (plantData && plantData.plants && Array.isArray(plantData.plants)) {
        if (page === 1) {
          setPlants(plantData.plants);
        } else {
          setPlants((prev) => [...prev, ...plantData.plants]);
        }

        const nextPageExists = !!plantData.meta?.hasMore;
        setHasMore(nextPageExists);
      } else {
        setHasMore(false);
        setPlants([]);
      }
    } catch (error) {
      console.error(error);
      alert("There was an error loading plants");

      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Error loading plants");
      }
    } finally {
      setInitialLoading(false);
      setLoadingMore(false);
    }
  };

  const searchPlants = async () => {
    if (!searchType || !debouncedValue.trim()) {
      fetchPlants(1);
      return;
    }

    setInitialLoading(true);
    setError(null);

    try {
      let response;
      let plantData;

      switch (searchType) {
        case "scientific_name":
          response = await getPlantsByScientificName(debouncedValue);
          plantData = response.data;
          break;
        case "common_name":
          response = await getPlantsByCommonName(debouncedValue);
          plantData = response.data;
          break;
        case "type":
          response = await getPlantsByType(debouncedValue);
          plantData = response.data;
      }

      if (plantData) {
        setPlants(plantData.plants);
      } else {
        setPlants([]);
      }
    } catch (error) {
      console.error(error);

      if (error instanceof Error) {
        console.error(error.message);
        setError(error.message);
        setPlants([]);
      } else {
        setError("Couldn't process your search");
      }
    } finally {
      setInitialLoading(false);
    }
  };

  const handleConfirmDelete = async (plantId: string) => {
    try {
      const response = await deletePlant(plantId);

      if (response.status === 200) {
        alert("Plant deleted successfully");
        setDeletingPlant(null);
        await fetchPlants(1);
      } else {
        alert("Couldn't delete plant");
      }
    } catch (error) {
      console.error("Couldn't delete plant: ", error);
    }
  };

  /* Fetch */
  useEffect(() => {
    fetchPlants(1);
  }, []);

  /* Pagination */
  useEffect(() => {
    if (page === 1) return;

    fetchPlants(page);
  }, [page]);

  /* Dynamic search */
  useEffect(() => {
    searchPlants();
  }, [debouncedValue, searchType]);

  /* Infinite scroll */
  useEffect(() => {
    const handleScroll = throttle(() => {
      if (initialLoading || loadingMore || !hasMore || debouncedValue) return;

      const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

      if (scrollHeight - scrollTop <= clientHeight * 2.5) {
        setPage((prev) => prev + 1);
      }
    }, 1500);

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [initialLoading, loadingMore, hasMore, debouncedValue]);

  /* Debounce */
  useEffect(() => {
    if (!searchValue || searchValue.trim() === "") {
      setDebouncedValue("");
      setIsDebouncing(false);
      fetchPlants(1);
      return;
    }

    setIsDebouncing(true);

    const timer = setTimeout(() => {
      setDebouncedValue(searchValue);
      setIsDebouncing(false);
    }, 600);

    return () => clearTimeout(timer);
  }, [searchValue]);

  return (
    <>
      <h2 className="text-xl mb-4">
        Welcome to the <span className="font-semibold">MyPlants Nursery</span>! This collaborative repository contains
        all the plants known to our users. Want to add a new one?
      </h2>

      {/* Add new plant */}
      <button
        onClick={() => setShowNewPlantModal((prev) => !prev)}
        className="cursor-pointer w-fit text-md border pr-3 pl-3 pt-0.5 pb-0.5 rounded-lg font-medium text-sm"
      >
        <span className="font-semibold">+ </span>Request to add new plant
      </button>
      {showNewPlantModal && (
        <AddNewNurseryPlantModal isOpen={showNewPlantModal} onClose={() => setShowNewPlantModal((prev) => !prev)}>
          <NewNurseryPlantForm onClose={() => setShowNewPlantModal((prev) => !prev)} />
        </AddNewNurseryPlantModal>
      )}

      {/* Plant search */}
      <div className="mt-4 flex flex-col gap-2">
        <label htmlFor="searchType" className="font-medium">
          Search for a plant:{" "}
        </label>
        <select
          name="searchType"
          id="searchType"
          value={searchType}
          onChange={(e) => setSearchType(e.target.value)}
          className="text-sm border p-1 rounded-lg max-w-[200px]"
        >
          <option value="">-- Choose a search type --</option>
          <option value="scientific_name">Scientific name</option>
          <option value="common_name">Common name</option>
          <option value="type">Type</option>
        </select>
        <div className="relative w-fit">
          <input
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            className="font-[quicksand] text-sm max-w-[200px] px-2 py-1 rounded-lg border border-gray-400 text-gray-800 placeholder:text-gray-400 placeholder:font-light focus:outline-none focus:ring-1 focus:ring-[#183f30] focus:border-[#183f30] transition-colors duration-200"
          />

          {/* Loading spinner */}
          {(isDebouncing || initialLoading) && (
            <div className="absolute right-2 top-1/2 -translate-y-1/2">
              <div className="h-4 w-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}
        </div>
      </div>

      {/* Card skeletons */}
      {initialLoading && plants.length === 0 && (
        <div className="mt-2 p-6 grid grid-cols-1 gap-4 xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-5">
          {Array.from({ length: 8 }).map((_, i) => (
            <PlantCardSkeleton key={i} />
          ))}
        </div>
      )}

      {/* Plants */}
      <div className="mt-2 p-6 grid grid-cols-1 gap-4 xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-5">
        {plants.map((plant) => (
          <div
            key={plant._id}
            className="rounded-lg shadow-md shadow-neutral-500 overflow-hidden flex flex-col items-center text-center"
          >
            <div className="w-full aspect-square overflow-hidden">
              <img src={plant.imgPublicUrl} alt={plant.scientific_name} className="w-full h-full object-cover" />
            </div>
            <p className="mt-2 font-semibold">{plant.scientific_name}</p>
            <p className="text-sm">{plant.common_name}</p>
            <p className="mt-1 mb-1 text-sm">Type: {plant.type}</p>

            {/* Edition for admin */}
            {user?.role === "admin" && (
              <div className="flex gap-2 mt-2 mb-1 p-1 w-full">
                <button
                  onClick={() => {
                    setEditingPlant(plant._id);
                  }}
                  className="flex-1 cursor-pointer px-3 py-1 text-sm border rounded hover:bg-green-400 transition duration-300"
                >
                  Edit plant
                </button>
                {editingPlant === plant._id && (
                  <AdminEditPlant isOpen={true} onClose={() => setEditingPlant(null)}>
                    <AdminEditPlantForm
                      plantId={plant._id}
                      onClose={() => setEditingPlant(null)}
                      onSuccess={() => {
                        fetchPlants(1);
                        setEditingPlant(null);
                      }}
                    />
                  </AdminEditPlant>
                )}

                {/* Deletion for admin */}
                <button
                  onClick={() => {
                    setDeletingPlant(plant._id);
                  }}
                  className="flex-1 cursor-pointer px-3 py-1 text-sm border rounded hover:bg-red-400 transition duration-300"
                >
                  Delete plant
                </button>
                {deletingPlant === plant._id && (
                  <ConfirmDeleteModal
                    isOpen={true}
                    onAccept={() => {
                      handleConfirmDelete(plant._id);
                      fetchPlants(1);
                    }}
                    onCancel={() => setDeletingPlant(null)}
                    onClose={() => setDeletingPlant(null)}
                  />
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* States */}
      {loadingMore && hasMore && plants.length > 0 && (
        <div className="mt-2 p-6 grid grid-cols-1 gap-4 xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-5">
          {Array.from({ length: 5 }).map((_, i) => (
            <PlantCardSkeleton key={i} />
          ))}
        </div>
      )}
      {error && <p>{error}</p>}
      {!hasMore && <p className="text-center mb-4 font-medium">You're all caught up!</p>}
    </>
  );
};

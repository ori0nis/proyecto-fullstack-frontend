import { useEffect, useState } from "react";
import type { Plant } from "../../models/plant";
import { deletePlant, getAllPlants } from "../../services";
import { AddNewNurseryPlantModal, AdminEditPlant, ConfirmDeleteModal } from "../modals";
import { NewNurseryPlantForm } from "./user/user-nursery/NewNurseryPlantForm";
import { throttle } from "lodash";
import { useAuth } from "../../context";
import { AdminEditPlantForm } from "./admin";

export const PlantNursery = () => {
  const { user } = useAuth();
  const [plants, setPlants] = useState<Plant[]>([]);
  const [showNewPlantModal, setShowNewPlantModal] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  /* Pagination states */
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);
  /* Admin states */
  const [editingPlant, setEditingPlant] = useState<string | null>("");
  const [deletingPlant, setDeletingPlant] = useState<string | null>("");

  const fetchPlants = async (page = 1) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

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
        setSuccess(true);
      } else {
        setHasMore(false);
        setSuccess(false);
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
      setLoading(false);
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

  useEffect(() => {
    fetchPlants(1);
  }, []);

  useEffect(() => {
    if (page === 1) return;

    fetchPlants(page);
  }, [page]);

  useEffect(() => {
    const handleScroll = throttle(() => {
      if (loading || !hasMore) return;

      const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

      if (scrollHeight - scrollTop <= clientHeight * 1.5) {
        setPage((prev) => prev + 1);
      }
    }, 1500);

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading, hasMore]);

  return (
    <>
      <h2>MyPlants Nursery</h2>
      <p>
        Welcome to the MyPlants Nursery! This collaborative repository contains all the plants known to our users. Want
        to add a new one?
      </p>

      {/* Add new plant */}
      <button onClick={() => setShowNewPlantModal((prev) => !prev)}>Request to add a new plant</button>
      {showNewPlantModal && (
        <AddNewNurseryPlantModal isOpen={showNewPlantModal} onClose={() => setShowNewPlantModal((prev) => !prev)}>
          <NewNurseryPlantForm onClose={() => setShowNewPlantModal((prev) => !prev)} />
        </AddNewNurseryPlantModal>
      )}

      {/* Plants */}
      {plants.map((plant) => (
        <div key={plant._id}>
          <img src={plant.imgPublicUrl} alt={plant.scientific_name} />
          <p>{plant.scientific_name}</p>
          <p>{plant.common_name}</p>
          <p>{plant.types}</p>

          {/* Edition for admin */}
          {user?.role === "admin" && (
            <div>
              <button
                onClick={() => {
                  setEditingPlant(plant._id);
                }}
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

      {/* Loader */} {/* // TODO: Replace with spinner  */}
      {loading && plants.length > 0 && <p>Loading more plants...</p>}
      
      {error && <p>{error}</p>}
      {success && <p>Successfully loaded plants!</p>}
      {!hasMore && <p>You're all caught up!</p>}
    </>
  );
};

import { API } from "../config";
import type { NewPlant, Plant } from "../models/plant";
import { axiosErrorHandler } from "../utils";

// GET ALL PLANTS
export const getAllPlants = async (): Promise<Plant> => {
  try {
    const response = await API.get("/plants/all-plants");

    return response.data.data;
  } catch (error) {
    throw axiosErrorHandler(error);
  }
};

// GET PLANT BY ID
export const getPlantById = async (id: string): Promise<Plant> => {
  try {
    const response = await API.get(`/plants/${id}`);

    return response.data.data;
  } catch (error) {
    throw axiosErrorHandler(error);
  }
};

// GET PLANT BY SCIENTIFIC NAME
export const getPlantsByScientificName = async (scientific_name: string): Promise<Plant[]> => {
  try {
    const response = await API.get(`/plants/search/scientific-name`, { params: { scientific_name } });

    return response.data.data;
  } catch (error) {
    throw axiosErrorHandler(error);
  }
};

// GET PLANT BY COMMON NAME
export const getPlantsByCommonName = async (common_name: string): Promise<Plant[]> => {
  try {
    const response = await API.get(`/plants/search/common-name`, { params: { common_name } });

    return response.data.data;
  } catch (error) {
    throw axiosErrorHandler(error);
  }
};

// GET PLANT BY TYPE
export const getPlantsByType = async (type: string): Promise<Plant[]> => {
  try {
    const response = await API.get(`/plants/search/type`, { params: { type } });

    return response.data.data;
  } catch (error) {
    throw axiosErrorHandler(error);
  }
};

// FLEXIBLE PLANT SEARCH (meant to be the pre-search of UserPlant add)
export const flexiblePlantSearch = async (query: string): Promise<Plant[]> => {
  try {
    const response = await API.get(`/plants/search`, { params: { query } });

    return response.data.data;
  } catch (error) {
    throw axiosErrorHandler(error);
  }
};

// POST NEW PLANT (UNIVERSAL REPOSITORY)
export const postNewPlant = async (plant: NewPlant): Promise<Plant> => {
  try {
    const formData = new FormData();

    formData.append("scientific_name", plant.scientific_name);
    formData.append("common_name", plant.common_name);
    formData.append("type", plant.type);
    formData.append("plantImg", plant.plantImg);

    const response = await API.post("/plants/new-plant", plant, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data.data;
  } catch (error) {
    throw axiosErrorHandler(error);
  }
};

// EDIT PLANT (UNIVERSAL REPOSITORY)
export const editPlant = async (id: string, plant: Partial<NewPlant>): Promise<Plant> => {
  try {
    const formData = new FormData();

    if (plant.common_name) formData.append("common_name", plant.common_name);
    if (plant.scientific_name) formData.append("scientific_name", plant.scientific_name);
    if (plant.type) formData.append("type", plant.type);
    if (plant.plantImg) formData.append("imgPath", plant.plantImg); // imgPath coincides with backend name

    const response = await API.put(`/plants/plant/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data.data;
  } catch (error) {
    throw axiosErrorHandler(error);
  }
};

// DELETE PLANT (UNIVERSAL REPOSITORY)
export const deletePlant = async (id: string): Promise<Plant> => {
  try {
    const response = await API.delete(`/plants/plant/${id}`);

    return response.data.data;
  } catch (error) {
    throw axiosErrorHandler(error);
  }
};

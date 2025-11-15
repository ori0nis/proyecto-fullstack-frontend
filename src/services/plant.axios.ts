import { API } from "../config";
import type { NewPlant, Plant, PlantResponse } from "../models/plant";
import { axiosErrorHandler } from "../utils";

// GET ALL PLANTS (UNIVERSAL REPOSITORY)
export const getAllPlants = async (page = 1, limit = 20): Promise<PlantResponse<Plant>> => {
  try {
    const response = await API.get("/plants/all-plants", { params: { page, limit } });

    return response.data;
  } catch (error) {
    throw axiosErrorHandler(error);
  }
};

// GET PLANT BY ID (UNIVERSAL REPOSITORY)
export const getPlantById = async (id: string): Promise<PlantResponse<Plant>> => {
  try {
    const response = await API.get(`/plants/${id}`);

    return response.data;
  } catch (error) {
    throw axiosErrorHandler(error);
  }
};

// GET PLANTS BY SCIENTIFIC NAME (UNIVERSAL REPOSITORY)
export const getPlantsByScientificName = async (
  scientific_name: string,
  page = 1,
  limit = 20
): Promise<PlantResponse<Plant>> => {
  try {
    const response = await API.get(`/plants/search/scientific-name`, { params: { scientific_name, page, limit } });

    return response.data;
  } catch (error) {
    throw axiosErrorHandler(error);
  }
};

// GET PLANTS BY COMMON NAME (UNIVERSAL REPOSITORY)
export const getPlantsByCommonName = async (
  common_name: string,
  page = 1,
  limit = 20
): Promise<PlantResponse<Plant>> => {
  try {
    const response = await API.get(`/plants/search/common-name`, { params: { common_name, page, limit } });

    return response.data;
  } catch (error) {
    throw axiosErrorHandler(error);
  }
};

// GET PLANTS BY TYPE (UNIVERSAL REPOSITORY)
export const getPlantsByType = async (type: string, page = 1, limit = 20): Promise<PlantResponse<Plant>> => {
  try {
    const response = await API.get(`/plants/search/type`, { params: { type, page, limit } });

    return response.data;
  } catch (error) {
    throw axiosErrorHandler(error);
  }
};

// FLEXIBLE PLANT SEARCH (meant to be the pre-search of UserPlant add)
export const flexiblePlantSearch = async (query: string, page = 1, limit = 20): Promise<PlantResponse<Plant>> => {
  try {
    const response = await API.get(`/plants/search`, { params: { query, page, limit } });

    return response.data;
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

    return response.data;
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

    return response.data;
  } catch (error) {
    throw axiosErrorHandler(error);
  }
};

// DELETE PLANT (UNIVERSAL REPOSITORY)
export const deletePlant = async (id: string): Promise<{ status: number; data: Plant }> => {
  try {
    const response = await API.delete(`/plants/plant/${id}`);

    return {
      data: response.data,
      status: response.status,
    };
  } catch (error) {
    throw axiosErrorHandler(error);
  }
};

import dotenv from "dotenv";
import { API } from "../config";
import type { LoginUser, NewUser, PublicUser, UpdatedUser, UserProfile } from "../models/user";
import { axiosErrorHandler } from "../utils";
import type { NewUserPlant } from "../models/plant";

dotenv.config();
const API_AUTH_ENDPOINT = process.env.API_AUTH_ENDPOINT;
const API_REFRESH_TOKEN_ENDPOINT = process.env.API_REFRESH_TOKEN_ENDPOINT;

if (!API_AUTH_ENDPOINT) throw new Error("API_AUTH_ENDPOINT isn't defined in .env");
if (!API_REFRESH_TOKEN_ENDPOINT) throw new Error("API_REFRESH_TOKEN_ENDPOINT isn't defined in .env");

// REGISTER
export const registerUser = async (user: NewUser): Promise<PublicUser> => {
  try {
    const response = await API.post("/users/register", {
      username: user.username.trim(),
      email: user.email.toLowerCase().trim(),
      password: user.password,
      plant_care_skill_level: user.plant_care_skill_level.trim(),
    });

    return response.data.data;
  } catch (error) {
    throw axiosErrorHandler(error);
  }
};

// GET CURRENT USER (FOR AUTH REASONS)
export const getCurrentUser = async (): Promise<PublicUser> => {
  try {
    const response = await API.get(API_AUTH_ENDPOINT);

    return response.data.data;
  } catch (error) {
    throw axiosErrorHandler(error);
  }
};

// REFRESH TOKEN
export const refreshToken = async (): Promise<void> => {
  try {
    await API.post(API_REFRESH_TOKEN_ENDPOINT);
  } catch (error) {
    throw axiosErrorHandler(error);
  }
};

// LOGIN
export const loginUser = async (user: LoginUser): Promise<PublicUser> => {
  try {
    const response = await API.post("/users/login", {
      email: user.email.trim(),
      password: user.password,
    });

    return response.data.data;
  } catch (error) {
    throw axiosErrorHandler(error);
  }
};

// LOGOUT
export const logoutUser = async (): Promise<void> => {
  try {
    await API.post("/users/logout");
  } catch (error) {
    throw axiosErrorHandler(error);
  }
};

// GET ALL USERS (ADMIN ONLY)
export const getAllUsers = async (): Promise<PublicUser[]> => {
  try {
    const response = await API.get("/users/search/all-users");

    return response.data.data;
  } catch (error) {
    throw axiosErrorHandler(error);
  }
};

// GET USER BY ID (ADMIN ONLY)
export const getUserById = async (id: string): Promise<PublicUser> => {
  try {
    const response = await API.get(`/users/${id}`);

    return response.data.data;
  } catch (error) {
    throw axiosErrorHandler(error);
  }
};

// GET USER BY EMAIL (ADMIN ONLY)
export const getUserByEmail = async (email: string): Promise<PublicUser> => {
  try {
    const response = await API.get("/users/search/user/email", { params: { email } });

    return response.data.data;
  } catch (error) {
    throw axiosErrorHandler(error);
  }
};

// GET USER BY USERNAME (PUBLIC)
export const getUserByUsername = async (username: string): Promise<UserProfile> => {
  try {
    const response = await API.get("/users/search/user/username", { params: { username } });

    return response.data.data;
  } catch (error) {
    throw axiosErrorHandler(error);
  }
};

// EDIT USER (in multipart form, to accept local images)
export const editUser = async (id: string, updates: Partial<UpdatedUser>): Promise<PublicUser> => {
  try {
    const formData = new FormData();

    if (updates.email) formData.append("email", updates.email);
    if (updates.username) formData.append("username", updates.username);
    if (updates.plant_care_skill_level) formData.append("plant_care_skill_level", updates.plant_care_skill_level);
    if (updates.plants) {
      updates.plants.forEach((plant) => {
        formData.append("plants", plant);
      });
    }
    if (updates.plantImg) formData.append("imgPath", updates.plantImg); // imgPath mirrors the backend name

    const response = await API.put(`/users/user/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data.data;
  } catch (error) {
    throw axiosErrorHandler(error);
  }
};

// CHANGE PASSWORD
export const changePassword = async (id: string, oldPassword: string, newPassword: string): Promise<PublicUser> => {
  try {
    const response = await API.patch(`/users/user/${id}/change-password`, {
      oldPassword: oldPassword,
      newPassword: newPassword,
    });

    return response.data.data;
  } catch (error) {
    throw axiosErrorHandler(error);
  }
};

// ADD PLANT TO USER PROFILE (must be preceded by flexiblePlantSearch() in frontend flux)
export const addPlantToUserProfile = async (plantId: string, newUserPlant: NewUserPlant): Promise<PublicUser> => {
  try {
    const formData = new FormData();

    formData.append("nameByUser", newUserPlant.nameByUser);
    formData.append("imgPath", newUserPlant.plantImg); // imgPath coincides with backend name
    formData.append("plantId", plantId);

    const response = await API.post("/users/user", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data.data;
  } catch (error) {
    throw axiosErrorHandler(error);
  }
};

// EDIT USER PLANT
export const editUserPlant = async (plantId: string, updates: Partial<NewUserPlant>): Promise<PublicUser> => {
  try {
    const formData = new FormData();

    if (updates.nameByUser) formData.append("nameByUser", updates.nameByUser);
    if (updates.plantImg) formData.append("imgPath", updates.plantImg); // imgPath coincides with backend name

    const response = await API.put(`/users/user/profile/plant/${plantId}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data.data;
  } catch (error) {
    throw axiosErrorHandler(error);
  }
};

// DELETE USER PLANT
export const deleteUserPlant = async (plantId: string) => {
  try {
    const response = await API.delete(`/users/user/profile/plant/${plantId}`);

    return response.data.data;
  } catch (error) {
    throw axiosErrorHandler(error);
  }
};

// DELETE USER
export const deleteUser = async (id: string): Promise<PublicUser> => {
  try {
    const response = await API.delete(`/users/user/${id}`);

    return response.data.data;
  } catch (error) {
    throw axiosErrorHandler(error);
  }
};

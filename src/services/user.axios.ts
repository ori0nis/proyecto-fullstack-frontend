import { API } from "../config";
import type { LoginUser, NewUser, PublicUser, UserProfile, UserResponse } from "../models/user";
import { axiosErrorHandler } from "../utils";
import type { NewUserPlant, UserPlantData, UserPlantResponse } from "../models/plant";

const VITE_API_AUTH_ENDPOINT = import.meta.env.VITE_API_AUTH_ENDPOINT;
const VITE_API_REFRESH_TOKEN_ENDPOINT = import.meta.env.VITE_API_REFRESH_TOKEN_ENDPOINT;

if (!VITE_API_AUTH_ENDPOINT) throw new Error("VITE_API_AUTH_ENDPOINT isn't defined in .env");
if (!VITE_API_REFRESH_TOKEN_ENDPOINT) throw new Error("VITE_API_REFRESH_TOKEN_ENDPOINT isn't defined in .env");

// REGISTER
export const registerUser = async (user: NewUser): Promise<UserResponse<PublicUser>> => {
  try {
    const response = await API.post("/users/register", {
      username: user.username.trim(),
      email: user.email.toLowerCase().trim(),
      password: user.password,
      plant_care_skill_level: user.plant_care_skill_level.trim(),
    });

    return response.data;
  } catch (error) {
    throw axiosErrorHandler(error);
  }
};

// GET CURRENT USER (FOR AUTH REASONS)
export const getCurrentUser = async (): Promise<UserResponse<PublicUser>> => {
  try {
    const response = await API.get(VITE_API_AUTH_ENDPOINT);

    return response.data;
  } catch (error) {
    throw axiosErrorHandler(error);
  }
};

// REFRESH TOKEN
export const refreshToken = async (): Promise<void> => {
  try {
    await API.post(VITE_API_REFRESH_TOKEN_ENDPOINT);
  } catch (error) {
    throw axiosErrorHandler(error);
  }
};

// LOGIN
export const loginUser = async (user: LoginUser): Promise<UserResponse<PublicUser>> => {
  try {
    const response = await API.post("/users/login", {
      email: user.email.trim(),
      password: user.password,
    });

    return response.data;
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
export const getAllUsers = async (page = 1, limit = 20): Promise<UserResponse<PublicUser[]>> => {
  try {
    const response = await API.get("/users/search/all-users", { params: { page, limit } });

    return response.data;
  } catch (error) {
    throw axiosErrorHandler(error);
  }
};

// GET USER BY ID (ADMIN ONLY)
export const getUserById = async (id: string): Promise<UserResponse<PublicUser>> => {
  try {
    const response = await API.get(`/users/${id}`);

    return response.data;
  } catch (error) {
    throw axiosErrorHandler(error);
  }
};

// GET USER BY EMAIL (ADMIN ONLY)
export const getUserByEmail = async (email: string): Promise<UserResponse<PublicUser>> => {
  try {
    const response = await API.get("/users/search/user/email", { params: { email } });

    return response.data;
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
export const editUser = async (id: string, updates: Partial<NewUser>): Promise<UserResponse<PublicUser>> => {
  try {
    const formData = new FormData();

    if (updates.email && updates.email.trim() !== "") formData.append("email", updates.email);
    if (updates.username && updates.username.trim() !== "") formData.append("username", updates.username);
    if (updates.plant_care_skill_level) formData.append("plant_care_skill_level", updates.plant_care_skill_level);
    if (updates.profilePic) formData.append("imgPath", updates.profilePic); // imgPath mirrors the backend name
    if (updates.password) formData.append("currentPassword", updates.password); //currentPassword mirrors the backend name

    const response = await API.put(`/users/user/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (error) {
    throw axiosErrorHandler(error);
  }
};

// CHANGE PASSWORD
export const changePassword = async (
  id: string,
  oldPassword: string,
  newPassword: string
): Promise<UserResponse<PublicUser>> => {
  try {
    const response = await API.patch(`/users/user/${id}/change-password`, {
      oldPassword: oldPassword,
      newPassword: newPassword,
    });

    return response.data;
  } catch (error) {
    throw axiosErrorHandler(error);
  }
};

// GET USER PLANTS
export const getUserPlants = async (): Promise<UserPlantResponse<UserPlantData>> => {
  try {
    const response = await API.get("/users/user/profile/plants");

    return response.data;
  } catch (error) {
    throw axiosErrorHandler(error);
  }
};

// ADD PLANT TO USER PROFILE (must be preceded by flexiblePlantSearch() in frontend flux)
export const addPlantToUserProfile = async (
  plantId: string,
  newUserPlant: NewUserPlant
): Promise<UserResponse<PublicUser>> => {
  try {
    const formData = new FormData();

    formData.append("nameByUser", newUserPlant.nameByUser);
    if (newUserPlant.plantImg) formData.append("imgPath", newUserPlant.plantImg); // imgPath coincides with backend name
    formData.append("plantId", plantId);

    const response = await API.post("/users/user/profile/new-plant", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (error) {
    throw axiosErrorHandler(error);
  }
};

// EDIT USER PLANT
export const editUserPlant = async (
  plantId: string,
  updates: Partial<NewUserPlant>
): Promise<UserResponse<PublicUser>> => {
  try {
    const formData = new FormData();

    if (updates.nameByUser) formData.append("nameByUser", updates.nameByUser);
    if (updates.plantImg) formData.append("imgPath", updates.plantImg); // imgPath coincides with backend name

    const response = await API.put(`/users/user/profile/plant/${plantId}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (error) {
    throw axiosErrorHandler(error);
  }
};

// DELETE USER PLANT
export const deleteUserPlant = async (plantId: string): Promise<UserResponse<PublicUser>> => {
  try {
    const response = await API.delete(`/users/user/profile/plant/${plantId}`);

    return response.data;
  } catch (error) {
    throw axiosErrorHandler(error);
  }
};

// DELETE USER
export const deleteUser = async (id: string, password: string): Promise<UserResponse<PublicUser>> => {
  try {
    const response = await API.delete(`/users/user/${id}`, { data: { password } });

    return response.data;
  } catch (error) {
    throw axiosErrorHandler(error);
  }
};

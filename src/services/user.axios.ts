import axios from "axios";
import dotenv from "dotenv";
import { API } from "../config";
import type { LoginUser, NewUser, PublicUser, User } from "../models/user";

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

    const data = response.data.data;

    return data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      const backendError = error.response.data;
      throw new Error(backendError.message || "Unexpected error");
    } else {
      throw new Error("Network error or unexpected issue");
    }
  }
};

// GET CURRENT USER (FOR AUTH REASONS)
export const getCurrentUser = async (): Promise<User> => {
  try {
    const response = await API.get(API_AUTH_ENDPOINT);
    const user = response.data.data;

    return user;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      const backendError = error.response.data;
      throw new Error(backendError.message || "Unexpected error");
    } else {
      throw new Error("Network error or unexpected issues");
    }
  }
};

// REFRESH TOKEN
export const refreshToken = async (): Promise<void> => {
  try {
    await API.post(API_REFRESH_TOKEN_ENDPOINT);
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      const backendError = error.response.data;
      throw new Error(backendError.message || "Unexpected error");
    } else {
      throw new Error("Network error or unexpected issue");
    }
  }
};

// LOGIN
export const loginUser = async (user: LoginUser): Promise<PublicUser> => {
  try {
    const response = await API.post("/users/login", {
      email: user.email.trim(),
      password: user.password,
    });

    const data = response.data.data;

    return data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      const backendError = error.response.data;
      throw new Error(backendError.message || "Unexpected error");
    } else {
      throw new Error("Network error or unexpected issue");
    }
  }
};

// LOGOUT
export const logoutUser = async (): Promise<void> => {
  try {
    await API.post("/users/logout");
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      const backendError = error.response.data;
      throw new Error(backendError.message || "Unexpected error");
    } else {
      throw new Error("Network error or unexpected issue");
    }
  }
};

import axios, { AxiosError, type InternalAxiosRequestConfig, type AxiosInstance, type AxiosResponse } from "axios";
import { logoutUser, refreshToken } from "../services";

const VITE_API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
if (!VITE_API_BASE_URL) throw new Error("VITE_API_BASE_URL isn't defined in .env");

interface AxiosRequestConfigWithRetry extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

const handleLogout = async () => {
  try {
    await logoutUser();
  } catch (error) {
    console.error(error);
  } finally {
    window.location.href = "/login";
  }
};

// AXIOS API
export const API: AxiosInstance = axios.create({
  baseURL: VITE_API_BASE_URL,
  withCredentials: true,
});

// AXIOS INTERCEPTOR FOR TOKEN REFRESH
API.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as AxiosRequestConfigWithRetry;
    const publicRequest =
      originalRequest?.url?.includes("/login") ||
      originalRequest?.url?.includes("/register") ||
      originalRequest.url?.includes("/refresh");

    // If request is public, don't throw 401
    if (publicRequest) return Promise.reject(error);

    // If 401 is received and user isn't trying to refresh
    if (error.response?.status === 401 && !originalRequest?._retry) {
      originalRequest._retry = true;
      try {
        // Call refresh endpoint
        await refreshToken();
        // Retry original request
        return API(originalRequest);
      } catch (refreshError) {
        console.error("Refresh token expired or invalid");
        await handleLogout();
        return Promise.reject(refreshError);
      }
    }

    // If it wasn't a 401 or refresh failed, return original error
    return Promise.reject(error);
  }
);

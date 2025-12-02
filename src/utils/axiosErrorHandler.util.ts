import axios from "axios";

export const axiosErrorHandler = (error: unknown): Error => {
  if (axios.isAxiosError(error) && error.response) {
    const backendError = error.response.data?.message || "Unexpected error"
    return new Error(backendError);
  } else {
    return new Error("Network error or unexpected issue");
  }
};

import { InternalAxiosRequestConfig } from "axios";
import { axiosInstance } from "./axios-client-instance";
import { handleApiError } from "@/utils/errorHandler";

axiosInstance.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("accessToken") : null;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (typeof window !== "undefined") {
      handleApiError(error);
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;

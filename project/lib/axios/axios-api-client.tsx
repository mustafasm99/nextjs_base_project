import axiosInstance from "./axios-client-instance";

export type Json = Record<string, unknown>;

export const apiClient = {
  get: async <T,>(url: string, params?: Json): Promise<T> => {
    const response = await axiosInstance.get<T>(url, { params });
    return response.data;
  },
  post: async <T,>(url: string, data?: Json): Promise<T> => {
    const response = await axiosInstance.post<T>(url, data);
    return response.data;
  },
  put: async <T,>(url: string, data?: Json): Promise<T> => {
    const response = await axiosInstance.put<T>(url, data);
    return response.data;
  },
  delete: async <T,>(url: string): Promise<T> => {
    const response = await axiosInstance.delete<T>(url);
    return response.data;
  },
  upload: async <T,>(url: string, formData: FormData): Promise<T> => {
    const response = await axiosInstance.post<T>(url, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  },
};
export default apiClient;

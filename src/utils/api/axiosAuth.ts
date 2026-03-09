import axios, {
  type AxiosInstance,
  type InternalAxiosRequestConfig,
  type AxiosResponse,
  AxiosError,
} from "axios";
import {
  getValidAccessToken,
  clearTokensAndLogout,
} from "@/utils/token-management";

const axiosInstance: AxiosInstance = axios.create();

// Request interceptor to add access token from token-management
axiosInstance.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    const token = await getValidAccessToken();
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: unknown) =>
    Promise.reject(error instanceof Error ? error : new Error(String(error))),
);

// Response interceptor to handle 401 and refresh token using token-management
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };
    if (
      error.response?.status === 401 &&
      originalRequest &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      try {
        // Try to refresh the access token using token-management
        const refreshedToken = await getValidAccessToken({ isSetToken: true });
        if (refreshedToken && originalRequest.headers) {
          originalRequest.headers.Authorization = `Bearer ${refreshedToken}`;
          return axiosInstance(originalRequest);
        } else {
          clearTokensAndLogout();
        }
      } catch (refreshError) {
        clearTokensAndLogout();
        return Promise.reject(
          refreshError instanceof Error
            ? refreshError
            : new Error(String(refreshError)),
        );
      }
    }
    return Promise.reject(
      error instanceof Error ? error : new Error(String(error)),
    );
  },
);

export { axiosInstance };

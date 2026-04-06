import axios from "axios";
import { env } from "../config/env";
import { requestInterceptor, responseInterceptor, errorInterceptor } from "./interceptors";

/**
 * Standard Axios Client for the Expo Template.
 * Optimized for React Query, typed responses, and centralized error handling.
 */
const apiClient = axios.create({
  baseURL: env.EXPO_PUBLIC_API_URL ?? "https://api.example.com",
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Register Interceptors
apiClient.interceptors.request.use(requestInterceptor);
apiClient.interceptors.response.use(responseInterceptor, errorInterceptor);

export default apiClient;

import { AxiosError, InternalAxiosRequestConfig, AxiosResponse } from "axios";
import { logger } from "../utils/logger";
import { errorTracking } from "../services/ErrorTracking";

/**
 * Request Interceptor: Adds Auth tokens and logs requests in DEV.
 */
export const requestInterceptor = (config: InternalAxiosRequestConfig) => {
  if (__DEV__) {
    logger.info(`[API Request] ${config.method?.toUpperCase()} ${config.url}`);
  }

  // Example: Add Auth token from SecureStore or state
  // const token = await SecureStore.getItemAsync('auth_token');
  // if (token) config.headers.Authorization = `Bearer ${token}`;

  return config;
};

/**
 * Response Interceptor: Logs successes and handles global errors.
 */
export const responseInterceptor = (response: AxiosResponse) => {
  if (__DEV__) {
    logger.info(`[API Success] ${response.config.method?.toUpperCase()} ${response.config.url}`);
  }
  return response;
};

/**
 * Error Interceptor: Centralized error handling and reporting.
 */
export const errorInterceptor = (error: AxiosError) => {
  const { config, response } = error;

  const status = response?.status;
  const message = (response?.data as any)?.message || error.message;

  logger.error(`[API Error] ${config?.method?.toUpperCase()} ${config?.url}`, {
    status,
    message,
  });

  // Report critical errors to Sentry
  if (status && status >= 500) {
    errorTracking.captureException(error, {
      context: "api_error",
      status,
      url: config?.url,
    });
  }

  // Handle 401 Unauthorized (Token expired)
  if (status === 401) {
    // Trigger global logout or token refresh
  }

  return Promise.reject(error);
};

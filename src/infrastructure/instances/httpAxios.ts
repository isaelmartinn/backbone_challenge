import axios from "axios";
import { ElMessage } from "element-plus";
import type { Http } from "@domain/repositories/Http";

const headers = {
  "Content-Type": "application/json",
};

export const httpAxios: Http = {
  get: async <T>(path: string, params?: Record<string, any>, config?: any) => {
    try {
      const response = await axios.get(path, {
        ...config,
        params: params,
        headers,
      });

      return { isOk: true, data: response.data, error: null } as T;
    } catch (error) {
      const err = axios.isAxiosError(error)
        ? error.response?.data
        : { message: "An unexpected error occurred" };

      ElMessage({
        type: "error",
        duration: 4000,
        message: err.message,
      });

      return { isOk: false, data: null, error: err } as T;
    }
  },

  post: async <T>(path: string, params?: Record<string, any>, config?: any) => {
    try {
      const response = await axios.post(
        path,
        { ...params },
        { ...config, headers }
      );

      return { isOk: true, data: response.data, error: null } as T;
    } catch (error) {
      const err = axios.isAxiosError(error)
        ? error.response?.data
        : { message: "An unexpected error occurred" };

      ElMessage({
        type: "error",
        duration: 4000,
        message: err.message,
      });

      return { isOk: false, data: null, error: err } as T;
    }
  },

  put: async <T>(path: string, params?: Record<string, any>, config?: any) => {
    try {
      const response = await axios.put(
        path,
        { ...params },
        { ...config, headers }
      );

      return { isOk: true, data: response.data, error: null } as T;
    } catch (error) {
      const err = axios.isAxiosError(error)
        ? error.response?.data
        : { message: "An unexpected error occurred" };

      ElMessage({
        type: "error",
        duration: 4000,
        message: err.message,
      });

      return { isOk: false, data: null, error: err } as T;
    }
  },

  delete: async <T>(path: string, params?: any, config?: any) => {
    try {
      const response = await axios.delete(path, {
        ...config,
        params: params,
        headers,
      });

      return { isOk: true, data: response.data, error: null } as T;
    } catch (error) {
      const err = axios.isAxiosError(error)
        ? error.response?.data
        : { message: "An unexpected error occurred" };

      ElMessage({
        type: "error",
        duration: 4000,
        message: err.message,
      });

      return { isOk: false, data: null, error: err } as T;
    }
  },
};

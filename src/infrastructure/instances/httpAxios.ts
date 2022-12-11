import axios from "axios";
import type { Http } from "@domain/repositories/Http";

const headers = {
  "Content-Type": "application/json",
};

export const httpAxios: Http = {
  get: async <T>(path: string, params?: Record<string, any>, config?: any) => {
    const response = await axios.get(path, {
      ...config,
      params: params,
      headers,
    });

    return response.data as T;
  },

  post: async <T>(path: string, params?: Record<string, any>, config?: any) => {
    const response = await axios.get(path, {
      ...config,
      params: params,
      headers,
    });

    return response.data as T;
  },

  put: async <T>(path: string, params?: Record<string, any>, config?: any) => {
    const response = await axios.get(path, {
      ...config,
      params: params,
      headers,
    });

    return response.data as T;
  },

  delete: async <T>(path: string, params?: any, config?: any) => {
    const response = await axios.delete(path, {
      ...config,
      params: params,
      headers,
    });

    return response.data as T;
  },
};

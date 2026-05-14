import Axios, { AxiosRequestConfig } from 'axios';

export const axiosInstance = Axios.create({
  baseURL: import.meta.env.VITE_API_HOST,
});

export const setAuthToken = (token: string) => {
  axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

export const clearAuthToken = () => {
  delete axiosInstance.defaults.headers.common['Authorization'];
};

export const apiClient = <T>(config: AxiosRequestConfig): Promise<T> => {
  return axiosInstance(config).then(({ data }) => data);
};

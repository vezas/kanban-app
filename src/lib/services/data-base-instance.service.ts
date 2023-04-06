import { createAxiosInstance } from './axios-instance.service';

export const dataBaseInstance = createAxiosInstance(import.meta.env.VITE_DATA_BASE_API_URL);

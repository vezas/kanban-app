import { createAxiosInstance } from './axios-instance.service';

export const authInstance = createAxiosInstance(import.meta.env.VITE_AUTH_API_URL);

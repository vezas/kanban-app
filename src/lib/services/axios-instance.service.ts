import axios from 'axios';

export const createAxiosInstance = (baseURL: string) => axios.create({ baseURL });

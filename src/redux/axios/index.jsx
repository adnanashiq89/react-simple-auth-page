import axios from 'axios';

export const MyAxios = axios.create({
  baseURL: process.env.BASE_URI,
});

import axios from "axios";

const baseURL = typeof window === 'undefined' 
  ? (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000') + "/api"
  : "/api";

export const nextServer = axios.create({
  baseURL: baseURL,
  withCredentials: true,
});
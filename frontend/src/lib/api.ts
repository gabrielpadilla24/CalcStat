import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL, // configurable vía env
  headers: {
    "Content-Type": "application/json",
  },
});

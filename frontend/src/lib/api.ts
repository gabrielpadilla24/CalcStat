// src/lib/api.ts
import axios from "axios";

function normalize(url: string) {
  return url.replace(/\/+$/, ""); // quita slashes finales
}

// 1) Lee el env y aplica fallback
const ENV_URL = import.meta.env.VITE_API_BASE_URL?.trim();

// 2) Si no hay env:

const fallback =
  typeof window !== "undefined" && window.location.hostname === "localhost"
    ? "http://127.0.0.1:8000"
    : "https://calcstat.onrender.com/"; // ← cambia esto

export const api = axios.create({
  baseURL: normalize(ENV_URL || fallback),
  headers: { "Content-Type": "application/json" },
});

// En desarrollo, ayuda ver qué URL quedó
if (import.meta.env.DEV) {
  console.log("[api] baseURL:", (api.defaults.baseURL as string) || "(none)");
}

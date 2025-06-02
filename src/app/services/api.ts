const isBrowser = typeof window !== "undefined";

export const API_BASE = isBrowser
    ? "https://ccr-alertas-api-production.up.railway.app"
    : "http://localhost:8080";

export const getHeaders = () => ({
    "Content-Type": "application/json",
    "x-api-key": "123456",
});

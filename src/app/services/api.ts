const isProduction = typeof window !== "undefined" && window.location.hostname !== "localhost";

export const API_BASE = isProduction
    ? "https://ccr-alertas-api-production.up.railway.app"
    : "http://localhost:8080";


export const getHeaders = () => ({
    "Content-Type": "application/json",
    "x-api-key": "123456",
});

import axios from "axios";

const apiRequest = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

apiRequest.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const userData = localStorage.getItem("@NPG-auth-user-data");
    if (userData) {
      const token = JSON.parse(userData)?.token;
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
  }
  return config;
});

export { apiRequest };

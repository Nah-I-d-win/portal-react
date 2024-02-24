import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8686",
  timeout: 5000,
  headers: { "User-Agent": "Portal-v0.1.0" },
});

export default axiosInstance;
